import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type {
  ApiResponseError,
  ApiResponseSuccess,
} from "@/core/types/api.types";
import { tokenStorage } from "@/core/utils/token-storage";
import type { RegisterRequest } from "../schemas/auth-schema";
import { authService } from "../services/auth.service";
import type { RegisterResponse } from "../types/auth.types";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { token } = response.data;
      tokenStorage.set(token);
      router.push("/dashboard");
    },
  });
};

export function useRegister() {
  const router = useRouter();

  return useMutation<
    ApiResponseSuccess<RegisterResponse>,
    AxiosError<ApiResponseError>,
    RegisterRequest
  >({
    mutationFn: authService.register,

    onSuccess: (response) => {
      toast.success(response.message);
      router.push("/login");
    },
  });
}
