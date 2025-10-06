import type { AuthResponse } from "../features/auth/types/auth.types";
import type { LoginData } from "../features/auth/types/authRequest.types";
import type { User } from "../features/users/types/user.types";
import { apiClient } from "./apiClient";

export const authService = {
  // async login(credentials: LoginData): Promise<AuthResponse> {
  //   return apiClient.post<AuthResponse>("Auth/login", credentials);
  // },

  async login(credentials: LoginData): Promise<AuthResponse> {
    console.log("🔐 authService.login llamado con:", credentials);
    
    try {
      console.log("🌐 Haciendo petición a API...");
      const response = await apiClient.post<AuthResponse>('Auth/login', credentials);
      console.log("✅ Respuesta recibida:", response);
      return response;
    } catch (error) {
      console.error("❌ Error en authService.login:", error);
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
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
