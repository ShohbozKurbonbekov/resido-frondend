import { useGlobals } from "@/app/hooks/useGlobals";
import type { AgentData } from "@/lib/type/agent";
import { Navigate } from "react-router-dom";
import AgentProfileHeader from "./myProfile/AgentProfileHeader";
import AgentProfileContent from "./myProfile/AgentProfileContent";

export default function AgentDashboardMyProfile() {
  const { authmember } = useGlobals();
  const agent = authmember as AgentData;

  if (!agent) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-y-5 h-full">
        <AgentProfileHeader />
        <AgentProfileContent agent={agent} />
      </div>
    </div>
  );
}
