import type {
  DashboardSidebarType,
  UserCardsType,
} from "@/lib/type/dashboard/user";
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

export const USER_DASHBOARD_FEATURES: DashboardSidebarType[] = [
  { title: "Overview", Icon: Gauge, url: "/dashboard" },
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

const nullableUrl = z
  .string()
  .trim()
  .nullable()
  .refine(
    (v) => v === null || v === "" || z.string().url().safeParse(v).success,
    { message: "Invalid URL" }
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
      { message: "Invalid email" }
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
