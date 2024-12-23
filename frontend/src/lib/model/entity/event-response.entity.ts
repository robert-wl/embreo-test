import { EventEntity } from "@/lib/model/entity/event.entity.ts";
import { VendorEntity } from "@/lib/model/entity/vendor.entity.ts";

export type EventResponseEntity = {
  id: string;
  status: string;
  remarks: string;
  created_at: string;
  updated_at: string;

  event: EventEntity;
  vendor: VendorEntity;
};
