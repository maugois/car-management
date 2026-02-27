export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface Car {
  id: number | string;
  brand: string;
  model: string;
  year: number;
  price?: number;
}