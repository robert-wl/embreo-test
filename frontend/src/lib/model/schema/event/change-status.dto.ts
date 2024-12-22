import { z } from "zod";
import { EventStatus } from "@/lib/model/entity/event.entity.ts";

export const changeStatusSchema = z
  .object({
    status: z.nativeEnum(EventStatus),
    remarks: z.string().min(1, "Remarks must be at least 1 characters").max(255, "Remarks must be at most 255 characters").optional(),
  })
  .refine((data) => !(data.status === EventStatus.REJECTED && !data.remarks), {
    message: "Remarks is required when rejecting an event",
  });

export type ChangeStatusDTO = z.infer<typeof changeStatusSchema>;
