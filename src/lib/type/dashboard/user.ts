import type {
  MemberStatus,
  MemberType,
  UserCurrentStatus,
} from "@/lib/enums/agent.enum";
import type { Social, TotalCounter } from "../common";
import type { UserSavingTargetGroup } from "@/lib/enums/user.enum";
import type { LucideIcon } from "lucide-react";

export interface User {
  _id: string;

  memberEmail: string;
  memberPassword: string;
  role: MemberType;
  agentStatus: UserCurrentStatus;

  memberStatus: MemberStatus;

  memberName: string;
  memberPhone: string;
  occupation: string;
  memberAddress?: string;
  memberDescription?: string;
  avatar?: string;
  memberSocials: Social;
  userFullname?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface UserUpdate {
  _id?: string;
  memberName?: string;
  memberPhone?: string;
  memberEmail?: string;
  occupation?: string;
  memberSocials?: Social;
  userFullname?: string;
  memberAddress?: string;
  memberDescription?: string;
  avatar?: string | File;
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

//////////////////////////////////////////////////
export interface UserCardsType {
  cardTitle: string;
  cardClasses: string;
  Icon: LucideIcon;
}

export interface UserDashboardOverviewType {
  savedProperties: TotalCounter;
  savedArticles: TotalCounter;
  followedAgents: TotalCounter;
  reviews: TotalCounter;
  messages: TotalCounter;
  generatedAt: string | null;
}
