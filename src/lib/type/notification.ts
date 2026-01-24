import type { MemberType } from "../enums/agent.enum";
import type {
  AgentNotificationEntityType,
  AgentNotificationType,
} from "../enums/notification.enum";
import type { TotalCounter } from "./common";

export interface AgentApprovePayload {
  agencyName: string;
}

export interface AgentRejectedPayload {
  reason: string;
}

export type AgentNotificationPayload =
  | AgentApprovePayload
  | AgentRejectedPayload
  | null;

export interface AgentNotificationCreation {
  _id: string;
  recipientId: string;
  recipientRole: MemberType;
  type: AgentNotificationType;
  entityType: AgentNotificationEntityType;
  entityId: string;
  actionRequired: boolean;
  payload?: AgentNotificationPayload;
  createdAt: string;
  updatedAt: string;
}

export interface MyNotifications {
  notifications: AgentNotificationCreation[];
  metaCounter: TotalCounter[];
}
