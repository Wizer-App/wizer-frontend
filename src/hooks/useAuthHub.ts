import { useState } from "react";
import { authService } from "../services/authService";
import type { User } from "../features/users/types/user.types";
import type { AuthResponse } from "../features/auth/types/auth.types";
import type { LoginData } from "../features/auth/types/authRequest.types";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());

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

        if (response.userId && response.userName) {
          const userData: User = {
            id: parseInt(response.userId),
            userName: response.userName,
            email: "",
            createdAt: new Date(),
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
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

  return {
    user,
    login,
    loading,
    error,
    isAuthenticated: authService.isAuthenticated,
    getCurrentUser: authService.getCurrentUser,
  };
}
