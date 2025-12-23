import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { User } from "@/lib/type/dashboard/user";
import DashboardSideBar from "./Dashboard-sidebar";
import SidebarToggleBtn from "./SidebarToggleBtn";
import { USER_DASHBOARD_FEATURES } from "@/app/data/dashboard/user";

interface MainContentUSERType {
  children?: React.ReactNode;
}
export default function MainContentUSER({ children }: MainContentUSERType) {
  const { authmember } = useGlobals();
  const member = authmember as User;

  return (
    <>
      <>
        <SectionIntroNoBackground
          title={`Welcome to your account ${member.memberName}`}
          subtitle={""}
        />
        <section className="py-10 bg-sky-100">
          <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-3 hidden lg:block">
              <DashboardSideBar
                name={member.memberName}
                avatar={member.avatar}
                address={member.memberAddress}
                DASHBOARD_FEATURES={USER_DASHBOARD_FEATURES}
              />
            </div>

            <SidebarToggleBtn
              name={member.memberName}
              avatar={member.avatar}
              address={member.memberAddress}
              DASHBOARD_FEATURES={USER_DASHBOARD_FEATURES}
            />

            {children}
          </div>
        </section>
      </>
    </>
  );
}
