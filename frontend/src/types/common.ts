export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}