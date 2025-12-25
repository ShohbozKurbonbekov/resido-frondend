import MyBlogsContent from "@/app/components/blog/MyBlogsContent";
import MyBlogsHeader from "@/app/components/blog/MyBlogsHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import type { CommonInput } from "@/lib/type/common";
import { useEffect, useState } from "react";

const myBlogs = { blogs: [], totalBlogsNumber: [{ total: 0 }] };

export const myBlogsWrapperClasses =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4";

export default function AgentDashboardMyBlogs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [MyBlogsInput, setMyBlogsInput] = useState<CommonInput>({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    try {
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className="lg:col-span-9">
      <div className="flex flex-col gap-y-5 h-full">
        <MyBlogsHeader />

        {loading ? (
          <SpinnerGrids columns={myBlogsWrapperClasses} count={3} />
        ) : (
          <MyBlogsContent
            myBlogs={myBlogs}
            myBlogsInput={MyBlogsInput}
            setMyBlogsInput={setMyBlogsInput}
          />
        )}
      </div>
    </div>
  );
}
