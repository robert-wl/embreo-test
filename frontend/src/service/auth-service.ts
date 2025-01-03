import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/fetch.ts";
import { UserEntity } from "@/lib/model/entity/user.entity.ts";
import { MutationParams, QueryParams } from "@/lib/type/service.ts";
import { LoginDTO } from "@/lib/model/schema/auth/login.dto.ts";
import { LoginResponse } from "@/lib/model/response/auth/login.response.ts";

export function getCurrentUser(options?: QueryParams<UserEntity>) {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const [data, error] = await api.get<UserEntity>("/api/v1/auth/me");

      if (error) {
        throw new Error("An error occurred while fetching the current user");
      }

      return data;
    },
    ...options,
  });
}

export function useLogin(options?: MutationParams<LoginResponse, LoginDTO>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: LoginDTO) => {
      const [data, error] = await api.post<LoginResponse>("/api/v1/auth/login", body);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    ...options,
    onSuccess: (data, v, c) => {
      options?.onSuccess?.(data, v, c);
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
