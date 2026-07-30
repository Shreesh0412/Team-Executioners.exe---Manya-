import api from "./api";
import ENDPOINTS from "./endpoints";

import {
  User,
  UpdateUserRequest,
} from "@/types";

export const getCurrentUser = () => {
  return api.get<User>(ENDPOINTS.USER.ME);
};

export const updateCurrentUser = (
  data: UpdateUserRequest
) => {
  return api.put<User>(
    ENDPOINTS.USER.ME,
    data
  );
};