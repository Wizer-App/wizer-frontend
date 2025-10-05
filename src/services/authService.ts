import type { AuthResponse } from "../features/auth/types/auth.types";
import type { LoginData } from "../features/auth/types/authRequest.types";
import type { User } from "../features/users/types/user.types";
import { apiClient } from "./apiClient";

export const authService = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("Auth/login", credentials);
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  },
};
