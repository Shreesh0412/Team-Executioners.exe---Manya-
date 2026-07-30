import api from "./api";
import ENDPOINTS from "./endpoints";

import {
  RegisterRequest,
  LoginResponse,
} from "@/types";

export const login = (formData: FormData) => {
  return api.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    formData
  );
};

export const register = (data: RegisterRequest) => {
  return api.post(
    ENDPOINTS.AUTH.REGISTER,
    data
  );
};