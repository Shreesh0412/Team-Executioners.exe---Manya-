export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;

  const sizes = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat(
    (bytes / Math.pow(k, i)).toFixed(2)
  )} ${sizes[i]}`;
};

export const truncate = (
  text: string,
  length = 25
): string => {
  if (text.length <= length) return text;

  return `${text.slice(0, length)}...`;
};

export const capitalize = (
  text: string
): string =>
  text.charAt(0).toUpperCase() + text.slice(1);