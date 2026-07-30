import api from "./axios";
import type { Summary } from "../types";

/**
 * Generate Summary
 */
export async function generateSummary(
  documentId: number
): Promise<Summary> {

  const response = await api.post(
    `/summaries/generate/${documentId}`
  );

  return response.data;
}

/**
 * Get Summary
 */
export async function getSummary(
  documentId: number
): Promise<Summary> {

  const response = await api.get(
    `/summaries/${documentId}`
  );

  return response.data;
}