import type { AgencyApplicationStatus } from "../enums/agencyApplication.enum";

export interface AgencyApplication {
  _id: string;
  userId: string;
  agencyId: string;
  status: AgencyApplicationStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
