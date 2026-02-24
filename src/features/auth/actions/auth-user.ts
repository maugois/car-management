import { LoginFormData } from "../schemas/login";
import { AuthResponse } from "../types/responses";
import { getTranslations } from 'next-intl/server';

export async function authenticateUser(credentials: LoginFormData): Promise<AuthResponse> {
  const t = await getTranslations('login');

  const response = await fetch(`http://localhost:8080/api/v1/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data: AuthResponse = await response.json();

  if (!response.ok) {
    throw new Error(t("error_invalid_credentials"));
  }

  return data;
}