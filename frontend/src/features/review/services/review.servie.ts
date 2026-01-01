import { apiClient } from "@/core/lib/axios/api-client";
import type { ApiResponseSuccess } from "@/core/types/api.types";

interface AverageReview {
  average: number;
  totalReviews: number;
}

export const reviewService = {
    getAverage: async (bookId: string) => {
        const response = await apiClient.get<ApiResponseSuccess<AverageReview>>(`/reviews/book/${bookId}/average`)
        return response.data
    }
}
