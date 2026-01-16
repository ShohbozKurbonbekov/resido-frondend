import type { PackagesType } from "@/lib/type/pricing";
import z from "zod";

export const paymentPackages: PackagesType[] = [
  {
    id: 1,
    name: "Basic Package",
    price: 19.99,
    paymentType: "monthly",
    benefits: [
      "Create up to 5 property listings",
      "Add up to 2 agents under your agency",
      "Basic customer support",
      "Standard visibility in search results",
      "Access to property management dashboard",
    ],
  },
  {
    id: 2,
    name: "Standard Package",
    price: 49.99,
    paymentType: "monthly",

    benefits: [
      "Create up to 20 property listings",
      "Add up to 5 agents under your agency",
      "Priority support with faster response",
      "Featured placement in search results",
      "Access to analytics and insights",
    ],
  },
  {
    id: 3,
    name: "Platinum Package",
    price: 99.99,
    paymentType: "monthly",
    benefits: [
      "Unlimited property listings",
      "Add unlimited agents under your agency",
      "24/7 premium customer support",
      "Top-tier visibility and promotion on homepage",
      "Advanced analytics and marketing tools",
      "Exclusive access to new platform features",
    ],
  },
];

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
    name: "billingAddress",
    label: "Billing Address",
    placeholder: "Street, building, office",
    type: "text",
  },
  {
    name: "billingCountry",
    label: "Billing Country",
    placeholder: "Country",
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

  billingAddress: z.string().trim().min(1, "Address is required"),
  billingCountry: z.string().trim().min(1, "Country is required"),
});

export type AgencySubscriptionInput = z.input<typeof AgencySubscriptionSchema>;
export type AgencySubscriptionType = z.infer<typeof AgencySubscriptionSchema>;
