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
  Users,
  Bell,
} from "lucide-react";

export const AGENT_DASHBOARD_FEATURES: DashboardSidebarFeauturesType[] = [
  { title: "Overview", Icon: Gauge, url: "/dashboard" },
  { title: "Notifications", Icon: Bell, url: "/dashboard/agent/notifications" },

  { title: "My properties", Icon: Home, url: "/dashboard/agent/my-properties" },
  { title: "Transactions", Icon: Users, url: "/dashboard/agent/transactions" },
  { title: "Reviews", Icon: Star, url: "/dashboard/agent/reviews" },

  { title: "Messages", Icon: MessageSquare, url: "/dashboard/agent/messages" },

  {
    title: "Create property",
    Icon: PlusSquare,
    url: "/dashboard/agent/create-property",
  },
  { title: "Post blog", Icon: FilePenLine, url: "/dashboard/agent/post-blog" },

  { title: "My Profile", Icon: User, url: "/dashboard/agent/my-profile" },
  { title: "Logout", Icon: LogOut, url: "/logout" },
];
