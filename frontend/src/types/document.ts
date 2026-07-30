export interface Document {
  id: number;
  title: string;
  subject: string;
  filename: string;
  file_path: string;
  folder_id: number | null;
  file_size: number;
  mime_type: string;
  extracted: boolean;
  text_path: string | null;
  created_at: string;
  user_id: number;
}

export interface UploadDocumentRequest {
  title: string;
  subject: string;
  folder_id?: number;
  file: File;
}