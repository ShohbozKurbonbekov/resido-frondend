import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import type { AgentSidebarDataType } from "@/lib/type/dashboard/agent";
import type { DashboardSidebar } from "@/lib/type/dashboard/dashboard";
import {
  BadgeDollarSign,
  Gauge,
  Heart,
  Home,
  MessageCircle,
  MessageSquare,
  PlusCircle,
  Star,
  User,
} from "lucide-react";
import DashboardSideBar from "../Dashboard-sidebar";
import SidebarToggleBtn from "../user/SidebarToggleBtn";
import { serverAPI } from "@/lib/config";
import UserFeaturesCard from "../user/UserFeaturesCard";

const featuresData: DashboardSidebar[] = [
  { title: "Dashboard", Icon: Gauge }, // Dashboard stats overview
  { title: "My Properties", Icon: Home }, // List of properties
  { title: "Add New Property", Icon: PlusCircle }, // Add a new property
  { title: "Messages", Icon: MessageCircle }, // Messages from users/clients
  { title: "Reviews", Icon: Star }, // Reviews received
  { title: "Profile Settings", Icon: User }, // Profile settings
];

const agentCards = [
  {
    cardTitle: "total properties",
    cardTitleAmount: 45,
    cardClasses: "green",
    url: `${serverAPI}/agent/my-properties`,
    Icon: Home,
  },
  {
    cardTitle: "unread messages",
    cardTitleAmount: 34,
    cardClasses: "yellow",
    url: `${serverAPI}/agent/unread-messages`,
    Icon: MessageSquare,
  },
  {
    cardTitle: "total views",
    cardTitleAmount: 131,
    cardClasses: "red",
    url: `${serverAPI}/agent/total-views`,
    Icon: BadgeDollarSign, // represents transactions / sales
  },
  {
    cardTitle: "likes",
    cardTitleAmount: 12,
    cardClasses: "blue",
    url: `${serverAPI}/agent-likes`,
    Icon: Heart, // heart for likes
  },
  {
    cardTitle: "average rating",
    cardTitleAmount: 54,
    cardClasses: "black",
    url: `${serverAPI}/agent-ratings`,
    Icon: Star, // star for ratings
  },
];

const agentProfile: AgentSidebarDataType = {
  memberName: "Daniel Racliffe",
  memberImage: "/img/user-5.jpg",
  memberLocation: "Australia Sydney",
};
export default function AgentDashboard() {
  return (
    <>
      <SectionIntroNoBackground
        title={"Welcome!"}
        subtitle={"Welcome to your account"}
      />
      <section className="py-20 bg-sky-100 ">
        <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">
          {/* // sidebar */}
          <div className="lg:col-span-3 hidden lg:block ">
            <DashboardSideBar featuresData={featuresData} data={agentProfile} />
          </div>
          <SidebarToggleBtn featuresData={featuresData} data={agentProfile} />

          <div className="lg:col-span-9 flex flex-col gap-7">
            <div className="cards  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {agentCards.map((card) => (
                <UserFeaturesCard values={card} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
