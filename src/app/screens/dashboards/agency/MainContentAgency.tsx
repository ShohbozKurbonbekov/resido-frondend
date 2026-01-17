import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useGlobals } from "@/app/hooks/useGlobals";
import DashboardSideBar from "../user/Dashboard-sidebar";
import SidebarToggleBtn from "../user/SidebarToggleBtn";
import type { Agency } from "@/lib/type/agency";
import { AGENCY_DASHBOARD_FEATURES } from "@/app/data/agency";

interface MainContentAgencyType {
  children?: React.ReactNode;
}
export default function MainContentAgency({ children }: MainContentAgencyType) {
  const { authmember } = useGlobals();
  const member = authmember as Agency;

  return (
    <>
      <SectionIntroNoBackground
        title={`Welcome to your account ${member.memberName}`}
      />
      <section className="py-10 bg-sky-100">
        <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-3 hidden lg:block">
            <DashboardSideBar
              name={member.memberName}
              avatar={member.avatar}
              address={member.address}
              DASHBOARD_FEATURES={AGENCY_DASHBOARD_FEATURES}
            />
          </div>

          <SidebarToggleBtn
            name={member.memberName}
            avatar={member.avatar}
            address={member.address}
            DASHBOARD_FEATURES={AGENCY_DASHBOARD_FEATURES}
          />

          <div className="lg:col-span-9">{children}</div>
        </div>
      </section>
    </>
  );
}
