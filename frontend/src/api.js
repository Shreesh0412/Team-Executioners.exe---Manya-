import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = (data) =>
  API.post("/auth/login", data);

export const register = (data) =>
  API.post("/auth/register", data);

export const getFolders = () =>
  API.get("/folders");

export const createFolder = (data) =>
  API.post("/folders", data);

export const deleteFolder = (id) =>
  API.delete(`/folders/${id}`);

export const getDocuments = () =>
  API.get("/documents");

export const uploadPDF = (formData) =>
  API.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default API;