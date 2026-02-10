import { useGlobals } from "@/app/hooks/useGlobals";
import { Button } from "@/components/ui/button";
import { MemberType } from "@/lib/enums/agent.enum";
import { useNavigate } from "react-router-dom";

// -------------------------------- Component --------------------
export default function AdminDashboardBlogFilterHeader() {
  const navigation = useNavigate();
  const { authmember } = useGlobals();

  // -------------------------------- Handlers --------------------
  // Navigate to post blog path
  const onPostBlog = () => {
    if (authmember && authmember.role === MemberType.REAL_ESTATE_ADMIN) {
      navigation("/admin/post/blog");
    }
  };

  // -------------------------------- Render --------------------

  return (
    <div className="flex  flex-col  gap-2  items-start sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg md:text-xl text-gray-700 font-jostFont tracking-tight ">
        Search, filter, and manage all blog posts
      </h2>
      <Button
        className="self-end sm:self-auto hover:opacity-60 duration-150 transition-colors ease-linear font-jostFont"
        onClick={onPostBlog}
      >
        Post New Blog
      </Button>
    </div>
  );
}
