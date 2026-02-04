import type { DashboardSidebarFeauturesType } from "@/lib/type/common";
import {
  Bell,
  BookOpen,
  CreditCard,
  Gauge,
  Handshake,
  Home,
  LogOut,
  MessageCircle,
  MessageSquare,
  User,
  UserCog,
  Users,
} from "lucide-react";

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
    title: "Properties",
    Icon: Home,
    url: "/dashboard/admin-properties",
  },

  {
    title: "Blogs",
    Icon: BookOpen,
    url: "/dashboard/admin-blogs",
  },

  {
    title: "Comments",
    Icon: MessageCircle,
    url: "/dashboard/admin-comments",
  },

  {
    title: "Messages",
    Icon: MessageSquare,
    url: "/dashboard/admin-messages",
  },

  {
    title: "Transactions",
    Icon: Handshake,
    url: "/dashboard/admin-transactions",
  },

  {
    title: "Tariff Plans",
    Icon: CreditCard,
    url: "/dashboard/admin-tariffs",
  },

  {
    title: "Team Members",
    Icon: UserCog,
    url: "/dashboard/admin-team",
  },

  {
    title: "My Profile",
    Icon: User,
    url: "/dashboard/admin-profile",
  },

  { title: "Logout", Icon: LogOut, url: "/logout" },
];
