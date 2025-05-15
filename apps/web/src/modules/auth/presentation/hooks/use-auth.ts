import { useAuthStore } from "@/modules/auth/application/hooks/use-auth-store";
import { useEffect, useState } from "react";
import type { IUser } from "../../domain/models/user";

// Presentation Layer: Hook - Interface para os componentes React
export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const getUser = useAuthStore((state) => state.getUser);

  useEffect(() => {
    getUser().then(setUser);
  }, [getUser]);

  return {
    isAuthenticated,
    user,
  };
}
