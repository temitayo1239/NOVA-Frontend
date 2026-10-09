import { API } from "./client";
import type { AuthResponse, User } from "@/types";

export const authApi = {
  async login(
    payload: {
      email: string;
      password: string;
    },
  ): Promise<AuthResponse> {
    const response = await API.post<AuthResponse>(
      "/auth/login",
      payload,
    );

    return response.data;
  },

  async register(
    payload: Record<string, string>,
  ): Promise<AuthResponse> {
    const response = await API.post<AuthResponse>(
      "/auth/register",
      payload,
    );

    return response.data;
  },

  async googleLogin(credential: string) {
  const response = await API.post(
    "/auth/google",
    {
      credential,
    }
  );

  return response.data;
},

  async currentUser(): Promise<User> {
    const response = await API.get<User>("/users/me");

    return response.data;
  },
};