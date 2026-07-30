import api from "./api";
import ENDPOINTS from "./endpoints";

import {
  Document,
  UploadDocumentRequest,
} from "@/types";

export const uploadDocument = (
  data: UploadDocumentRequest
) => {
  const formData = new FormData();

  formData.append("file", data.file);

  if (data.folder_id !== undefined) {
    formData.append(
      "folder_id",
      String(data.folder_id)
    );
  }

  return api.post<Document>(
    ENDPOINTS.DOCUMENT.BASE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getDocuments = () => {
  return api.get<Document[]>(
    ENDPOINTS.DOCUMENT.BASE
  );
};

export const getRecentDocuments = () => {
  return api.get<Document[]>(
    ENDPOINTS.DOCUMENT.RECENT
  );
};

export const deleteDocument = (id: number) => {
  return api.delete(
    `${ENDPOINTS.DOCUMENT.BASE}/${id}`
  );
};