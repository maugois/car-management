import { type CarFormData } from "../schemas/car";
import { authorizedFetch } from "../lib/api";

export async function editCar({ id, data }: { id: string | number; data: CarFormData }) {
  const response = await authorizedFetch(`/cars/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Sessão expirada.");
    throw new Error("Erro ao editar carro");
  }
  
  return response.json();
}