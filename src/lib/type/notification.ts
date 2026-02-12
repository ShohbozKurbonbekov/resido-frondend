import type { MemberType } from "../enums/agent.enum";
import type {
  NotificationEntityType,
  NotificationType,
} from "../enums/notification.enum";
import type { TotalCounter } from "./common";

export interface PaylaodType {
  actorName?: string;
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
  type: NotificationType;
  entityType: NotificationEntityType;
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

export interface ReviewNotificationType<TMember> {
  member: TMember;
  notification: NotificationCreation;
}
