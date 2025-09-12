import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import type { DashboardSidebar } from "@/lib/type/dashboard/dashboard";
import {
  BookMarked,
  Gauge,
  LogOut,
  MessageSquare,
  SquareUser,
} from "lucide-react";
import DashboardSideBar from "../Dashboard-sidebar";
import type { userDashboardSidebarType } from "@/lib/type/dashboard/user";
import SidebarToggleBtn from "./SidebarToggleBtn";
import UserFeaturesCard from "./UserFeaturesCard";

const userDashboard: DashboardSidebar[] = [
  { title: "dashboard", Icon: Gauge },
  { title: "saved listings", Icon: BookMarked },
  {
    title: "my inqueries and appointments",
    Icon: MessageSquare,
  },
  {
    title: "my profile",
    Icon: SquareUser,
  },
  { title: "logout", Icon: LogOut },
];

const userDashboardSidebar: userDashboardSidebarType = {
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
              {[1, 2, 3, 4, 5, 6].map((card, index) => (
                <UserFeaturesCard key={index} value={card} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
