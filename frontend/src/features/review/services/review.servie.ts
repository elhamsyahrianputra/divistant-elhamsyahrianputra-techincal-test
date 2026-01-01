import { apiClient } from "@/core/lib/axios/api-client";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { QueryParams } from "@/core/types/pagination.types";
import type { Review } from "../types/review.types";

interface AverageReview {
  average: number;
  totalReviews: number;
}

export const reviewService = {
  getAverage: async (bookId: string) => {
    const response = await apiClient.get<ApiResponseSuccess<AverageReview>>(
      `/reviews/book/${bookId}/average`,
    );
    return response.data;
  },

  getByBookId: async (bookId: string, params?: QueryParams) => {
    const response = await apiClient.get<ApiResponseSuccess<Review[]>>(
      `/reviews/book/${bookId}`,
      { params },
    );
    return response.data;
  },
};
