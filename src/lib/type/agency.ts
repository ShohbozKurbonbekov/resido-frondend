import type {
  AgencyCurrentBadge,
  AgencyStatus,
  AgencyTargetType,
  SubscriptionStatus,
  SubscriptionTarrif,
} from "../enums/agency.enum";
import type { MemberStatus, MemberType } from "../enums/agent.enum";
import type { AgentData } from "./agent";
import type { CommonInput, Social, TotalCounter } from "./common";
import type { Property } from "./property";

export interface agencyContactsType {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  email: string;
  skype?: string;
}
export interface BillingInfoType {
  planName: SubscriptionTarrif;
  subscriptionDate: string;
  subscriptionStatus: SubscriptionStatus;
}
export interface Agency {
  _id: string;
  role: MemberType.AGENCY;
  memberName: string;
  memberEmail: string;
  memberStatus: MemberStatus;
  currentStatus: AgencyStatus;
  memberPhone: string;
  address: string;
  bioInfo?: string;
  avatar?: string;
  agencyOwner: string;
  memberSince: string;
  permittedProperties: number;
  agencyBadge?: AgencyCurrentBadge;
  yearOfExperience: number | string;
  agencyItems?: AgencyToggleStateType;
  registrationNumber: string;
  agentsTotalNumber: number;
  propertiesTotalNumber: number;
  featuredScore: number;
  billingInfo: BillingInfoType;
  socialLinks: Social;
  isVerified: boolean;
  views: number;
  paginatedAgents?: AgentData[];
  totalAgentsNumber?: number;
  paginatedProperties?: Property[];
  totalPropertiesNumber?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AgenciesListPage {
  agencies: Agency[];
  totalNumbers: TotalCounter[];
}

export interface ChosenAgencyPropertiesType {
  properties: Property[];
  metaCounter: TotalCounter[];
}
export interface ChosenAgencyAgentsType {
  agents: AgentData[];
  metaCounter: TotalCounter[];
}

export interface AgencyToggleStateType {
  agents?: AgentData[];
  properties?: Property[];
}

export interface AgencyAgePropertiesInput extends CommonInput {
  agencyTarget?: AgencyTargetType;
  location?: string;
}

export interface ChosenAgencyTargetItemsType {
  agency: Agency | null;
}
