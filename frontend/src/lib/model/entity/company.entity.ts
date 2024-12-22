import { UserEntity } from "@/lib/model/entity/user.entity.ts";

export type CompanyEntity = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  users?: UserEntity[];
};
