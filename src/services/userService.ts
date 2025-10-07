import type { User } from "../features/users/types/user.types";
import { apiClient } from "./apiClient";

export const userService = {
  async getUserByUsername(username: string): Promise<User> {
    return apiClient.get<User>(`users/user/${username}`);
  },
};
