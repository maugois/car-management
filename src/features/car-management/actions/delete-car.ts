"use server";

import { authorizedFetch } from "../lib/api";

export async function deleteCar(id: string | number) {
  try {
    const response = await authorizedFetch(`/cars/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao deletar o veículo");
    }

    return { success: true }; 
  } catch (error: any) {
    throw new Error(error.message || "Erro desconhecido");
  }
}