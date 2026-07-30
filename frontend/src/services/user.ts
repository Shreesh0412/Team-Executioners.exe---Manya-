import api from "./api";
import ENDPOINTS from "./endpoints";

export const getCurrentUser = () => {
  return api.get(ENDPOINTS.USER.ME);
};