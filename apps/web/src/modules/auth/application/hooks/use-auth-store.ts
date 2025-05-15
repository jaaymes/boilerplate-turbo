import { decrypt } from "@/shared/utils/crypto";
import { redirect } from "next/navigation";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../../domain/models/user";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
  getUser: () => Promise<IUser | null>;
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
        redirect("/login");
      },
      getUser: async () => {
        const token = localStorage.getItem("accessToken");
        console.log("token", token);
        if (!token) return null;
        try {
          const payload = (await decrypt(token)) as unknown as IUser;
          console.log("payload", payload);
          return payload;
        } catch (e) {
          return null;
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);
