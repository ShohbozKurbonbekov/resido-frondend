import MemberPostBlog from "../MemberPostBlog";
import PostBlogHeader from "./PostBlogHeader";

export default function DashboardPostBlog() {
  return (
    <div className="flex flex-col gap-y-5">
      <PostBlogHeader />
      <MemberPostBlog />
    </div>
  );
}
