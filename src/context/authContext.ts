import { createContext, useContext } from "react";
import type { UserAuth } from "../features/auth/types/userAuth.type";

export interface AuthContextType {
  user: UserAuth | null;
  login: (userData: UserAuth) => void;
  logout: () => void;
  getToken: () => string | null;
  isAuthenticated: () => boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Error al usar el contexto");
  }

  return context;
}
