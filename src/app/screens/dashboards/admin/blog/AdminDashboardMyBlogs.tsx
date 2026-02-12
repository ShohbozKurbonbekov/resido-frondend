import MyBlogsContent from "@/app/components/blog/MyBlogsContent";
import MyBlogsHeader from "@/app/components/blog/MyBlogsHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { CommonInput } from "@/lib/type/common";
import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import type { BlogsListPage } from "@/lib/type/blogs";
import { setAdminMyBlogs } from "../slice";
import { retrieveAdminMyBlogs } from "../selector";
import AdminService from "@/app/services/Admin.service";

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

  // ---------------------------------------------- RENDER --------------------------------------------
  return (
    <div className="flex flex-col gap-y-5 h-full">
      <MyBlogsHeader />

      {loading ? (
        <SpinnerGrids columns={myBlogsWrapperClasses} count={3} />
      ) : (
        <MyBlogsContent
          handleDeleteBlog={handleDeleteBlog}
          myBlogs={adminMyBlogs}
          myBlogsInput={MyBlogsInput}
          setMyBlogsInput={setMyBlogsInput}
        />
      )}
    </div>
  );
}
