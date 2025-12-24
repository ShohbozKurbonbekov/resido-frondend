import AgentPostBlogHeader from "./AgentPostBlogHeader";
import MemberPostBlog from "../../../../components/MemberPostBlog";

export default function AgentDashboardPostBlog() {
  return (
    <div className="lg:col-span-9">
      <div className="flex flex-col gap-y-5">
        <AgentPostBlogHeader />
        <MemberPostBlog />
      </div>
    </div>
  );
}
