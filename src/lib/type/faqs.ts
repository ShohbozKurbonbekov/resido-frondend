import type { LucideIcon } from "lucide-react";

export interface FaqsType {
  id: number;
  question: string;
  answer: string;
}

export interface ContactOptionsType {
  memberRole: string;
  title: string;
  Icon: LucideIcon;
}
