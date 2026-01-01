import { apiClient } from "@/core/lib/axios/api-client";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { QueryParams } from "@/core/types/pagination.types";
import type { Book } from "@/features/book/types/book.types";
import type { AuthorRequest } from "../schemas/author.schema";
import type { Author } from "../types/author.types";

export const authorService = {
  getAll: async (params?: QueryParams) => {
    const response = await apiClient.get<ApiResponseSuccess<Author[]>>(
      "/authors",
      { params },
    );
    return response.data;
  },

  create: async (request: AuthorRequest) => {
    const response = await apiClient.post<ApiResponseSuccess<Author>>(
      "/authors",
      request,
    );
    return response.data;
  },

  getById: async (id: string, includes?: string) => {
    const params = includes ? { includes } : {};
    const response = await apiClient.get<ApiResponseSuccess<Author>>(
      `/authors/${id}`,
      { params },
    );
    return response.data;
  },

  getBooks: async (authorId: string, paginationParams?: QueryParams) => {
    const response = await apiClient.get<ApiResponseSuccess<Book[]>>(
      `/authors/${authorId}/books`,
      { params: paginationParams },
    );
    return response.data;
  },

  update: async (id: string, request: AuthorRequest) => {
    const response = await apiClient.patch<ApiResponseSuccess<Author>>(
      `/authors/${id}`,
      request,
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponseSuccess<undefined>>(
      `/authors/${id}`,
    );
    return response.data;
  },

  uploadImage: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post<ApiResponseSuccess<Author>>(
      `/authors/${id}/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
};
