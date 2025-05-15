import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

// Application: Hooks
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const { push } = useRouter();

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.login(
        credentials.email,
        credentials.password
      );
      setData(result);
      push("/home");
      return result;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    await service.logout();
  };

  return { login, logout, loading, error, data };
}
