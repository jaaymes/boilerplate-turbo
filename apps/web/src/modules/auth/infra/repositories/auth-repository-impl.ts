import { toast } from "@workspace/ui/components/sonner";
import { redirect } from "next/navigation";
import type { Token } from "../../domain/models/auth-response";
import { IAuthRepository } from "../../domain/repositories/auth-repository";
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
    } catch (error) {
      toast.error("Falha na autenticação");
      throw new Error("Falha na autenticação");
    }
  }

  async logout(): Promise<void> {
    try {
      // Implementar logout no servidor, se necessário
      localStorage.removeItem("accessToken");
      redirect("/login");
    } catch (error) {
      toast.error("Erro ao realizar logout");
      throw new Error("Falha ao realizar logout");
    }
  }
}
