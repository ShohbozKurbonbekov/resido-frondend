import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate } from "react-router-dom";
import AgencyProfileHeader from "./AgencyProfileHeader";
import AgencyProfileContent from "./AgencyProfileContent";
import { MemberType } from "@/lib/enums/agent.enum";

export default function AgencyDashboardMyProfile() {
  const { authmember } = useGlobals();

  if (!authmember || authmember.role !== MemberType.AGENCY) {
    return <Navigate to="/" />;
  }

  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      <div className="flex flex-col gap-y-5 h-full ">
        <AgencyProfileHeader />
        <AgencyProfileContent />
      </div>
    </div>
  );
}
