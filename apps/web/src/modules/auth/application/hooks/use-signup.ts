import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SignupFormData } from "../../domain/validation/schemas";
import { AuthService } from "../services/auth.service";
const service = new AuthService();

// Application: Hooks
export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const { push } = useRouter();

  const signup = async (user: SignupFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.signup(user);
      setData(result);
      push("/login");
      return result;
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return { signup, loading, error, data };
}
