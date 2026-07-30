import api from "./axios";
import type { Quiz, QuizQuestion } from "../types";

/**
 * Generate Quiz
 */
export async function generateQuiz(
  documentId: number
): Promise<Quiz> {

  const response = await api.post(
    `/quizzes/generate/${documentId}`
  );

  return response.data;
}

/**
 * Get Quiz
 */
export async function getQuiz(
  quizId: number
): Promise<Quiz> {

  const response = await api.get(
    `/quizzes/${quizId}`
  );

  return response.data;
}

/**
 * Get Quiz Questions
 */
export async function getQuizQuestions(
  quizId: number
): Promise<QuizQuestion[]> {

  const response = await api.get(
    `/quizzes/${quizId}/questions`
  );

  return response.data;
}