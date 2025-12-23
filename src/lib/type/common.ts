import type { LucideIcon } from "lucide-react";
import type { Agency } from "./agency";
import type { AgentData, AgentPropertiesInput } from "./agent";
import type { User } from "./dashboard/user";
import type { PropertiesSearchInput } from "./property";

export interface T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TotalCounter {
  total?: number;
}

export interface CommonInput {
  page: number;
  limit: number;
}

export interface SellersSearchInput extends CommonInput {
  location?: string;
}

// FOR USE STATE SETTER FUNCTION
export type PaginationSetStateType =
  | React.Dispatch<React.SetStateAction<PropertiesSearchInput>>
  | React.Dispatch<React.SetStateAction<SellersSearchInput>>
  | React.Dispatch<React.SetStateAction<AgentPropertiesInput>>;

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type CommonUsers = User | Agency | AgentData;
export interface LoginResult {
  accessToken: string;
  member: CommonUsers;
}
export interface Social {
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  email: string | null;
}
export interface SellerDataType {
  role: string;
  address: string;
  currentStatus?: string;
  name: string;
  isVerified: boolean;
  memberEmail: string;
  phone: string;
  yearOfExperience: number | string;
  rank: string | undefined;
  memberYear?: string;
}

export interface ToggleBtnState {
  type: string;
}

export type SocialsPlatform =
  | "facebook"
  | "email"
  | "instagram"
  | "linkedin"
  | "twitter";

export interface DashboardSidebarFeauturesType {
  url: string;
  title: string;
  Icon: LucideIcon; // Overview
}
