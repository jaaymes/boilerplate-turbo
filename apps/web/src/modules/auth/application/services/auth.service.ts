import { Token } from "../../domain/models/auth-response";
import { IAuthRepository } from "../../domain/repositories/auth-repository";
import { AuthRepositoryImpl } from "../../infra/repositories/auth-repository-impl";
import { LoginUseCase } from "../use-cases/login-use-case";

// Application Layer: Service - Orquestra casos de uso
export class AuthService {
  private authRepository: IAuthRepository;
  private loginUseCase: LoginUseCase;

  constructor() {
    // Injeção de dependências
    this.authRepository = new AuthRepositoryImpl();
    this.loginUseCase = new LoginUseCase(this.authRepository);
  }

  async login(username: string, password: string): Promise<Token> {
    return this.loginUseCase.execute(username, password);
  }

  async logout(): Promise<void> {
    return this.authRepository.logout();
  }
}
