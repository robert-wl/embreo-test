import { MutationParams, QueryParams } from "@/lib/type/service.ts";
import { EventTypeEntity } from "@/lib/model/entity/event-type.entity.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api/fetch.ts";
import { CreateEventDTO } from "@/lib/model/schema/event/create-event.dto.ts";
import { LoginResponse } from "@/lib/model/response/auth/login.response.ts";

export function getAllEventTypes(options?: QueryParams<EventTypeEntity[]>) {
  return useQuery({
    queryKey: ["event-types"],
    queryFn: async () => {
      const [data, error] = await api.get<EventTypeEntity[]>("/api/v1/events/types");

      if (error) {
        throw new Error("An error occurred while fetching the event types");
      }

      return data;
    },
    ...options,
  });
}

export function useCreateEvent(options?: MutationParams<void, CreateEventDTO>) {
  return useMutation({
    mutationFn: async (body: CreateEventDTO) => {
      const [_, error] = await api.post<LoginResponse>("/api/v1/events", body);

      if (error) {
        throw new Error("An error occurred while creating event");
      }
    },
    ...options,
  });
}
