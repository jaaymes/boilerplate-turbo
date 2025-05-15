import type { IAuthRepository } from "../../domain/repositories/auth-repository";
import type { SignupFormData } from "../../domain/validation/schemas";

export class SignupUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(user: SignupFormData): Promise<void> {
    if (!user) {
      throw new Error("Usuário é obrigatório");
    }

    try {
      await this.authRepository.signup(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
