import type { MemberType } from "../enums/agent.enum";
import type {
  AgentNotificationEntityType,
  AgentNotificationType,
} from "../enums/notification.enum";
import type { AgentData } from "./agent";
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

export interface NotificationOwnerType {
  ownerId: string;
  name: string;
  status: "available" | "rejected" | "pending" | "paused" | "payment_waiting";
  address: string;
  avatar?: string;
  createdAt: string;
  ownerType: MemberType;
}

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
  notificationOwner: NotificationOwnerType;
}

export interface AgencyNotifications {
  notifications: AgentNotificationCreation[];
  metaCounter: TotalCounter[];
}

export interface ReviewNotificationType {
  agent: AgentData;
  notification: AgentNotificationCreation;
}
