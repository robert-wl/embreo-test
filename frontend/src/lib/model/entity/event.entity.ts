import { CompanyEntity } from "@/lib/model/entity/company.entity.ts";
import { EventTypeEntity } from "@/lib/model/entity/event-type.entity.ts";
import { UserEntity } from "@/lib/model/entity/user.entity.ts";

export type EventEntity = {
  id: string;
  dates: string[];
  location: string;
  status: EventStatus;
  accepted_at?: string;
  created_at: string;
  updated_at: string;

  company?: CompanyEntity;
  event_type?: EventTypeEntity;
  user?: UserEntity;
};

export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
