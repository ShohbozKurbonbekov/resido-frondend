import type {
  AgentStatus,
  MemberStatus,
  MemberType,
} from "../enums/agent.enum";
import type { SortOrder } from "../enums/blog.enum";
import type { Social } from "./agent";
import type { CommonInput, TotalCounter } from "./common";

export interface LoginInput {
  memberEmail: string;
  memberPassword: string;
}

// USER AND AMDIN
export interface UserMemberInput {
  memberName: string;
  memberPhone: string;
  memberEmail: string;
  memberPassword: string;
  role: MemberType | string;
  occupation: string;
  memberStatus?: MemberStatus;
  memberAddress?: string;
  memberDescription?: string;
  memberSocials?: Social;
  userFullname?: string;
  avatar?: string;
}

// Admin panel

export interface AdminGetAllMembersCategory {
  username?: string;
  memberType?: MemberType;
}
export interface AdminGetAllMembersType extends CommonInput {
  status?: MemberStatus;
  sort?: SortOrder;
  memberCategory?: AdminGetAllMembersCategory;
}

export interface AdminGetCommonMember {
  id: string;
  name: string;
  type: MemberType;
  status: MemberStatus;
  phone: string;
  date: string;
}

export type AdminGetAgentType = AdminGetCommonMember & {
  verified: boolean;
  averageRating: number;
  businessStatus: AgentStatus;
  licenseNumber: string;
};

export type AdminGetAgencyType = AdminGetCommonMember &
  Pick<AdminGetAgentType, "licenseNumber" | "businessStatus" | "verified"> & {
    registrationNumber: string;
  };

export type AdminGetUserType = AdminGetCommonMember;

export type AdminDashboardCommonMember =
  | AdminGetAgencyType
  | AdminGetAgentType
  | AdminGetUserType;

export interface AdminMembers {
  metaCounter: TotalCounter[];
  members: AdminDashboardCommonMember[];
}

export interface AdminGlobalStatsType {
  properties: number;
  agents: number;
  users: number;
  agencies: number;
  blogs: number;
  comments: number;
  tariffs: number;
}

export interface AdminPersonalStatsType {
  notifications: number;
  myBlogs: number;
  myMessages: number;
}

export interface AdminDashboardOverviewType {
  adminId: string;
  globalStats: AdminGlobalStatsType;
  personalStats: AdminPersonalStatsType;
  generatedAt: string;
}
