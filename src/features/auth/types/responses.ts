import { User } from "./user";

export interface AuthResponse {
  user: User;
  message?: string;
  expiresIn?: number;
}