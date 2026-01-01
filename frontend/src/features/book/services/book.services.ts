import { apiClient } from "@/core/lib/axios/api-client";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { QueryParams } from "@/core/types/pagination.types";
import type { BookRequest } from "../schemas/book.schema";
import type { Book } from "../types/book.types";

export const bookService = {
  getAll: async (params?: QueryParams) => {
    const response = await apiClient.get<ApiResponseSuccess<Book[]>>("/books", {
      params,
    });
    return response.data;
  },

  create: async (request: BookRequest) => {
    const response = await apiClient.post("/books", request);
    return response.data;
  },

  getById: async (id: string, includes?: string) => {
    const params = includes ? { includes } : {};
    const response = await apiClient.get<ApiResponseSuccess<Book>>(
      `/books/${id}`,
      { params },
    );
    return response.data;
  },

  getBySlug: async (slug: string, includes?: string) => {
    const params = includes ? { includes } : {};
    const response = await apiClient.get<ApiResponseSuccess<Book>>(
      `/books/slug/${slug}`,
      { params },
    );
    return response.data;
  },

  update: async (id: string, request: BookRequest) => {
    const response = await apiClient.patch<ApiResponseSuccess<Book>>(
      `/books/${id}`,
      request,
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponseSuccess<undefined>>(
      `/books/${id}`,
    );
    return response.data;
  },

  uploadCover: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append("cover", file);

    const response = await apiClient.post<ApiResponseSuccess<Book>>(
      `/books/${id}/upload-cover`,
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
