export const isPDF = (
  file: File
): boolean =>
  file.type === "application/pdf";

export const getFileExtension = (
  filename: string
): string =>
  filename.split(".").pop()?.toLowerCase() ?? "";

export const getFileName = (
  filename: string
): string =>
  filename.replace(/\.[^/.]+$/, "");