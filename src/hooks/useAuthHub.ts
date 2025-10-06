import { useState } from "react";
import { authService } from "../services/authService";
import type { User } from "../features/users/types/user.types";
import type { AuthResponse } from "../features/auth/types/auth.types";
import type { LoginData } from "../features/auth/types/authRequest.types";
import { useAuthContext } from "../context/authContext";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: contextLogin, logout: contextLogout } = useAuthContext();

  const login = async (credentials: LoginData): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.success && response.accessToken) {
        localStorage.setItem("authToken", response.accessToken);

        if (response.userId && response.username) {
          const userData: User = {
            id: parseInt(response.userId),
            userName: response.username,
            email: "",
            createdAt: new Date(),
          };
          localStorage.setItem("user", JSON.stringify(userData));
          contextLogin(userData);
        }
      }
      setLoading(false);
      return response;
    } catch (e) {
      const errorMessage = " " + e;
      setError(errorMessage);
      setLoading(false);
      throw e;
    }
  };

  const logout = () => {
    authService.logout();
    contextLogout();
  };

  return {
    login,
    logout,
    loading,
    error,
    isAuthenticated: authService.isAuthenticated,
    getCurrentUser: authService.getCurrentUser,
  };
}
