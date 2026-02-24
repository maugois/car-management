import { RegisterFormData } from "../schemas/register";

export async function registerUser(data: RegisterFormData) {
  try {
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erro ao registrar usuário");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}