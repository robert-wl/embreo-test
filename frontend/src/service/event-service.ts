import { MutationParams, QueryParams } from "@/lib/type/service.ts";
import { EventTypeEntity } from "@/lib/model/entity/event-type.entity.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/fetch.ts";
import { CreateEventDTO } from "@/lib/model/schema/event/create-event.dto.ts";
import { LoginResponse } from "@/lib/model/response/auth/login.response.ts";
import { EventEntity } from "@/lib/model/entity/event.entity.ts";
import { ChangeStatusDTO } from "@/lib/model/schema/event/change-status.dto.ts";

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

interface GetEventsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export function getEvents(params?: GetEventsParams, options?: QueryParams<EventEntity[]>) {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }

      const [data, error] = await api.get<EventEntity[]>(`/api/v1/events?${searchParams.toString()}`);

      if (error) {
        throw new Error("An error occurred while fetching the events");
      }

      return data;
    },
    ...options,
  });
}

export function getEventById(id: string, options?: QueryParams<EventEntity>) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const [data, error] = await api.get<EventEntity>(`/api/v1/events/${id}`);

      if (error) {
        throw new Error("An error occurred while fetching the event");
      }

      return data;
    },
    ...options,
  });
}

export function useCreateEvent(options?: MutationParams<void, CreateEventDTO>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateEventDTO) => {
      const [_, error] = await api.post<LoginResponse>("/api/v1/events", body);

      if (error) {
        throw new Error("An error occurred while creating event");
      }
    },
    ...options,
    onSuccess: (d, v, c) => {
      options?.onSuccess?.(d, v, c);
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}

export function useChangeStatus(id: string, options?: MutationParams<void, ChangeStatusDTO>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const [_, error] = await api.post<void>(`/api/v1/events/${id}/status`, body);

      if (error) {
        throw new Error("An error occurred while changing the event status");
      }
    },
    ...options,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["events"],
      }),
  });
}
