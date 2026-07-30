import api from "./api";
import ENDPOINTS from "./endpoints";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const login = (formData: FormData) => {
  return api.post(ENDPOINTS.AUTH.LOGIN, formData);
};

export const register = (data: RegisterRequest) => {
  return api.post(ENDPOINTS.AUTH.REGISTER, data);
};