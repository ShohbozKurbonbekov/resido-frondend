import { z } from "zod";

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
      }),
    z
      .string()
      .trim()
      .min(1, { message: "File is required" })
      .url("Invalid certificate URL"),
  ]),

  licenseNumber: z
    .string()
    .trim()
    .min(1, "License number must be provided required")
    .max(30, "License number is too long"),
});

export type AgencyFormInputType = z.input<typeof agencyRequiredInputSchema>;
export type AgencyFormType = z.infer<typeof agencyRequiredInputSchema>;
