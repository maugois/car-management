export interface CarQueryParams {
  page: number;
  size: number;
  brand?: string;
  model?: string;
  year?: string;
  [key: string]: any;
}