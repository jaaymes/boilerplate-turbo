import { useAuthStore } from "@/modules/auth/application/hooks/use-auth-store";
import { toast } from "@workspace/ui/components/sonner";
import { useState } from "react";
import { AuthService } from "../../application/services/auth.service";
import { Token } from "../../domain/models/auth-response";

// Presentation Layer: Hook - Interface para os componentes React
export function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const logoutStore = useAuthStore((state) => state.logout);

  const authService = new AuthService();

  const login = async (
    username: string,
    password: string
  ): Promise<Token | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await authService.login(username, password);
      setAuthenticated(true);
      setIsLoading(false);
      return token;
    } catch (_: unknown) {
      setError("Falha na autenticação. Verifique suas credenciais.");
      toast.error("Falha na autenticação. Verifique suas credenciais.");
      setIsLoading(false);
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await authService.logout();
      logoutStore();
    } catch (_: unknown) {
      setError("Erro ao realizar logout");
      toast.error("Erro ao realizar logout");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
  };
}
