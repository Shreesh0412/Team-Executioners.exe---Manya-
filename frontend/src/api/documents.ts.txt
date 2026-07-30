import api from "./axios";
import type { Document } from "../types";

/**
 * Get all documents
 */
export async function getDocuments(): Promise<Document[]> {
  const response = await api.get("/documents/");
  return response.data;
}

/**
 * Get document by ID
 */
export async function getDocument(
  id: number
): Promise<Document> {
  const response = await api.get(`/documents/${id}`);
  return response.data;
}

/**
 * Upload document
 */
export async function uploadDocument(
  title: string,
  subject: string,
  folderId: number | null,
  file: File
): Promise<Document> {

  const formData = new FormData();

  formData.append("title", title);
  formData.append("subject", subject);

  if (folderId !== null) {
    formData.append("folder_id", folderId.toString());
  }

  formData.append("file", file);

  const response = await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

/**
 * Delete document
 */
export async function deleteDocument(
  id: number
): Promise<void> {
  await api.delete(`/documents/${id}`);
}

/**
 * Download document
 */
export async function downloadDocument(
  id: number
): Promise<Blob> {

  const response = await api.get(
    `/documents/${id}/download`,
    {
      responseType: "blob",
    }
  );

  return response.data;
}

/**
 * Search documents
 */
export async function searchDocuments(
  query: string
): Promise<Document[]> {

  const response = await api.get(
    `/documents/search`,
    {
      params: {
        q: query,
      },
    }
  );

  return response.data;
}