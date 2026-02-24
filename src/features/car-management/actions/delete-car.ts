import { authorizedFetch } from "../lib/api";

export async function deleteCar(id: string | number) {
  const response = await authorizedFetch(`/cars/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessão expirada. Você não tem permissão para deletar.");
    }
    
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao deletar o veículo");
  }

  return true;
}