export type FetchRequestConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number>;
  baseURL?: string;
};

export type FetchResponse<T = any> = {
  data: T;
  status: number;
  headers: Headers;
};

export type RequestInterceptor = (
  config: FetchRequestConfig
) => Promise<FetchRequestConfig> | FetchRequestConfig;
export type ResponseInterceptor<T = unknown> = (
  response: FetchResponse<T>
) => Promise<FetchResponse<T>> | FetchResponse<T>;
export type ErrorInterceptor = (error: unknown) => Promise<unknown> | unknown;

export class FetchClient {
  private baseURL: string;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || "") {
    this.baseURL = baseURL;
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  addErrorInterceptor(interceptor: ErrorInterceptor) {
    this.errorInterceptors.push(interceptor);
  }

  private async applyRequestInterceptors(
    config: FetchRequestConfig
  ): Promise<FetchRequestConfig> {
    let currentConfig = { ...config };
    for (const interceptor of this.requestInterceptors) {
      currentConfig = await interceptor(currentConfig);
    }
    return currentConfig;
  }

  private async applyResponseInterceptors<T = any>(
    response: FetchResponse<T>
  ): Promise<FetchResponse<T>> {
    let currentResponse = { ...response };
    for (const interceptor of this.responseInterceptors) {
      currentResponse = (await interceptor(
        currentResponse as FetchResponse<unknown>
      )) as FetchResponse<T>;
    }
    return currentResponse;
  }

  private async applyErrorInterceptors(error: unknown): Promise<unknown> {
    let currentError = error;
    for (const interceptor of this.errorInterceptors) {
      currentError = await interceptor(currentError);
    }
    return currentError;
  }

  async request<T = any>(
    url: string,
    config: FetchRequestConfig = {}
  ): Promise<FetchResponse<T>> {
    try {
      let finalConfig = await this.applyRequestInterceptors({ ...config });
      let fullUrl = this.baseURL ? this.baseURL + url : url;
      if (finalConfig.params) {
        const params = new URLSearchParams(
          finalConfig.params as Record<string, string>
        ).toString();
        fullUrl += (fullUrl.includes("?") ? "&" : "?") + params;
      }
      const fetchConfig: RequestInit = {
        method: finalConfig.method || "GET",
        headers: finalConfig.headers,
        body:
          finalConfig.body instanceof FormData
            ? finalConfig.body
            : typeof finalConfig.body === "string"
              ? finalConfig.body
              : finalConfig.body
                ? JSON.stringify(finalConfig.body)
                : undefined,
      };
      const response = await fetch(fullUrl, fetchConfig);
      const contentType = response.headers.get("content-type");
      let data: T;
      if (contentType && contentType.includes("application/json")) {
        data = (await response.json()) as T;
      } else {
        data = (await response.text()) as unknown as T;
      }
      const fetchResponse: FetchResponse<T> = {
        data,
        status: response.status,
        headers: response.headers,
      };
      const interceptedResponse =
        await this.applyResponseInterceptors(fetchResponse);
      if (!response.ok) {
        throw interceptedResponse;
      }
      return interceptedResponse;
    } catch (error) {
      await this.applyErrorInterceptors(error);
      throw error;
    }
  }

  get<T = any>(url: string, config: FetchRequestConfig = {}) {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  post<T = any>(url: string, body?: unknown, config: FetchRequestConfig = {}) {
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
    });
  }

  put<T = any>(url: string, body?: unknown, config: FetchRequestConfig = {}) {
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
    });
  }

  delete<T = unknown>(url: string, config: FetchRequestConfig = {}) {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}
