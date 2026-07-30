import { BaseEntity } from "./common";

export interface User extends BaseEntity {
  username: string;
  email: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
}