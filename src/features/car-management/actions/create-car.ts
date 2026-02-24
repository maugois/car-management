import { carData } from "../schemas/car";
import { authorizedFetch } from "../lib/api";

export async function createCar(data: carData) {
  const response = await authorizedFetch("/cars", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessão expirada ou usuário não autorizado.");
    }
    
    throw new Error("Erro ao cadastrar o veículo. Verifique os dados.");
  }

  return response.json();
}