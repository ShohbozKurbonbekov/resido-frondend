import type {
  AgencyCurrentBadge,
  AgencyStatus,
  AgencyTargetType,
  PaymentProvider,
  SubscriptionStatus,
  SubscriptionTarrif,
} from "../enums/agency.enum";
import type { MemberStatus, MemberType } from "../enums/agent.enum";
import type { AgentData } from "./agent";
import type { CommonInput, Social, TotalCounter } from "./common";
import type { Property } from "./property";

export interface Agency {
  _id: string;
  role: MemberType.AGENCY;
  memberName: string;
  memberEmail: string;
  memberStatus: MemberStatus;
  currentStatus: AgencyStatus;
  certificate: string | File;
  licenseNumber: string;
  memberPhone: string;
  address: string;
  bioInfo?: string;
  socialLinks?: Social;
  avatar?: string;
  agencyOwner: string;
  memberSince: string;
  permittedProperties: number;
  permittedAgents: number;
  agencyBadge?: AgencyCurrentBadge;
  yearOfExperience: number | string;
  agencyItems?: AgencyToggleStateType;
  registrationNumber: string;
  agentsTotalNumber: number;
  propertiesTotalNumber: number;
  featuredScore: number;
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

//////////////////////////////// PAYMENT //////////////////
export interface AgencyPaymentSubmit {
  planName: SubscriptionTarrif;
  billingName: string;
  billingEmail: string;
  billingAddress: string;
  billingCountry: string;
}

export interface AgencyPaymentInfoResult extends AgencyPaymentSubmit {
  agencyId: string;
  subscriptionStatus: SubscriptionStatus;
  paymentProvider: PaymentProvider;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: Date;
}
