import { UserEntity } from "@/lib/model/entity/user.entity.ts";
import { EventTypeEntity } from "@/lib/model/entity/event-type.entity.ts";

export type VendorEntity = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;

  event_types?: EventTypeEntity[];
  users?: UserEntity[];
};
