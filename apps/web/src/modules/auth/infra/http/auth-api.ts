import { FetchClient } from "@/shared/infra/http/fetch-client";
import {
  fetchErrorInterceptor,
  fetchRequestInterceptor,
  fetchResponseInterceptor,
} from "@/shared/infra/http/interceptor";

// Infra Layer: API Client
export class AuthApi {
  protected fetchClient: FetchClient;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || "") {
    this.fetchClient = new FetchClient(baseURL);
    this.fetchClient.addRequestInterceptor(fetchRequestInterceptor);
    this.fetchClient.addResponseInterceptor(fetchResponseInterceptor);
    this.fetchClient.addErrorInterceptor(fetchErrorInterceptor);
  }

  public getHttpClient(): FetchClient {
    return this.fetchClient;
  }
}
