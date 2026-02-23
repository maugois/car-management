'use client'

import { createContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { User } from "../types/user";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const user = session?.user as User | null;
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}