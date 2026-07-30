import { useState } from "react";
import * as authApi from "../api/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError("");

      return await authApi.login({
        email,
        password,
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(
    name: string,
    email: string,
    password: string
  ) {
    try {
      setLoading(true);
      setError("");

      return await authApi.register({
        name,
        email,
        password,
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    authApi.logout();
  }

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
}