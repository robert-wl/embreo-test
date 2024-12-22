import { QueryParams } from "@/lib/type/service.ts";
import { EventTypeEntity } from "@/lib/model/entity/event-type.entity.ts";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/fetch.ts";

async function getAllEventTypes(options?: QueryParams<EventTypeEntity[]>) {
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
