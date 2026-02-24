import NextAuth from "next-auth";
import { User as MyCustomUser } from "@/features/auth/types/user";

declare module "next-auth" {
  interface Session {
    user: MyCustomUser;
  }

  interface User extends MyCustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends MyCustomUser {}
}