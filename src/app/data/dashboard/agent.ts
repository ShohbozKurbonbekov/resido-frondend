import type { DashboardSidebarFeauturesType } from "@/lib/type/common";
import {
  Gauge,
  Home,
  PlusSquare,
  FilePenLine,
  MessageSquare,
  User,
  LogOut,
  Star,
  Bell,
  BookOpen,
} from "lucide-react";
import z from "zod";

export const AGENT_DASHBOARD_FEATURES: DashboardSidebarFeauturesType[] = [
  { title: "Overview", Icon: Gauge, url: "/dashboard" },
  { title: "Notifications", Icon: Bell, url: "/dashboard/agent-notifications" },

  { title: "My properties", Icon: Home, url: "/dashboard/agent-my-properties" },
  { title: "Reviews", Icon: Star, url: "/dashboard/agent-reviews" },

  { title: "Messages", Icon: MessageSquare, url: "/dashboard/agent-messages" },

  {
    title: "Create property",
    Icon: PlusSquare,
    url: "/dashboard/agent-create-property",
  },
  { title: "Post blog", Icon: FilePenLine, url: "/dashboard/agent-post-blog" },

  { title: "My blogs", Icon: BookOpen, url: "/dashboard/agent-my-blogs" },

  { title: "My Profile", Icon: User, url: "/dashboard/agent-my-profile" },
  { title: "Logout", Icon: LogOut, url: "/logout" },
];

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
