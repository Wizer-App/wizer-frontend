import { useState } from "react";
import { authService } from "../services/authService";
import type { LoginData } from "../features/auth/types/authRequest.types";
import { useAuthContext } from "../context/authContext";
import type { UserAuth } from "../features/auth/types/userAuth.type";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: contextLogin, logout: contextLogout } = useAuthContext();

  const login = async (credentials: LoginData): Promise<UserAuth> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      if ( response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);

        if (response.id&& response.username) {
          const userData: UserAuth = {
            id: response.id,
            username: response.email,
            email: response.email,
            name: response.name,
            lastName: response.lastName,
            createdAt: response.createdAt,
            photo: response.photo,
            typeUser: response.typeUser,
            infoUserId: response.infoUserId,
            accessToken: response.accessToken
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
    contextLogout();
  };

  return {
    login,
    logout,
    loading,
    error
  };
}
