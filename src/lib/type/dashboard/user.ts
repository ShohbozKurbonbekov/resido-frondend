import type { MemberStatus, MemberType } from "@/lib/enums/agent.enum";
import type { Social } from "../common";
import type { UserSavingTargetGroup } from "@/lib/enums/user.enum";

export interface UserDashboardSidebarType {
  memberName: string;
  memberImage: string;
  memberLocation: string;
}
export interface User {
  _id: string;
  memberName: string;
  memberPhone: string;
  memberEmail: string;
  memberPassword: string;
  role: MemberType;
  memberStatus: MemberStatus;
  memberSocials: Social;
  occupation: string;
  userFullname?: string;
  memberAddress?: string;
  memberDescription?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSavingsOutput {
  _id: string;
  targetId: string;
  userId: string;
  targetGroup: UserSavingTargetGroup;
  createdAt: string;
  updatedAt: string;
}

export interface UserSavingsInput {
  targetId: string;
}
