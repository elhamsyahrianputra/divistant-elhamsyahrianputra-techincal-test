import { apiClient } from "@/core/lib/axios/api-client";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { LoginRequest, RegisterRequest } from "../schemas/auth-schema";
import type { LoginResponse, RegisterResponse } from "../types/auth.types";

export const authService = {
  login: async (
    request: LoginRequest,
  ): Promise<ApiResponseSuccess<LoginResponse>> => {
    const response = await apiClient.post<ApiResponseSuccess<LoginResponse>>(
      "/auth/login",
      request,
    );
    return response.data;
  },

  register: async (
    request: RegisterRequest,
  ): Promise<ApiResponseSuccess<RegisterResponse>> => {
    const response = await apiClient.post<ApiResponseSuccess<RegisterResponse>>(
      "/auth/register",
      request,
    );
    return response.data;
  },
};
