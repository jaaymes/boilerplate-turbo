import { Token } from "../../domain/models/auth-response";
import { IAuthRepository } from "../../domain/repositories/auth-repository";
import type { SignupFormData } from "../../domain/validation/schemas";
import { AuthRepositoryImpl } from "../../infra/repositories/auth-repository-impl";
import { LoginUseCase } from "../use-cases/login-use-case";
import { SignupUseCase } from "../use-cases/signup-use-case";

// Application Layer: Service - Orquestra casos de uso
export class AuthService {
  private authRepository: IAuthRepository;
  private loginUseCase: LoginUseCase;
  private signupUseCase: SignupUseCase;

  constructor() {
    this.authRepository = new AuthRepositoryImpl();
    this.loginUseCase = new LoginUseCase(this.authRepository);
    this.signupUseCase = new SignupUseCase(this.authRepository);
  }

  async login(username: string, password: string): Promise<Token> {
    return this.loginUseCase.execute(username, password);
  }

  async logout(): Promise<void> {
    return this.authRepository.logout();
  }

  async signup(user: SignupFormData): Promise<void> {
    return this.signupUseCase.execute(user);
  }
}
