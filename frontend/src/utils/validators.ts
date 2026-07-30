export const isValidEmail = (
  email: string
): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isStrongPassword = (
  password: string
): boolean =>
  password.length >= 8;

export const isEmpty = (
  value: string
): boolean =>
  value.trim().length === 0;