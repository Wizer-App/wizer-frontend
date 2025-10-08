import type { LoginData } from "../features/auth/types/authRequest.types";
import type { UserAuth } from "../features/auth/types/userAuth.type";
import { apiClient } from "./apiClient";

// Peticiones a la API

export const authService = {
  async login(credentials: LoginData): Promise<UserAuth> {
    return apiClient.post<UserAuth>("Auth/login", credentials);
  },
};
