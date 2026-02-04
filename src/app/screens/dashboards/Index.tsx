import { useGlobals } from "@/app/hooks/useGlobals";
import AgencyDashboard from "./agency/Index";
import AgentDashboard from "./agent/Index";
import AdminDashboard from "./admin/Index";
import NoFound from "@/app/components/NoFound";
import { MemberType } from "@/lib/enums/agent.enum";
import UserDashboard from "./user/Index";
import { Navigate } from "react-router-dom";

export default function DashboardRouter() {
  const { authmember } = useGlobals();
  if (!authmember) {
    return <Navigate to="/" replace />;
  }

  switch (authmember?.role) {
    case MemberType.REAL_ESTATE_ADMIN:
      return <AdminDashboard />;
    case MemberType.AGENT:
      return <AgentDashboard />;
    case MemberType.AGENCY:
      return <AgencyDashboard />;
    case MemberType.USER:
      return <UserDashboard />;
    default:
      return <NoFound />;
  }
}
