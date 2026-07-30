import api from "./api";
import ENDPOINTS from "./endpoints";

export interface FolderRequest {
  name: string;
}

export const getFolders = () => {
  return api.get(ENDPOINTS.FOLDER.BASE);
};

export const createFolder = (data: FolderRequest) => {
  return api.post(ENDPOINTS.FOLDER.BASE, data);
};

export const updateFolder = (
  id: number,
  data: FolderRequest
) => {
  return api.put(`${ENDPOINTS.FOLDER.BASE}/${id}`, data);
};

export const deleteFolder = (id: number) => {
  return api.delete(`${ENDPOINTS.FOLDER.BASE}/${id}`);
};