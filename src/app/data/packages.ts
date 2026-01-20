import z from "zod";

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
