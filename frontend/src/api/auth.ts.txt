import api from "./axios";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "../types";

/**
 * Register a new user
 */
export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post("/auth/register", data);
  return response.data;
}

/**
 * Login using JSON body
 */
export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post("/auth/login", data);

  const token = response.data.access_token;

  if (token) {
    localStorage.setItem("access_token", token);
  }

  return response.data;
}

/**
 * Login using OAuth2 form (Swagger compatible)
 * Use this only if your backend expects /auth/token.
 */
export async function loginWithForm(
  email: string,
  password: string
): Promise<LoginResponse> {
  const form = new URLSearchParams();

  form.append("username", email);
  form.append("password", password);

  const response = await api.post("/auth/token", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const token = response.data.access_token;

  if (token) {
    localStorage.setItem("access_token", token);
  }

  return response.data;
}

/**
 * Logout
 */
export function logout() {
  localStorage.removeItem("access_token");
}

/**
 * Get stored token
 */
export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

/**
 * Check login status
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("access_token");
}

/**
 * Get current logged-in user
 *
 * Assumes backend endpoint:
 * GET /users/me
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get("/users/me");
  return response.data;
}