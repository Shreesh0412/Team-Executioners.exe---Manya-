import api from "./api";
import ENDPOINTS from "./endpoints";

import {
  Folder,
  CreateFolderRequest,
  UpdateFolderRequest,
} from "@/types";

export const getFolders = () => {
  return api.get<Folder[]>(ENDPOINTS.FOLDER.BASE);
};

export const createFolder = (
  data: CreateFolderRequest
) => {
  return api.post<Folder>(
    ENDPOINTS.FOLDER.BASE,
    data
  );
};

export const updateFolder = (
  id: number,
  data: UpdateFolderRequest
) => {
  return api.put<Folder>(
    `${ENDPOINTS.FOLDER.BASE}/${id}`,
    data
  );
};

export const deleteFolder = (id: number) => {
  return api.delete(
    `${ENDPOINTS.FOLDER.BASE}/${id}`
  );
};