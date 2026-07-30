import api from "./api";
import ENDPOINTS from "./endpoints";

export const uploadDocument = (formData: FormData) => {
  return api.post(
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
  return api.get(ENDPOINTS.DOCUMENT.BASE);
};

export const getRecentDocuments = () => {
  return api.get(ENDPOINTS.DOCUMENT.RECENT);
};

export const deleteDocument = (id: number) => {
  return api.delete(`${ENDPOINTS.DOCUMENT.BASE}/${id}`);
};