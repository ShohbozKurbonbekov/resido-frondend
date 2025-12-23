import { useGlobals } from "@/app/hooks/useGlobals";
import AgentPostBlogContent from "./AgentPostBlogContent";
import AgentPostBlogHeader from "./AgentPostBlogHeader";
import { Navigate } from "react-router-dom";
import type { AgentData } from "@/lib/type/agent";

export default function AgentDashboardPostBlog() {
  const { authmember } = useGlobals();
  const member = authmember as AgentData;
  if (!member) {
    return <Navigate to="/" />;
  }
  return (
    <div className="lg:col-span-9">
      <div className="flex flex-col gap-y-5">
        <AgentPostBlogHeader />
        <AgentPostBlogContent agent={member} />
      </div>
    </div>
  );
}
