import type { PaginationLinks, PaginationMeta } from "./pagination.types";

export interface ApiResponseSuccess<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  meta?: PaginationMeta;
  links?: PaginationLinks;
}

export interface ApiResponseError {
  code: number;
  status: string;
  message: string;
  errors: Record<string, string[]>;
}
