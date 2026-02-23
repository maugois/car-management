import { LoginFormData } from "../schemas/login";

export async function authenticateUser(credentials: LoginFormData) {
  const response = await fetch(`http://localhost:8080/api/v1/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Falha na autenticação");
  }

  return data;
}