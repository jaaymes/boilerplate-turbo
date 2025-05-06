export type FetchRequestConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
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
export type ResponseInterceptor<T = any> = (
  response: FetchResponse<T>
) => Promise<FetchResponse<T>> | FetchResponse<T>;
export type ErrorInterceptor = (error: any) => Promise<any> | any;

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

  private async applyResponseInterceptors<T>(
    response: FetchResponse<T>
  ): Promise<FetchResponse<T>> {
    let currentResponse = { ...response };
    for (const interceptor of this.responseInterceptors) {
      currentResponse = await interceptor(currentResponse);
    }
    return currentResponse;
  }

  private async applyErrorInterceptors(error: any): Promise<any> {
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
          finalConfig.params as any
        ).toString();
        fullUrl += (fullUrl.includes("?") ? "&" : "?") + params;
      }
      const fetchConfig: RequestInit = {
        method: finalConfig.method || "GET",
        headers: finalConfig.headers,
        body: finalConfig.body,
      };
      const response = await fetch(fullUrl, fetchConfig);
      const contentType = response.headers.get("content-type");
      let data: any;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
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

  post<T = any>(url: string, body?: any, config: FetchRequestConfig = {}) {
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
    });
  }

  put<T = any>(url: string, body?: any, config: FetchRequestConfig = {}) {
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
    });
  }

  delete<T = any>(url: string, config: FetchRequestConfig = {}) {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}
