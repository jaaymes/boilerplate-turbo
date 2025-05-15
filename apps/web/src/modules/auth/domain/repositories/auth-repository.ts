import { Token } from "../models/auth-response";
import type { SignupFormData } from "../validation/schemas";

// Repository Interface - Define contratos para comunicação com camada de dados
export interface IAuthRepository {
  login(username: string, password: string): Promise<Token>;
  logout(): Promise<void>;
  signup(user: SignupFormData): Promise<void>;
}
