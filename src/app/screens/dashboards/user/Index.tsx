import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import type { DashboardSidebar } from "@/lib/type/dashboard/dashboard";
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
import DashboardSideBar from "../Dashboard-sidebar";
import SidebarToggleBtn from "./SidebarToggleBtn";
import UserFeaturesCard from "./UserFeaturesCard";
import { serverAPI } from "@/lib/config";
import type { UserDashboardSidebarType } from "@/lib/type/dashboard/user";

const userDashboard: DashboardSidebar[] = [
  { title: "Dashboard", Icon: Gauge }, // Overview
  { title: "Saved Properties", Icon: BookMarked }, // Wishlist / favorites
  { title: "My Reviews", Icon: SearchCheck }, // User reviews
  { title: "Messages", Icon: MessageSquare }, // Chat with agents/agencies
  { title: "My Profile", Icon: SquareUser }, // Account settings
  { title: "Saved Blogs / Articles", Icon: FileText }, // Saved blog posts
  { title: "Logout", Icon: LogOut }, // Exit session
];

const userCads = [
  {
    cardTitle: "Saved Properties",
    cardTitleAmount: 12,
    cardClasses: "green",
    url: `${serverAPI}/saved-properties`,
    Icon: Bookmark,
  },
  {
    cardTitle: "unread messages",
    cardTitleAmount: 45,
    cardClasses: "yellow",
    url: `${serverAPI}/unread-messages`,
    Icon: MessageSquare,
  },
  {
    cardTitle: "reviews written",
    cardTitleAmount: 41,
    cardClasses: "red",
    url: `${serverAPI}/my-reviews`,
    Icon: Edit3,
  },
  {
    cardTitle: "recomended properties",
    cardTitleAmount: 12,
    cardClasses: "blue",
    url: `${serverAPI}/recommended-properties`,
    Icon: Sparkles,
  },
  {
    cardTitle: "saved blogs / articles",
    cardTitleAmount: 54,
    cardClasses: "black",
    url: `${serverAPI}/saved-blogs-articles`,
    Icon: FileText,
  },
];
const userDashboardSidebar: UserDashboardSidebarType = {
  memberName: "Adam Harshvardhan",
  memberImage: "/img/user-2.jpg",
  memberLocation: "Canada USA",
};
export default function UserDashboard() {
  return (
    <>
      <SectionIntroNoBackground
        title="Welcome!"
        subtitle="Welcome to your account"
      />
      <section className="py-20 bg-sky-100 ">
        <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">
          {/* // sidebar */}
          <div className="lg:col-span-3 hidden lg:block ">
            <DashboardSideBar
              featuresData={userDashboard}
              data={userDashboardSidebar}
            />
          </div>
          <SidebarToggleBtn
            featuresData={userDashboard}
            data={userDashboardSidebar}
          />

          <div className="lg:col-span-9 flex flex-col gap-7">
            <div className="cards  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {userCads.map((card) => (
                <UserFeaturesCard values={card} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
