import { User } from "./user";

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
  user: User;
  message?: string;
  expiresIn?: number;
}