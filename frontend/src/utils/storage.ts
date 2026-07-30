import { STORAGE_KEYS } from "@/constants";

export const storage = {
  getToken: () =>
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),

  setToken: (token: string) =>
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),

  removeToken: () =>
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),

  getTheme: () =>
    localStorage.getItem(STORAGE_KEYS.THEME),

  setTheme: (theme: string) =>
    localStorage.setItem(STORAGE_KEYS.THEME, theme),

  clear: () => localStorage.clear(),
};