import api from "./axios";
import type {
  Folder,
  CreateFolderRequest,
  UpdateFolderRequest,
} from "../types";

/**
 * Get all folders
 */
export async function getFolders(): Promise<Folder[]> {
  const response = await api.get("/folders/");
  return response.data;
}

/**
 * Get folder by ID
 */
export async function getFolder(id: number): Promise<Folder> {
  const response = await api.get(`/folders/${id}`);
  return response.data;
}

/**
 * Create folder
 */
export async function createFolder(
  data: CreateFolderRequest
): Promise<Folder> {
  const response = await api.post("/folders/", data);
  return response.data;
}

/**
 * Rename folder
 */
export async function updateFolder(
  id: number,
  data: UpdateFolderRequest
): Promise<Folder> {
  const response = await api.put(`/folders/${id}`, data);
  return response.data;
}

/**
 * Delete folder
 */
export async function deleteFolder(
  id: number
): Promise<void> {
  await api.delete(`/folders/${id}`);
}