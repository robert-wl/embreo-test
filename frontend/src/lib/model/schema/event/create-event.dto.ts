import { z } from "zod";

export const createEventSchema = z
  .object({
    company_id: z.string().uuid("Company ID must be a valid UUID"),
    event_type_id: z.string().uuid("Event type ID must be a valid UUID"),
    location: z.string().min(1, "Location must be at least 1 characters").max(255, "Location must be at most 255 characters"),
    dates: z
      .array(
        z.date().refine((d) => d.getTime() > Date.now(), {
          message: "Date must be in the future",
        }),
        {
          invalid_type_error: "Dates must be a valid date",
        },
      )
      .min(1, "Dates must have 3 date")
      .max(3, "Dates must have 3 date"),
  })
  .refine((data) => new Set(data.dates.map((date) => date.getTime())).size === 3, {
    message: "Dates must be unique",
    path: ["dates"],
  });

export type CreateEventDTO = z.infer<typeof createEventSchema>;
