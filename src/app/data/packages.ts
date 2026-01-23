import type { SweetConfirmInputsType } from "@/lib/type/common";
import z from "zod";

// STYLES
export const SUBSCRIPTION_STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  CANCELLED: "bg-yellow-100 text-yellow-700",
  EXPIRED: "bg-red-100 text-red-700",
};

// RENEW AGENCY PAYMENT STATUS
export const RENEW_CONFIRM_INPUTS :SweetConfirmInputsType= {cancelBtnText:"No Cancel", confirmBtnText:"Yes, Renew",message:"You are about to update your payment status",title:"Updating pevious payment"}

// PAYMENT INPUT SCHEMAS
export const AGENCY_SUBSCRIPTION_FIELDS = [
  {
    name: "billingName",
    label: "Billing Name",
    placeholder: "Company or individual name",
    type: "text",
  },
  {
    name: "billingEmail",
    label: "Billing Email",
    placeholder: "billing@example.com",
    type: "email",
  },
  {
    name: "billingCity",
    label: "Billing City",
    placeholder: "City Name",
    type: "text",
  },
  {
    name: "billingCountry",
    label: "Billing Country",
    placeholder: "Country",
    type: "text", // can be select later
  },
  {
    name: "billingPostalCode",
    label: "Billing Postal Code",
    placeholder: "PostCode CRC-85",
    type: "text", // can be select later
  },
] as const;

export const AgencySubscriptionSchema = z.object({
  billingName: z.string().trim().min(1, { message: "Name is required" }),
  billingEmail: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),

  billingCity: z.string().trim().min(1, "City is required"),

  billingCountry: z.string().trim().min(1, "Country is required"),
  billingPostalCode: z.string().trim().min(1, "Postal Code is required"),
});

export type AgencySubscriptionInput = z.input<typeof AgencySubscriptionSchema>;
export type AgencySubscriptionType = z.infer<typeof AgencySubscriptionSchema>;
