import { useQuery } from "@tanstack/react-query";
import type { QueryParams } from "@/core/types/pagination.types";
import { reviewService } from "../services/review.servie";

export function useReviewAverage(bookId: string) {
  return useQuery({
    queryKey: ["review", bookId],
    queryFn: () => reviewService.getAverage(bookId),
  });
}

export function useReviewsByBook(bookId: string, params?: QueryParams) {
  return useQuery({
    queryKey: ["review", bookId, "list", params],
    queryFn: () => reviewService.getByBookId(bookId, params),
  });
}
