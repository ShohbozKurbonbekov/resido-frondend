import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import DashboardSideBar from "../Dashboard-sidebar";
import SidebarToggleBtn from "../user/SidebarToggleBtn";
import UserFeaturesCard from "../user/UserFeaturesCard";
import type { DashboardSidebar } from "@/lib/type/dashboard/dashboard";
import {
  Eye,
  Gauge,
  Handshake,
  Heart,
  Home,
  MessageCircle,
  MessageSquare,
  Receipt,
  Star,
  User,
} from "lucide-react";
import type { AgencySidebarDataType } from "@/lib/type/dashboard/agency";
import { serverAPI } from "@/lib/config";

const featuresData: DashboardSidebar[] = [
  { title: "Dashboard", Icon: Gauge }, // Dashboard stats overview
  { title: "My Properties", Icon: Home }, // List of properties
  { title: "my agents", Icon: Handshake }, // Add a new property
  { title: "Messages", Icon: MessageCircle }, // Messages from users/clients
  { title: "Reviews", Icon: Star }, // Reviews received
  { title: "Profile Settings", Icon: User }, // Profile settings
];

const agencyProfile: AgencySidebarDataType = {
  memberName: "MIT Dealership Agency",
  memberImage: "/img/agency-1.png",
  memberLocation: "Highway broadway street,New York, ",
};
const agentCards = [
  {
    cardTitle: "total properties",
    cardTitleAmount: 42,
    cardClasses: "green",
    url: `${serverAPI}/agency/my-properties`,
    Icon: Home,
  },
  {
    cardTitle: "total agents",
    cardTitleAmount: 34,
    cardClasses: "yellow",
    url: `${serverAPI}/agency/my-agents`,
    Icon: Handshake,
  },
  {
    cardTitle: "unread messages",
    cardTitleAmount: 12,
    cardClasses: "yellow",
    url: `${serverAPI}/agency/unread-messages`,
    Icon: MessageSquare,
  },
  {
    cardTitle: "total views",
    cardTitleAmount: 833,
    cardClasses: "red",
    url: `${serverAPI}/agency/total-views`,
    Icon: Eye, // represents transactions / sales
  },
  {
    cardTitle: "likes",
    cardTitleAmount: 532,
    cardClasses: "blue",
    url: `${serverAPI}/agency-likes`,
    Icon: Heart, // heart for likes
  },
  {
    cardTitle: "average rating",
    cardTitleAmount: 2.4,
    cardClasses: "black",
    url: `${serverAPI}/agency-ratings`,
    Icon: Star, // star for ratings
  },
  {
    cardTitle: "transactions",
    cardTitleAmount: 63,
    cardClasses: "red",
    url: `${serverAPI}/agency-transactions`,
    Icon: Receipt, // star for ratings
  },
];
export default function AgencyDashboard() {
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
            <DashboardSideBar
              featuresData={featuresData}
              data={agencyProfile}
            />
          </div>
          <SidebarToggleBtn featuresData={featuresData} data={agencyProfile} />

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
