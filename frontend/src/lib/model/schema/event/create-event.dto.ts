import { z } from "zod";

export const createEventSchema = z.object({
  company_id: z.string().uuid("Company ID must be a valid UUID"),
  event_type_id: z.string().uuid("Event type ID must be a valid UUID"),
  location: z.string().min(1, "Location must be at least 1 characters").max(255, "Location must be at most 255 characters"),
  dates: z.array(z.date()).min(1, "Dates must have 3 date").max(3, "Dates must have 3 date"),
});

export type CreateEventDTO = z.infer<typeof createEventSchema>;