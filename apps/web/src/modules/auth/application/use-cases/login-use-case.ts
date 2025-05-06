import { setCookie } from "@/shared/utils/cookies";
import { Token } from "../../domain/models/auth-response";
import type { IAuthRepository } from "../../domain/repositories/auth-repository";

// Application Layer: Use Case - Lógica de negócio
export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<Token> {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    try {
      const token = await this.authRepository.login(email, password);
      console.log("token", token);
      // Armazenar tokens
      localStorage.setItem("accessToken", token.access_token);
      setCookie("accessToken", token.access_token);

      return token;
    } catch (error) {
      throw new Error("Falha ao realizar login");
    }
  }
}
