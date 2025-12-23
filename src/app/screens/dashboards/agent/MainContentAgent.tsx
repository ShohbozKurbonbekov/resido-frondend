import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { AgentData } from "@/lib/type/agent";
import DashboardSideBar from "../user/Dashboard-sidebar";
import SidebarToggleBtn from "../user/SidebarToggleBtn";
import { AGENT_DASHBOARD_FEATURES } from "@/app/data/dashboard/agent";

interface MainContentAgentType {
  children?: React.ReactNode;
}
export default function MainContentAgent({ children }: MainContentAgentType) {
  const { authmember } = useGlobals();
  const member = authmember as AgentData;

  return (
    <>
      <SectionIntroNoBackground
        title={`Welcome to your account ${member.nickname}`}
      />
      <section className="py-10 bg-sky-100">
        <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-3 hidden lg:block">
            <DashboardSideBar
              name={member.fullName}
              avatar={member.avatar}
              address={member.address}
              DASHBOARD_FEATURES={AGENT_DASHBOARD_FEATURES}
            />
          </div>

          <SidebarToggleBtn
            name={member.fullName}
            avatar={member.avatar}
            address={member.address}
            DASHBOARD_FEATURES={AGENT_DASHBOARD_FEATURES}
          />

          {children}
        </div>
      </section>
    </>
  );
}
