export interface Folder {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
}

export interface CreateFolderRequest {
  name: string;
}

export interface UpdateFolderRequest {
  name: string;
}