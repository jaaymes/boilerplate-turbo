import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { FetchRequestConfig, FetchResponse } from "./fetch-client";

// Tipos para os interceptadores
type ErrorHandler = (error: AxiosError) => Promise<never>;
type ResponseSuccessHandler = (response: AxiosResponse) => AxiosResponse;
type RequestHandler = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

export class HttpInterceptors {
  // Interceptor de requisição
  static requestInterceptor(): RequestHandler {
    return (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      // Adicionar cabeçalhos padrão, token, etc.
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // Adicionar outros headers padrão
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    };
  }

  // Interceptor de resposta bem-sucedida
  static responseSuccessInterceptor(): ResponseSuccessHandler {
    return (response: AxiosResponse): AxiosResponse => {
      // Processar a resposta antes de retorná-la ao código chamador
      return response;
    };
  }

  // Interceptor de erro
  static responseErrorInterceptor(): ErrorHandler {
    return async (error: AxiosError): Promise<never> => {
      // Processar erros de resposta
      if (error.response) {
        const { status } = error.response;

        // Tratar erros de autenticação (401)
        if (status === 401) {
          // Redirecionar para login ou tentar renovar token
          // Exemplo: window.location.href = '/login';
          // Ou tentar renovar o token
          // await refreshToken();
        }

        // Tratar outros códigos de erro comuns
        if (status === 403) {
          console.error("Acesso negado");
        }

        if (status === 404) {
          console.error("Recurso não encontrado");
        }

        if (status >= 500) {
          console.error("Erro no servidor");
        }
      } else if (error.request) {
        // Erro na requisição (sem resposta do servidor)
        console.error("Erro de conexão com o servidor");
      } else {
        // Erro ao configurar a requisição
        console.error("Erro ao preparar requisição:", error.message);
      }

      return Promise.reject(error);
    };
  }

  // Método para aplicar todos os interceptores a uma instância axios
  static applyInterceptors(axiosInstance: AxiosInstance): void {
    // Adicionar interceptor de requisição
    axiosInstance.interceptors.request.use(
      HttpInterceptors.requestInterceptor(),
      HttpInterceptors.responseErrorInterceptor()
    );

    // Adicionar interceptor de resposta
    axiosInstance.interceptors.response.use(
      HttpInterceptors.responseSuccessInterceptor(),
      HttpInterceptors.responseErrorInterceptor()
    );
  }
}

// Interceptor de requisição para FetchClient
export const fetchRequestInterceptor = async (
  config: FetchRequestConfig
): Promise<FetchRequestConfig> => {
  const accessToken = localStorage.getItem("accessToken");
  const headers = { ...config.headers };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return {
    ...config,
    headers,
  };
};

// Interceptor de resposta para FetchClient (pass-through)
export const fetchResponseInterceptor = async <T = any>(
  response: FetchResponse<T>
): Promise<FetchResponse<T>> => {
  // Pode adicionar lógica de tratamento de resposta aqui
  return response;
};

// Interceptor de erro para FetchClient
export const fetchErrorInterceptor = async (error: any): Promise<any> => {
  if (error && error.status) {
    const status = error.status;
    // Tratar erros de autenticação (401)
    if (status === 401) {
      // Exemplo: window.location.href = '/login';
      // Ou tentar renovar o token
    }
    if (status === 403) {
      console.error("Acesso negado");
    }
    if (status === 404) {
      console.error("Recurso não encontrado");
    }
    if (status >= 500) {
      console.error("Erro no servidor");
    }
  } else {
    console.error("Erro de conexão ou configuração:", error);
  }
  return Promise.reject(error);
};
