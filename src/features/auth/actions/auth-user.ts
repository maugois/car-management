import { LoginFormData } from "../schemas/login";
import { AuthResponse } from "../types/responses";

export async function authenticateUser(credentials: LoginFormData): Promise<AuthResponse> {
  const response = await fetch(`http://localhost:8080/api/v1/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data: AuthResponse = await response.json();

  if (!response.ok) {
    console.error("Erro da API Java:", data);
    throw new Error(data.message || "Falha na autenticação");
  }

  return data;
}