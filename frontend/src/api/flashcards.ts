import api from "./axios";
import type { Flashcard } from "../types";

/**
 * Generate Flashcards
 */
export async function generateFlashcards(
  documentId: number
): Promise<Flashcard[]> {

  const response = await api.post(
    `/flashcards/generate/${documentId}`
  );

  return response.data;
}

/**
 * Get Flashcards
 */
export async function getFlashcards(
  documentId: number
): Promise<Flashcard[]> {

  const response = await api.get(
    `/flashcards/${documentId}`
  );

  return response.data;
}