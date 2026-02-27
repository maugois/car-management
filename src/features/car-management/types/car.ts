export interface Car {
  id: string | number;
  brand: string;
  model: string;
  year: number;
  price?: number;
  color?: string;
  createdAt?: string;
}