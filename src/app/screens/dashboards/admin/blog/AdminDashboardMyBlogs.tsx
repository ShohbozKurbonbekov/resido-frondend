import MyBlogsContent from "@/app/components/blog/MyBlogsContent";
import MyBlogsHeader from "@/app/components/blog/MyBlogsHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import type { CommonInput } from "@/lib/type/common";
import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import type { Blog, BlogInput, BlogsListPage } from "@/lib/type/blogs";
import { setAdminMyBlogs } from "../slice";
import { retrieveAdminMyBlogs } from "../selector";
import AdminService from "@/app/services/Admin.service";
import type { BlogSchemaInputsSubmit } from "@/app/data/blog";
import BlogService from "@/app/services/Blog.service";

export const myBlogsWrapperClasses =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const adminMyBlogsDispatch = (dispatch: Dispatch) => ({
  setAdminMyBlogs: (data: BlogsListPage) => dispatch(setAdminMyBlogs(data)),
});

const adminMyBlogsRetriever = createSelector(
  retrieveAdminMyBlogs,
  (adminMyBlogs) => ({ adminMyBlogs }),
);

// ---------------------------------------- COMPONET -----------------------
export default function AdminDashboardMyBlogs() {
  const { setAdminMyBlogs } = adminMyBlogsDispatch(useDispatch());
  const { adminMyBlogs } = useSelector(adminMyBlogsRetriever);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<null | Blog>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [MyBlogsInput, setMyBlogsInput] = useState<CommonInput>({
    limit: 6,
    page: 1,
  });

  // Fetch admin Blogs
  useEffect(() => {
    const admin = new AdminService();
    (async () => {
      try {
        const result = await admin.myBlogs(MyBlogsInput);
        setAdminMyBlogs(result);
      } catch (error) {
        console.log(
          "Error in fetching myBlogs of AdminDashboardMyBlogs: ",
          error,
        );
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [MyBlogsInput]);
  // ---------------------------------------------- HANDLERS --------------------------------------------
  const handleDeleteBlog = useCallback(
    async (id: string) => {
      const oldBlogs = adminMyBlogs;
      const updatedBlogs = oldBlogs.blogs.filter((blog) => blog._id !== id);

      setAdminMyBlogs({
        blogs: updatedBlogs,
        totalBlogsNumber: [
          {
            total: Math.max(0, (oldBlogs.totalBlogsNumber[0]?.total || 1) - 1),
          },
        ],
      });

      const admin = new AdminService();
      try {
        await admin.deleteMyBlog(id);
      } catch (error) {
        console.log("Error in deleteMyBlog of AdminDashboardMyBlogs: ", error);
        await sweetErrorHandling(error!);
        setAdminMyBlogs(oldBlogs);
      }
    },
    [adminMyBlogs, setAdminMyBlogs],
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

      const snapshot = adminMyBlogs;

      const updatedBlogs = snapshot.blogs.map((b) =>
        b._id === selectedBlog._id ? { ...selectedBlog, ...blogInput } : b,
      );
      setAdminMyBlogs({
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
        setAdminMyBlogs(snapshot);
        console.log("Error in handleSaveBtn: ", error);
        throw error;
      }
    },
    [adminMyBlogs, setAdminMyBlogs, selectedBlog],
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
          myBlogs={adminMyBlogs}
          myBlogsInput={MyBlogsInput}
          setMyBlogsInput={setMyBlogsInput}
        />
      )}
    </div>
  );
}
