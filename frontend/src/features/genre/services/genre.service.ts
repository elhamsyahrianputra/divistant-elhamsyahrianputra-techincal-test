import { apiClient } from "@/core/lib/axios/api-client";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { GenreRequest } from "../schemas/genre.schema";
import type { Genre } from "../types/genre.types";

export const genreService = {
  getAll: async () => {
    const response =
      await apiClient.get<ApiResponseSuccess<Genre[]>>("/genres");
    return response.data;
  },

  create: async (request: GenreRequest) => {
    const response = await apiClient.post<ApiResponseSuccess<Genre>>(
      "/genres",
      request,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponseSuccess<Genre>>(
      `/genres/${id}`,
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
