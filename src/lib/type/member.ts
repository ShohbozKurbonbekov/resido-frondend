import type { MemberStatus, MemberType } from "../enums/agent.enum";
import type { Social } from "./agent";

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
