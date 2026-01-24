import type { AgentApplicationStatus } from "../enums/agentApplication";

export interface AgentApplication {
  _id: string;
  userId: string;
  agencyId: string;
  agentId: string;
  status: AgentApplicationStatus;
  reviewedBy: string;
  reviewedAt: string;
  rejectionReason: string;
  createdAt: Date;
  updatedAt: Date;
}
