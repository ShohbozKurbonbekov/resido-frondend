import z from "zod";

const nullableUrl = z
  .string()
  .trim()
  .nullable()
  .refine(
    (v) => v === null || v === "" || z.string().url().safeParse(v).success,
    { message: "Invalid URL" },
  )
  .transform((v) => (v === "" ? null : v));

export const SocialSchema = z.object({
  facebook: nullableUrl,
  twitter: nullableUrl,
  instagram: nullableUrl,
  linkedin: nullableUrl,
  email: z
    .string()
    .trim()
    .nullable()
    .refine(
      (v) => v === null || v === "" || z.string().email().safeParse(v).success,
      { message: "Invalid email" },
    )
    .transform((v) => (v === "" ? null : v)),
});
export const AgentRegistrationSchema = z.object({
  agencyId: z.string().trim().min(1, "Agency is required"),

  userId: z.string().trim().min(1, "userId is required"),
  nickname: z
    .string()
    .trim()
    .min(1, "Nickname is required")
    .max(20, "Nickname is too long"),
  licenseNumber: z
    .string()
    .trim()
    .min(1, "License number is required")
    .max(30, "License number is too long"),

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
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(30, "Full name is too long"),

  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .regex(/^\d{7,14}$/, {
      message: "Phone number must between 7 and 14 lengths",
    }),
  address: z
    .string()
    .min(1, "Address is required")
    .max(50, "Address is too long"),

  yearOfExperience: z
    .number()
    .int({ message: "Input must be integer" })
    .min(0)
    .max(60),

  bioInfo: z
    .string()
    .min(1, "Biography is required")
    .max(60, "Bio is too long"),
  avatar: z.union([z.instanceof(File), z.string().url()]).optional(),
  socialLinks: SocialSchema,
});
