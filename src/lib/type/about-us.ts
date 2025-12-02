import type { LucideIcon } from "lucide-react";
import type { Social } from "./common";

export interface TeamMemberType {
  id: string;
  memberName: string;
  memberRole: string;
  photoUrl: string;
  socialLinks: Social;
  phone?: string;
}

export interface CardsContentType {
  cardTitle: string;
  cardSubtitle: string;
  Icon: LucideIcon;
}
