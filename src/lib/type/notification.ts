import type { MemberType } from "../enums/agent.enum";
import type {
  AgentNotificationEntityType,
  AgentNotificationType,
} from "../enums/notification.enum";
import type { AgentData } from "./agent";
import type { TotalCounter } from "./common";

export interface PaylaodType {
  agencyName?: string;
  reason?: string;
}

export interface NotificationOwnerType {
  ownerId: string;
  name: string;
  status: "available" | "rejected" | "pending" | "paused" | "payment_waiting";
  address: string;
  avatar?: string;
  createdAt: string;
  ownerType: MemberType;
}

export interface NotificationCreation {
  _id: string;
  recipientId: string;
  recipientRole: MemberType;
  type: AgentNotificationType;
  entityType: AgentNotificationEntityType;
  entityId: string;
  resolvedAt?: string;
  actionRequired: boolean;
  payload?: PaylaodType;
  createdAt: string;
  updatedAt: string;
  notificationOwner: NotificationOwnerType;
}

export interface NotificationsType<TNotification> {
  notifications: TNotification[];
  metaCounter: TotalCounter[];
}
export interface UserNotifications {
  notifications: Omit<NotificationCreation, "notificationOwner">[];
  metaCounter: TotalCounter[];
}

export interface ReviewNotificationType {
  agent: AgentData;
  notification: NotificationCreation;
}
