import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleGauge } from "lucide-react";
import DashboardSideBar from "../Dashboard-sidebar";
import type { DashboardSidebar } from "@/lib/type/dashboard/dashboard";
import type { UserDashboardSidebarType } from "@/lib/type/dashboard/user";

interface SidebarToggleBtnProps {
  featuresData: DashboardSidebar[];
  data: UserDashboardSidebarType;
}
export default function SidebarToggleBtn({
  featuresData,
  data,
}: SidebarToggleBtnProps) {
  return (
    <div className="lg:hidden block w-full">
      <Sheet>
        <SheetTrigger className="w-full py-2 px-3 bg-darkBlue text-center flex flex-row items-center justify-center gap-2 capitalize border-0 outline-none focus-visible:ring-0 rounded-md hover:blue-700 transition-colors duration-200 ease-linear group text-white">
          <CircleGauge className="h-4 w-4  group-active:rotate-90    transition-transform duration-200 ease-linear" />
          dashboard
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 w-[70%]">
          <DashboardSideBar
            featuresData={featuresData}
            data={data}
            wrapperClasses="sidebar w-full mb-7 pt-14 p-6 flex flex-col gap-y-7 bg-white rounded-md box-border items-center shadow-none"
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
