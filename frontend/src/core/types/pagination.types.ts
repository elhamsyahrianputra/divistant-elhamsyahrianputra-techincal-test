export interface PaginationMeta {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
}

export interface PaginationLinks {
  self: string;
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface QueryParams {
  search?: string;
  page?: number;
  limit?: number;
  includes?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
