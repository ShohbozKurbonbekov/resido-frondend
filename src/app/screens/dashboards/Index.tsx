import { useGlobals } from "@/app/hooks/useGlobals";
import AgencyDashboard from "./agency/Index";
import AgentDashboard from "./agent/Index";
import AdminDashboard from "./admin/Index";
import NoFound from "@/app/components/NoFound";
import UserDashboard from "./user/Index";

export default function DashboardRouter() {
  const { authmember } = useGlobals();

  if (!authmember) return null;
  switch (authmember?.memberType) {
    case "ADMIN":
      return <AdminDashboard />;
    case "AGENT":
      return <AgentDashboard />;
    case "AGENCY":
      return <AgencyDashboard />;
    case "USER":
      return <UserDashboard />;
    default:
      return <NoFound title={"No dashboard found"} />;
  }
}
