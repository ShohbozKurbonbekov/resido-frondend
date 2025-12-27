import { myBlogsWrapperClasses } from "@/app/screens/dashboards/agent/post-blog/AgentDashboardMyBlogs";
import type { Blog, BlogsListPage } from "@/lib/type/blogs";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import React, { useState } from "react";
import { PaginationCom } from "../PaginationCom";
import NoFound from "../NoFound";
import MyBlogCard from "./MyBlogCard";
import UpdateBLogDiolog from "./UpdateBlogDialog";

interface MyBlogsContentType {
  myBlogs: BlogsListPage;
  myBlogsInput: CommonInput;
  setMyBlogsInput: SetStateType<CommonInput>;
  handleDeleteBlog: (id: string) => Promise<void>;
}
const MyBlogsContent: React.FC<MyBlogsContentType> = React.memo(
  ({ myBlogs, myBlogsInput, setMyBlogsInput, handleDeleteBlog }) => {
    const [isModelOpen, setModelOpen] = useState<boolean>(false);
    const [selectedBlog, setSelectedBlog] = useState<null | Blog>(null);
    return (
      <>
        {myBlogs?.blogs?.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className={myBlogsWrapperClasses}>
              {myBlogs.blogs.map((blog: Blog) => (
                <MyBlogCard
                  blog={blog}
                  handleDeleteBlog={handleDeleteBlog}
                  setModelOpen={setModelOpen}
                  setSelectedBlog={setSelectedBlog}
                />
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

        {selectedBlog && (
          <UpdateBLogDiolog
            isModelOpen={isModelOpen}
            setModelOpen={setModelOpen}
            selectedBlog={selectedBlog}
            setSelectedBlog={setSelectedBlog}
          />
        )}
      </>
    );
  }
);

export default MyBlogsContent;
