import { CompanyEntity } from "@/lib/model/entity/company.entity.ts";
import { EventTypeEntity } from "@/lib/model/entity/event-type.entity.ts";
import { UserEntity } from "@/lib/model/entity/user.entity.ts";
import { VendorEntity } from "@/lib/model/entity/vendor.entity.ts";
import { EventResponseEntity } from "@/lib/model/entity/event-response.entity.ts";

export type EventEntity = {
  id: string;
  dates: string[];
  location: string;
  status: EventStatus;
  approved_at?: string;
  approved_vendor?: VendorEntity;
  created_at: string;
  updated_at: string;

  event_responses?: EventResponseEntity[];
  company?: CompanyEntity;
  event_type?: EventTypeEntity;
  user?: UserEntity;
};

export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
