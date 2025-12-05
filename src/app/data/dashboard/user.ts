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

export const USER_DASHBOARD_FEATURES: DashboardSidebarType[] = [
  { title: "Overview", Icon: Gauge, url: "/dashboard" },
  {
    title: "Saved Properties",
    Icon: BookMarked,
    url: "/dashboard/saved-properties",
  },
  { title: "Saved Agents", Icon: SquareUser, url: "/dashboard/saved-agents" },
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
