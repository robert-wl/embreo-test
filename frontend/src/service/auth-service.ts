import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api/fetch.ts";
import { UserEntity } from "@/lib/model/entity/user.entity.ts";
import { QueryParams } from "@/lib/type/service.ts";
import { LoginDTO } from "@/lib/model/schema/auth/login.dto.ts";
import { LoginResponse } from "@/lib/model/response/auth/login.response.ts";

export function getCurrentUser(options?: QueryParams<UserEntity>) {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const [data, error] = await api.get("/api/auth/me");

      if (error) {
        throw new Error("An error occurred while fetching the current user");
      }

      return data as UserEntity;
    },
    ...options,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (body: LoginDTO) => {
      const [data, error] = await api.post<LoginResponse>("/api/auth/login", body);

      if (error) {
        throw new Error("An error occurred while logging in");
      }

      return data;
    },
  });
}
