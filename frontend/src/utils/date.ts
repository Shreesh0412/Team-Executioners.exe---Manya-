export const formatDate = (
  date: string | Date
): string =>
  new Date(date).toLocaleDateString();

export const formatDateTime = (
  date: string | Date
): string =>
  new Date(date).toLocaleString();

export const formatTime = (
  date: string | Date
): string =>
  new Date(date).toLocaleTimeString();