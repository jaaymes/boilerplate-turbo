import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: !!(
        typeof window !== "undefined" && localStorage.getItem("accessToken")
      ),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);
