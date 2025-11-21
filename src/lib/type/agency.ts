import type {
  AgencyCurrentBadge,
  SubscriptionStatus,
  SubscriptionTarrif,
} from "../enums/agency.enum";
import type { MemberStatus, MemberType } from "../enums/agent.enum";
import type { Social, TotalCounter } from "./common";

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
  memberPhone: string;
  address: string;
  bioInfo: string;
  avatar?: string;
  agencyOwner: string;
  country: string;
  city: string;
  memberSince: string;
  permittedProperties: number;
  agencyBadge?: AgencyCurrentBadge;
  registrationNumber: string;
  agentsTotalNumber: number;
  propertiesTotalNumber: number;
  featuredScore: number;
  billingInfo: BillingInfoType;
  socialLinks: Social;
  isVerified: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface AgenciesListPage {
  agencies: Agency[];
  totalNumbers: TotalCounter[];
}
