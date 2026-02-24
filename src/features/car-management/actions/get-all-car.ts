"use server";

import { authorizedFetch } from "../lib/api";

export async function getAllCars(filters: Record<string, any> = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, String(value));
  });

  const response = await authorizedFetch(`/cars?${params.toString()}`, {
    method: "GET"
  });

if (!response.ok) {
      const errorText = await response.text(); // Tenta ler o erro do Spring
      console.error(`❌ Erro na API (${response.status}):`, errorText);
      
      // Se for 401, o token expirou ou é inválido
      if (response.status === 401) return { error: "Unauthorized" };
      
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }
  const data = await response.json();
  return JSON.parse(JSON.stringify(data));
}