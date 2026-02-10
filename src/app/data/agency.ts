import type { Column, DashboardSidebarFeauturesType } from "@/lib/type/common";
import {
  Bell,
  BookOpen,
  CreditCard,
  FilePenLine,
  Gauge,
  Handshake,
  Home,
  LogOut,
  MessageSquare,
  User,
  UserCog,
} from "lucide-react";
import { z } from "zod";
import { SocialSchema } from "./agent";
import type { AdminGetAgencyType } from "@/lib/type/member";

export const agencyColumns: Column<AdminGetAgencyType>[] = [
  {
    key: "name",
    header: "Username",
  },

  { key: "type", header: "Member Type" },
  { key: "status", header: "System Status" },
  { key: "phone", header: "Phone" },
  {
    key: "date",
    header: "Date",
    render: (row) => new Date(row.date).toLocaleString(),
  },
  {
    key: "verified",
    header: "Verified",
  },

  {
    key: "businessStatus",
    header: "Business Status",
  },
  {
    key: "licenseNumber",
    header: "License Number",
  },
  {
    key: "registrationNumber",
    header: "registration Number",
  },
];

export const AGENCY_DASHBOARD_FEATURES: DashboardSidebarFeauturesType[] = [
  { title: "Overview", Icon: Gauge, url: "/dashboard" },
  {
    title: "Notifications",
    Icon: Bell,
    url: "/dashboard/agency-my-notifications",
  },
  {
    title: "Transactions",
    Icon: Handshake,
    url: "/dashboard/agency-transactions",
  },

  {
    title: "My properties",
    Icon: Home,
    url: "/dashboard/agency-my-properties",
  },

  {
    title: "My agents",
    Icon: UserCog,
    url: "/dashboard/agency-my-agents",
  },
  { title: "Messages", Icon: MessageSquare, url: "/dashboard/agency-messages" },
  {
    title: "Billing",
    Icon: CreditCard,
    url: "/dashboard/agency-billing",
  },
  { title: "Post blog", Icon: FilePenLine, url: "/dashboard/agency-post-blog" },

  { title: "My blogs", Icon: BookOpen, url: "/dashboard/agency-my-blogs" },

  { title: "My Profile", Icon: User, url: "/dashboard/agency-my-profile" },
  { title: "Logout", Icon: LogOut, url: "/logout" },
];

export const AGENCY_FORM_FIELDS = [
  {
    name: "memberName",
    label: "Agency Name",
    placeholder: "Agency name...",
    type: "text",
  },
  {
    name: "memberEmail",
    label: "Member Email",
    placeholder: "email@example.com",
    type: "email",
  },
  {
    name: "memberPhone",
    label: "Phone",
    placeholder: "01012345678",
    type: "text",
  },
  {
    name: "yearOfExperience",
    label: "Years of Experience",
    placeholder: "e.g. 5",
    type: "text",
  },
  {
    name: "agencyOwner",
    label: "Agency Owner",
    placeholder: "Owner full name...",
    type: "text",
  },
  {
    name: "licenseNumber",
    label: "License Number",
    placeholder: "License number...",
    type: "text",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Agency address...",
    type: "textarea",
  },
] as const;

export const agencyRequiredInputSchema = z.object({
  memberName: z
    .string()
    .min(1, "Agency name must be provided")
    .max(50, "Agency name is too long"),

  memberEmail: z.string().trim().email("Invalid email address"),

  memberPhone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .regex(/^\d{7,14}$/, {
      message: "Phone number must between 7 and 14 lengths",
    }),

  yearOfExperience: z
    .string()
    .trim()
    .min(1, "Required")
    .refine((val) => !Number.isNaN(Number(val)), {
      message: "Must be a number",
    }),

  address: z
    .string()
    .min(1, "Address must be provided")
    .max(70, "Address is too long"),

  agencyOwner: z
    .string()
    .min(1, "Agency owner name must be provided")
    .max(70, "Agency owner name is too long"),

  certificate: z.union([
    z
      .instanceof(File)
      .refine((file) => file.type === "application/pdf", {
        message: "Certificate must be a PDF file",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "Certificate must be smaller than 5MB",
      })
      .nullable(),
  ]),

  licenseNumber: z
    .string()
    .trim()
    .min(1, "License number must be provided required")
    .max(30, "License number is too long"),
});

export const agencyProfileSchema = agencyRequiredInputSchema.extend({
  socialLinks: SocialSchema,
  bioInfo: z.string().trim().max(60, "Biography is too long").optional(),
  avatar: z.union([z.instanceof(File), z.string().url()]).optional(),
});

export type AgencyPofileInput = z.input<typeof agencyProfileSchema>;

export type AgencyProfileType = z.infer<typeof agencyProfileSchema>;

export type AgencyFormInputType = z.input<typeof agencyRequiredInputSchema>;
export type AgencyFormType = z.infer<typeof agencyRequiredInputSchema>;
