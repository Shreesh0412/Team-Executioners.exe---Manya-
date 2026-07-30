import { BaseEntity } from "./common";

export interface Document extends BaseEntity {
  id: number;
  title: string;
  filename: string;
  file_size: number;
  mime_type: string;
  folder_id: number | null;
  user_id: number;
}

export interface UploadDocumentRequest {
  file: File;
  folder_id?: number;
}