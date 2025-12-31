import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiResponseError } from "@/core/types/api.types";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const axiosError = error as AxiosError<ApiResponseError>;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
  }
  return "An unexpected error occurred";
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      throwOnError: false,
    },
    mutations: {
      onError: (error) => {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      },
      throwOnError: false,
    },
  },
});
