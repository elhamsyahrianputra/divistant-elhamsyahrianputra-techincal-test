import { apiClient } from "@/core/lib/axios/api-client";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { QueryParams } from "@/core/types/pagination.types";
import type { Book } from "@/features/book/types/book.types";
import type { GenreRequest } from "../schemas/genre.schema";
import type { Genre } from "../types/genre.types";

export const genreService = {
  getAll: async (params?: QueryParams) => {
    const response = await apiClient.get<ApiResponseSuccess<Genre[]>>(
      "/genres",
      { params },
    );
    return response.data;
  },

  create: async (request: GenreRequest) => {
    const response = await apiClient.post<ApiResponseSuccess<Genre>>(
      "/genres",
      request,
    );
    return response.data;
  },

  getById: async (id: string, includes?: string) => {
    const params = includes ? { includes } : {};
    const response = await apiClient.get<ApiResponseSuccess<Genre>>(
      `/genres/${id}`,
      { params },
    );
    return response.data;
  },

  getBySlug: async (slug: string, includes?: string) => {
    const params = includes ? { includes } : {};
    const response = await apiClient.get<ApiResponseSuccess<Genre>>(
      `/genres/slug/${slug}`,
      { params },
    );
    return response.data;
  },

  getBooks: async (genreId: string, paginationParams?: QueryParams) => {
    const response = await apiClient.get<ApiResponseSuccess<Book[]>>(
      `/genres/${genreId}/books`,
      { params: paginationParams },
    );
    return response.data;
  },

  update: async (id: string, request: GenreRequest) => {
    const response = await apiClient.patch<ApiResponseSuccess<Genre>>(
      `/genres/${id}`,
      request,
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponseSuccess<undefined>>(
      `/genres/${id}`,
    );
    return response.data;
  },
};
