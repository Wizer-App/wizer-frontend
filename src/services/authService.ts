import type { AuthResponse } from "../features/auth/types/auth.types";
import type { LoginData } from "../features/auth/types/authRequest.types";
import { apiClient } from "./apiClient";

// Peticiones a la API

export const authService = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("Auth/login", credentials);
  },
};
