import { BaseEntity } from "./common";

export interface Folder extends BaseEntity {
  name: string;
  user_id: number;
}

export interface CreateFolderRequest {
  name: string;
}

export interface UpdateFolderRequest {
  name: string;
}