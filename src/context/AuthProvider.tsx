import { useEffect, useState, type ReactNode } from "react";
import type { AuthContextType } from "./authContext";
import { AuthContext } from "./authContext";
import type { UserAuth } from "../features/auth/types/userAuth.type";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lo que va a poder tener acceso desde el contexto

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserAuth) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const getToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  const isAuthenticated = (): boolean => {
    return !!getToken();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
