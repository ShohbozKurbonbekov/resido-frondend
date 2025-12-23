import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleGauge } from "lucide-react";
import DashboardSideBar from "./Dashboard-sidebar";
import React from "react";
import type { DashboardSidebarFeauturesType } from "@/lib/type/common";

interface SidebarToggleBtnType {
  name: string;
  avatar: string | undefined;
  address: undefined | string;
  DASHBOARD_FEATURES: DashboardSidebarFeauturesType[];
}
const SidebarToggleBtn: React.FC<SidebarToggleBtnType> = React.memo(
  ({ DASHBOARD_FEATURES, address, avatar, name }) => {
    return (
      <div className="lg:hidden block w-full">
        <Sheet>
          <SheetTrigger className="w-full py-2 px-3 bg-darkBlue text-center flex flex-row items-center justify-center gap-2 capitalize border-0 outline-none focus-visible:ring-0 rounded-md hover:blue-700 transition-colors duration-200 ease-linear group text-white">
            <CircleGauge className="h-4 w-4  group-active:rotate-90    transition-transform duration-200 ease-linear" />
            dashboard
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-[70%] overflow-y-auto">
            <DashboardSideBar
              name={name}
              avatar={avatar}
              address={address}
              DASHBOARD_FEATURES={DASHBOARD_FEATURES}
            />
          </SheetContent>
        </Sheet>
      </div>
    );
  }
);

export default SidebarToggleBtn;
