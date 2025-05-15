import { toast } from "@package/ui/components/sonner";
import { redirect } from "next/navigation";
import type { Token } from "../../domain/models/auth-response";
import { IAuthRepository } from "../../domain/repositories/auth-repository";
import type { SignupFormData } from "../../domain/validation/schemas";
import { AuthApi } from "../http/auth-api";
// Repository Implementation - Implementa os contratos definidos no domínio
export class AuthRepositoryImpl implements IAuthRepository {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async login(email: string, password: string): Promise<Token> {
    try {
      const response = await this.api.getHttpClient().post("/signin", {
        email,
        password,
      });

      return response.data;
    } catch (error: any) {
      toast.error(error.data.message);
      throw new Error(error.data.message);
    }
  }

  async logout(): Promise<void> {
    try {
      // Implementar logout no servidor, se necessário
      localStorage.removeItem("accessToken");
      redirect("/login");
    } catch (error: any) {
      toast.error(error.data.message);
      throw new Error(error.data.message);
    }
  }

  async signup(user: SignupFormData): Promise<void> {
    try {
      await this.api.getHttpClient().post("/signup", user);
    } catch (error: any) {
      toast.error(error.data.message);
      throw new Error(error.data.message);
    }
  }
}
