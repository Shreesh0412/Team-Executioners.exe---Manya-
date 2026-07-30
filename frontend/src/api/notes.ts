import api from "./axios";
import type { StickyNote } from "../types";

/**
 * Get Notes
 */
export async function getNotes(): Promise<
  StickyNote[]
> {
  const response = await api.get("/notes");
  return response.data;
}

/**
 * Create Note
 */
export async function createNote(
  note: Omit<StickyNote, "id">
): Promise<StickyNote> {

  const response = await api.post(
    "/notes",
    note
  );

  return response.data;
}

/**
 * Update Note
 */
export async function updateNote(
  id: number,
  note: Partial<StickyNote>
): Promise<StickyNote> {

  const response = await api.put(
    `/notes/${id}`,
    note
  );

  return response.data;
}

/**
 * Delete Note
 */
export async function deleteNote(
  id: number
): Promise<void> {

  await api.delete(`/notes/${id}`);
}