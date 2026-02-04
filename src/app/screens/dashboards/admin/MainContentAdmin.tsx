import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useGlobals } from "@/app/hooks/useGlobals";
import DashboardSideBar from "../user/Dashboard-sidebar";
import SidebarToggleBtn from "../user/SidebarToggleBtn";
import type { User } from "@/lib/type/dashboard/user";
import { ADMIN_DASHBOARD_FEATURES } from "@/app/data/admin";

interface MainContentAdminType {
  children?: React.ReactNode;
}
export default function MainContentAdmin({ children }: MainContentAdminType) {
  const { authmember } = useGlobals();
  const member = authmember as User;

  return (
    <>
      <SectionIntroNoBackground title={`Welcome to your account Admin`} />
      <section className="py-10 bg-sky-100">
        <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-3 hidden lg:block">
            <DashboardSideBar
              name={member.memberName}
              avatar={member.avatar}
              address={member.memberAddress}
              DASHBOARD_FEATURES={ADMIN_DASHBOARD_FEATURES}
            />
          </div>

          <SidebarToggleBtn
            name={member.memberName}
            avatar={member.avatar}
            address={member.memberAddress}
            DASHBOARD_FEATURES={ADMIN_DASHBOARD_FEATURES}
          />

          <div className="lg:col-span-9">{children}</div>
        </div>
      </section>
    </>
  );
}
