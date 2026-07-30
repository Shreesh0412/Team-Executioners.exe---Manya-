export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,

  TIMEOUT: 15000,

  RETRY_COUNT: 1,

  STALE_TIME: 1000 * 60 * 5,
} as const;