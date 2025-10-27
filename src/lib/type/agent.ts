import type {
  AgentStatus,
  MemberStatus,
  MemberType,
} from "../enums/agent.enum";
import type { CommonInput, TotalCounter } from "./common";

export interface Social {
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  email: string | null;
}
export interface AgentData {
  _id: string;
  agencyId: string;
  nickname: string;
  fullName: string;
  memberEmail: string;
  phone: string;
  memberPassword?: string;
  role: MemberType;
  address: string;
  yearOfExperience: number;
  bioInfo: string;
  memberStatus: MemberStatus;
  licenseNumber: string;
  points: number;
  socialLinks: Social;
  isVerified: boolean;
  // featuresScore
  totalComments: number;
  views: number;
  totalLikes: number;
  averageRating: number;
  featuredScore?: number;
  rank?: string;
  currentStatus: AgentStatus;
  avatar?: string;
}

export interface Agent {
  agentImage: string;
  agentName: string;
  agentMemberYear: number;
  agentPhone: string;
  agentLocation: string;
  agentPosition: string;
  agentCountry: string;
  agentCity: string;
  agentContacts: AgentSocialContacts;
  agentProperties?: number;
  agentDescription?: string;
  agentRating?: number;
  agentReviews?: number;
}

interface CommonAgentResults {
  agents: AgentData[];
  totalNumbers: TotalCounter[];
}

export type featuredAgentsInput = CommonInput;
export type FeaturedAgentsResult = CommonAgentResults;
/////////////////////////////////////////////// THIS SHOULD BE REMOVEED LATER, SO DON'T FORGET THAT

export interface AgentSocialContacts {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  email: string;
  skype?: string;
}
