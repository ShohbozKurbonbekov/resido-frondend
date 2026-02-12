import type {
  AgentPropertyType,
  AgentStatus,
  MemberStatus,
  MemberType,
} from "../enums/agent.enum";
import type { CommonInput, TotalCounter } from "./common";
import type { Property } from "./property";

export interface Social {
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  email: string | null;
}
export interface AgentPropertiesType {
  sale?: Property[];
  rent?: Property[];
}

export interface AgentInput {
  userId: string;
  agencyId: string;
  nickname: string;
  fullName: string;
  phone: string;
  address: string;
  avatar?: string | File;
  yearOfExperience: number;
  bioInfo: string;
  licenseNumber: string;
  certificate: string | File;
  socialLinks: Social;
}
export interface AgentData {
  _id: string;
  userId: string;
  agencyId: string;
  memberEmail: string;
  memberPassword: string;
  nickname: string;
  fullName: string;
  phone: string;
  address: string;
  avatar?: string;
  role: MemberType;
  yearOfExperience: number;
  bioInfo: string;
  licenseNumber: string;
  certificate: string | File;

  currentStatus: AgentStatus;
  agentMode: boolean;
  isVerified: boolean;

  points: number;
  views: number;
  totalLikes: number;
  totalComments: number;
  averageRating: number;
  totalProperties: number;
  totalSavings: number;

  featuredScore: number;
  rank: string;

  socialLinks: Social;
  properties?: AgentPropertiesType;
  limitedProperties?: Property[];
  featuredProperties?: Property[];
  comments?: [];

  meSaved?: boolean;
  createdAt: string;
  updatedDate: string;
}

export interface CommonAgentResults<TAgent = AgentData> {
  agents: TAgent[];
  totalNumbers: TotalCounter[];
}
export type AgentsListPage = CommonAgentResults;

export interface AgentProperties {
  agent: AgentData[];
}

export type ChosenAgentPageType = AgentProperties;

export interface FollowedAgent {
  _id: string;
  agencyId: string;
  nickname: string;
  fullName: string;
  averageRating: number;
  createdAt: number;
  totalSavings: number;
  propertiesNumber: number;
  avatar?: string;
}

export type FollowedAgentsType = CommonAgentResults<FollowedAgent>;

export type featuredAgentsInput = CommonInput;
export type FeaturedAgentsResult = CommonAgentResults;

export interface AgentPropertiesInput extends CommonInput {
  agentPropertyType?: AgentPropertyType;
  searchLocation?: string;
}

export interface AgentDashboardOverviewType {
  myProperties: TotalCounter;
  myBlogs: TotalCounter;
  reviews: TotalCounter;
  messages: TotalCounter;
  totalLikes: TotalCounter;
  totalViews: TotalCounter;
  generatedAt: string | null;
}

export interface MyAgentsDashboardType {
  _id: string;
  userId: string;
  nickname: string;
  fullName: string;
  currentStatus: AgentStatus;
  memberStatus: MemberStatus;
  agentMode: boolean;
  isVerified: boolean;
  avatar?: string;
}
