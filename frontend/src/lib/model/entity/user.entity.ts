import { CompanyEntity } from "@/lib/model/entity/company.entity.ts";

export type UserEntity = {
  id: string;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;

  company?: CompanyEntity;
};
