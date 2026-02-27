"use server";

import { authorizedFetch } from "../lib/api";
import { getTranslations } from "next-intl/server";

export async function deleteCar(id: string | number) {
  const t = await getTranslations('Dashboard');

  try {
    const response = await authorizedFetch(`/cars/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || t('errors.generic'));
    }

    return { success: true }; 
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : t('errors.generic');
    
    throw new Error(message);
  }
}