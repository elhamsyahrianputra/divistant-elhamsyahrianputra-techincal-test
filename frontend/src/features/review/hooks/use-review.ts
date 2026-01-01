import { useQuery } from "@tanstack/react-query";
import { reviewService } from "../services/review.servie";

export function useReviewAverage(bookId: string) {
  return useQuery({
    queryKey: ["review", bookId],
    queryFn: () => reviewService.getAverage(bookId),
  });
}
