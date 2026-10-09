import { API } from "./client";
import type { User } from "@/types";

export const userApi = {
  async getCurrentUser(): Promise<User> {
    const response = await API.get<User>("/users/me");

    return response.data;
  },

  async getUsers(): Promise<User[]> {
    const response = await API.get<User[]>("/users");

    return response.data;
  },
};