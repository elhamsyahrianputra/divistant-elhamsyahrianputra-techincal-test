export interface ApiResponseSuccess<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

export interface ApiResponseError {
  code: number;
  status: string;
  message: string;
  errors: Record<string, string[]>;
}
