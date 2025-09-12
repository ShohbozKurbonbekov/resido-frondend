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
          <div className="lg:col-span-3">
            <DashboardSideBar
              featuresData={userDashboard}
              data={userDashboardSidebar}
            />
          </div>
          <div className="lg:col-span-9 bg-red-500"> main</div>
        </div>
      </section>
    </>
  );
}
