"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types";
import { authApi } from "@/services/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const raw = localStorage.getItem("current_user");
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    const result = await authApi.login({ email, password });
    console.log("Login result:", result);
    localStorage.setItem("access_token", result.access_token);
    console.log("Storing current user:", result.access_token, result.user);
    localStorage.setItem("current_user", JSON.stringify(result.user));
    setUser(result.user);
    return result;
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    setUser(null);
  };
  return { user, loading, login, logout, isAuthenticated: !!user };
}
