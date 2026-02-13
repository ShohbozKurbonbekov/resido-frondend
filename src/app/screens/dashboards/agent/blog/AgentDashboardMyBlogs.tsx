import MyBlogsContent from "@/app/components/blog/MyBlogsContent";
import MyBlogsHeader from "@/app/components/blog/MyBlogsHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import AgentService from "@/app/services/Agent.service";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import type { CommonInput } from "@/lib/type/common";
import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { setAgentMyBlogs } from "../slice";
import { createSelector } from "reselect";
import { retrieveAgentMyBlogs } from "../selector";
import { useDispatch, useSelector } from "react-redux";
import type { Blog, BlogInput, BlogsListPage } from "@/lib/type/blogs";
import type { BlogSchemaInputsSubmit } from "@/app/data/blog";
import BlogService from "@/app/services/Blog.service";

export const myBlogsWrapperClasses =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agentMyBlogsDispatch = (dispatch: Dispatch) => ({
  setAgentMyBlogs: (data: BlogsListPage) => dispatch(setAgentMyBlogs(data)),
});

const agentMyBlogsRetriever = createSelector(
  retrieveAgentMyBlogs,
  (agentMyBlogs) => ({ agentMyBlogs }),
);

// ---------------------------------------- COMPONET -----------------------
export default function AgentDashboardMyBlogs() {
  const [selectedBlog, setSelectedBlog] = useState<null | Blog>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { setAgentMyBlogs } = agentMyBlogsDispatch(useDispatch());
  const { agentMyBlogs } = useSelector(agentMyBlogsRetriever);
  const [loading, setLoading] = useState<boolean>(false);
  const [MyBlogsInput, setMyBlogsInput] = useState<CommonInput>({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    const agent = new AgentService();
    (async () => {
      try {
        const result = await agent.myBlogs(MyBlogsInput);
        setAgentMyBlogs(result);
      } catch (error) {
        console.log("Error in fetching myBlogs: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [MyBlogsInput]);

  // ---------------------------------------------- HANDLERS --------------------------------------------
  const handleDeleteBlog = useCallback(
    async (id: string) => {
      const oldBlogs = {
        blogs: [...agentMyBlogs.blogs],
        totalBlogsNumber: agentMyBlogs.totalBlogsNumber,
      };
      const updatedBlogs = oldBlogs.blogs.filter((blog) => blog._id !== id);

      setAgentMyBlogs({
        blogs: updatedBlogs,
        totalBlogsNumber: [
          {
            total: Math.max(0, (oldBlogs.totalBlogsNumber[0]?.total || 1) - 1),
          },
        ],
      });

      const agent = new AgentService();
      try {
        await agent.deleteMyBlog(id);
      } catch (error) {
        console.log("Error in deleteMyBlog: ", error);
        await sweetErrorHandling(error!);
        setAgentMyBlogs(oldBlogs);
      }
    },
    [agentMyBlogs, setAgentMyBlogs],
  );

  const handleSavebtn = useCallback(
    async (values: BlogSchemaInputsSubmit, tags: string[]) => {
      if (!selectedBlog) return;
      const blogInput: BlogInput = {
        blogCategory: values.blogCategory,
        blogContent: values.blogContent.trim(),
        blogImage:
          values.blogImage instanceof File
            ? URL.createObjectURL(values.blogImage)
            : values.blogImage,
        blogQuote: values.blogQuote?.trim(),
        blogShortInfo: values.blogShortInfo.trim(),
        blogTitle: values.blogTitle.trim(),
        blogTags: tags,
      };

      const snapshot = agentMyBlogs;

      const updatedBlogs = snapshot.blogs.map((b) =>
        b._id === selectedBlog._id ? { ...selectedBlog, ...blogInput } : b,
      );
      setAgentMyBlogs({
        blogs: updatedBlogs,
        totalBlogsNumber: snapshot.totalBlogsNumber,
      });

      try {
        const blog = new BlogService();
        await blog.updateMyBlog(
          { ...blogInput, blogImage: values.blogImage },
          selectedBlog._id,
        );

        setModalOpen(false);
        setSelectedBlog(null);
        await sweetTopSmallSuccessAlert("Successfully updated!");
      } catch (error) {
        setAgentMyBlogs(snapshot);
        console.log("Error in handleSaveBtn: ", error);
        throw error;
      }
    },
    [agentMyBlogs, setAgentMyBlogs, selectedBlog],
  );

  // ---------------------------------------------- RENDER --------------------------------------------
  return (
    <div className="flex flex-col gap-y-5 h-full">
      <MyBlogsHeader />

      {loading ? (
        <SpinnerGrids columns={myBlogsWrapperClasses} count={3} />
      ) : (
        <MyBlogsContent
          handleOnSave={handleSavebtn}
          modalOpen={modalOpen}
          selectedBlog={selectedBlog}
          setModalOpen={setModalOpen}
          setSelectedBlog={setSelectedBlog}
          handleDeleteBlog={handleDeleteBlog}
          myBlogs={agentMyBlogs}
          myBlogsInput={MyBlogsInput}
          setMyBlogsInput={setMyBlogsInput}
        />
      )}
    </div>
  );
}
