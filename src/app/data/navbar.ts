import z from "zod";

interface NavbarPagesType {
  name: string;
  url: string;
}
export const navbarPages: NavbarPagesType[] = [
  { name: "Home", url: "/" },
  { name: "Properties", url: "/property/getAll" },
  { name: "Agents", url: "/agents" },
  { name: "Agencies", url: "/agencies" },
  { name: "Blogs", url: "/blogs" },
  { name: "Pricing", url: "/pricing" },
  { name: "Contact Us", url: "/contact-us" },
  { name: "FAQ", url: "/Faqs" },
  { name: "About Us", url: "/about-us" },
];

export const FORM_SCHEMA = z.object({
  memberName: z.string().trim().min(1, { message: "Name is required" }),
  memberEmail: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  memberPhone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{6,14}$/, {
      message: "Invalid phone number format",
    }),
  memberPassword: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
  occupation: z.string().trim().min(1, { message: "Occupation is required" }),
});

export type SIGNUP_INPUT = z.input<typeof FORM_SCHEMA>;
export type SIGNUP_SUBMIT = z.infer<typeof FORM_SCHEMA>;

export const SIGNUP_FORM_FIELDS = [
  {
    name: "memberName",
    label: "Name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    name: "memberEmail",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "memberPhone",
    label: "Phone",
    placeholder: "Enter your phone number",
    type: "text",
  },
  {
    name: "memberPassword",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "occupation",
    label: "Occupation",
    placeholder: "Enter your occupation",
    type: "text",
  },
] as const;

export const LOGIN_FORM_SCHEMA = z.object({
  memberEmail: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  memberPassword: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});
