import { myBlogsWrapperClasses } from "@/app/screens/dashboards/agent/post-blog/AgentDashboardMyBlogs";
import type { Blog } from "@/lib/type/blogs";
import type { CommonInput, SetStateType, T } from "@/lib/type/common";
import React from "react";
import { PaginationCom } from "../PaginationCom";
import NoFound from "../NoFound";
import MyBlogCard from "./MyBlogCard";

interface MyBlogsContentType {
  myBlogs: T;
  myBlogsInput: T;
  setMyBlogsInput: SetStateType<CommonInput>;
}
const MyBlogsContent: React.FC<MyBlogsContentType> = React.memo(
  ({ myBlogs, myBlogsInput, setMyBlogsInput }) => {
    return (
      <>
        {myBlogs?.blogs?.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className={myBlogsWrapperClasses}>
              {myBlogs.blogs.map((blog: Blog) => (
                <MyBlogCard blog={blog} />
              ))}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (myBlogs.totalBlogsNumber[0]?.total ?? 0) / myBlogsInput.limit
              )}
              styleclasses="flex flex-row items-center justify-center mt-6 gap-3"
              currentPage={myBlogsInput.page}
              onPageChange={setMyBlogsInput}
            />
          </div>
        ) : (
          <NoFound title="No blogs found" />
        )}
      </>
    );
  }
);

export default MyBlogsContent;
