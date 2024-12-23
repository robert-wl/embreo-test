import { CompanyEntity } from "@/lib/model/entity/company.entity.ts";
import { VendorEntity } from "@/lib/model/entity/vendor.entity.ts";

export type UserEntity = {
  id: string;
  username: string;
  role: Role;
  created_at: string;
  updated_at: string;

  vendor?: VendorEntity;
  company?: CompanyEntity;
};


export enum Role {
    VENDOR = "vendor",
    COMPANY = "company",
}