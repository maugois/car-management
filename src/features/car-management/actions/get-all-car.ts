"use server";

import { authorizedFetch } from "../lib/api";
import { getTranslations } from 'next-intl/server';
import { CarQueryParams } from "../types/car-params";
import { PaginatedResponse, Car } from "@/types/api";

export async function getAllCars(filters: CarQueryParams) : Promise<PaginatedResponse<Car> | { error: string }> {
  const t = await getTranslations('Dashboard');
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  const url = queryString ? `/cars?${queryString}` : '/cars';

  const response = await authorizedFetch(url, {
    method: "GET",
    next: { revalidate: 0 }
  });

  if (!response.ok) {   
      if (response.status === 401) return { error: t('errors.unauthorized') };
      if (response.status === 403) return { error: t('errors.forbidden') };
      if (response.status >= 500) return { error: t('errors.server_error') };
      
      return { error: t("errors.fetch_failed") };
  }

  const data: PaginatedResponse<Car> = await response.json();
  return data;
}