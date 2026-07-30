import api from "./axios";

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

/**
 * Chat with AI
 */
export async function chatAI(
  message: string
): Promise<ChatResponse> {

  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
}