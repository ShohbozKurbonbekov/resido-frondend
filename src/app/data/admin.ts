import { BillingCycle } from "@/lib/enums/pricing.enum";
import type { DashboardSidebarFeauturesType } from "@/lib/type/common";
import type { Path } from "react-hook-form";

import {
  Bell,
  BookOpen,
  CreditCard,
  FileText,
  Gauge,
  LogOut,
  MessageCircle,
  MessageSquare,
  Pen,
  User,
  Users,
} from "lucide-react";
import z from "zod";

export const ADMIN_TARIFF_FORM_INITIAL = {
  billingCycle: BillingCycle.MONTHLY,
  currency: "",
  durationDays: "0",
  limits: { agents: "0", properties: "0" },
  name: "",
  price: "",
};

export const ADMIN_DASHBOARD_FEATURES: DashboardSidebarFeauturesType[] = [
  { title: "Overview", Icon: Gauge, url: "/dashboard" },

  {
    title: "Notifications",
    Icon: Bell,
    url: "/dashboard/admin-notifications",
  },

  {
    title: "Members",
    Icon: Users,
    url: "/dashboard/admin-members",
  },

  {
    title: "Member Blogs",
    Icon: BookOpen,
    url: "/dashboard/admin-blogs",
  },

  {
    title: "My Blogs",
    Icon: FileText,
    url: "/dashboard/admin-my-blogs",
  },

  {
    title: "Create Blog",
    Icon: Pen,
    url: "/dashboard/admin-createBlog",
  },
  {
    title: "Comments",
    Icon: MessageCircle,
    url: "/dashboard/admin-comments",
  },

  {
    title: "Messages",
    Icon: MessageSquare,
    url: "/dashboard/admin-my-messages",
  },
  {
    title: "Tariff Plans",
    Icon: CreditCard,
    url: "/dashboard/admin-tariffs",
  },

  {
    title: "My Profile",
    Icon: User,
    url: "/dashboard/admin-profile",
  },

  { title: "Logout", Icon: LogOut, url: "/logout" },
];

type BaseField = {
  name: Path<AdminSubmitTariffSchemaInput>;
  label: string;
};

type InputField = BaseField & {
  type: "input";
  placeholder?: string;
};

type SelectField = BaseField & {
  type: "select";
  options: readonly { label: string; value: string }[];
};
export type AdminTariffField = InputField | SelectField;

//Input fields
export const adminTariffFormFields: AdminTariffField[] = [
  {
    name: "name",
    label: "Tariff Name",
    placeholder: "ENTER TARIFF NAME (UPPERCASE)",
    type: "input",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "0",
    type: "input",
  },
  {
    name: "currency",
    label: "Currency",
    placeholder: "USD, UZS ...",
    type: "input",
  },
  {
    name: "billingCycle",
    label: "Billing Cycle",
    type: "select",
    options: [{ label: "Monthly", value: BillingCycle.MONTHLY }],
  },
  {
    name: "limits.agents",
    label: "Agent Limit",
    type: "input",
    placeholder: "0",
  },
  {
    name: "limits.properties",
    label: "Property Limit",
    placeholder: "0",
    type: "input",
  },
  {
    name: "durationDays",
    label: "Duration (days)",
    placeholder: "30 days",
    type: "input",
  },
] as const;

// Validation helper variables
export const numberString = z
  .string()
  .trim()
  .min(1, "Required")
  .refine((val) => !Number.isNaN(Number(val)), {
    error: "Must be a number",
  });

const upperCaseString = z
  .string()
  .trim()
  .min(1, "Name must be provided")
  .max(30, { message: "Characters must be under 30" })
  .refine((val) => val === val.toUpperCase(), {
    message: "All must be Uppercase",
  });

// Validation schema
export const adminSubmitTariffSchema = z.object({
  name: upperCaseString,
  price: numberString,
  currency: upperCaseString,
  billingCycle: z.nativeEnum(BillingCycle),
  durationDays: numberString,
  limits: z.object({
    agents: numberString,
    properties: numberString,
  }),
});

export type AdminSubmitTariffSchemaInput = z.input<
  typeof adminSubmitTariffSchema
>;
export type AdminSubmitTariffSchemaOutput = z.infer<
  typeof adminSubmitTariffSchema
>;
