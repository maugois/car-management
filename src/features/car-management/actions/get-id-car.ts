import { authorizedFetch } from "../lib/api";

export async function getCarById(id: string | number) {
  if (!id) return null;

  try {
    const response = await authorizedFetch(`/cars/${id}`, {
      method: "GET",
      next: { revalidate: 60, tags: [`car-${id}`] } 
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      if (response.status === 401) throw new Error("Não autorizado. Verifique seu login.");
      
      throw new Error(`Erro ao buscar o carro com ID: ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na busca por ID:", error);
    throw error;
  }
}