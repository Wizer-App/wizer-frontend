import { createContext, useContext } from "react";
import type { User } from "../features/users/types/user.types";

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
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
