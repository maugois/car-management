import NextAuth from "next-auth";
import { User as MyCustomUser } from "@/features/auth/types/user";

declare module "next-auth" {
  interface Session {
    user: MyCustomUser;
    error?: "TokenExpiredError";
  }

  interface User extends MyCustomUser {
    expiresIn?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends MyCustomUser {
    expiresAt?: number;
    error?: "TokenExpiredError";
  }
}