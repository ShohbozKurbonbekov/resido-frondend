import type { DashboardSidebarFeauturesType } from "@/lib/type/common";
import type { UserCardsType } from "@/lib/type/dashboard/user";
import {
  Bookmark,
  BookMarked,
  Edit3,
  FileText,
  Gauge,
  LogOut,
  MessageSquare,
  SearchCheck,
  Sparkles,
  SquareUser,
} from "lucide-react";
import z from "zod";

export const USER_DASHBOARD_FEATURES: DashboardSidebarFeauturesType[] = [
  { title: "Overview", Icon: Gauge, url: "/dashboard" },
  { title: "notifications", Icon: Gauge, url: "/dashboard/notifications" },

  {
    title: "Saved Properties",
    Icon: BookMarked,
    url: "/dashboard/saved-properties",
  },
  {
    title: "followed Agents",
    Icon: SquareUser,
    url: "/dashboard/followed-agents",
  },
  { title: "Saved Articles", Icon: FileText, url: "/dashboard/saved-articles" },
  { title: "Reviews", Icon: SearchCheck, url: "/dashboard/reviews" },
  { title: "Messages", Icon: MessageSquare, url: "/dashboard/messages" },
  { title: "My Profile", Icon: SquareUser, url: "/dashboard/my-profile" },
  { title: "Logout", Icon: LogOut, url: "/logout" },
];

export const USER_CARDS: UserCardsType[] = [
  {
    cardTitle: "Saved Properties",
    cardClasses: "green",
    Icon: Bookmark,
  },
  {
    cardTitle: "unread messages",
    cardClasses: "yellow",
    Icon: MessageSquare,
  },
  {
    cardTitle: "reviews written",
    cardClasses: "red",
    Icon: Edit3,
  },
  {
    cardTitle: "recomended properties",
    cardClasses: "blue",
    Icon: Sparkles,
  },
  {
    cardTitle: "saved blogs / articles",
    cardClasses: "black",
    Icon: FileText,
  },
];

export const USER_SOCIALS: (
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "email"
)[] = ["facebook", "twitter", "instagram", "linkedin", "email"];

export const USER_PROFILE_FIELDS = [
  {
    name: "memberName",
    label: "Name",
    placeholder: "Enter your name",
    inputType: "text",
    elementType: "input",
  },
  {
    name: "memberEmail",
    label: "Email",
    placeholder: "email@example.com",
    inputType: "email",
    elementType: "input",
  },
  {
    name: "memberPhone",
    label: "Phone",
    placeholder: "01012345678",
    inputType: "text",
    elementType: "input",
  },
  {
    name: "occupation",
    label: "Occupation",
    placeholder: "Frontend Developer",
    inputType: "text",
    elementType: "input",
  },
  {
    name: "userFullname",
    label: "Full Name",
    placeholder: "John Doe",
    inputType: "text",
    elementType: "input",
  },
  {
    name: "memberAddress",
    label: "Address",
    placeholder: "Seoul, South Korea",
    inputType: "text",
    elementType: "input",
  },
  {
    name: "memberDescription",
    label: "About",
    placeholder: "Tell us about yourself...",
    inputType: "text",
    elementType: "textarea",
  },
] as const;

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

export const UserProfileSchema = z.object({
  memberName: z.string().trim().min(1, { message: "Name is required" }),
  memberEmail: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  memberPhone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .regex(/^\d{7,14}$/, {
      message: "Phone number must be between 7 and 14 digits",
    }),

  occupation: z.string().trim().min(1, { message: "Occupation is required" }),

  userFullname: z.string().trim().optional(),

  memberAddress: z.string().trim().optional(),

  memberDescription: z.string().trim().optional(),

  avatar: z.union([z.instanceof(File), z.string().url()]).optional(),

  memberSocials: SocialSchema,
});

export type UserProfileInput = z.input<typeof UserProfileSchema>;

export type UserProfileSubmitType = z.infer<typeof UserProfileSchema>;
