import { Token } from "../models/auth-response";

// Repository Interface - Define contratos para comunicação com camada de dados
export interface IAuthRepository {
  login(username: string, password: string): Promise<Token>;
  logout(): Promise<void>;
}
