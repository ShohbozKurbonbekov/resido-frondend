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
import AgencyService from "@/app/services/Agency.service";
import { setAgencyMyBlogs } from "../slice";
import { retrieveAgencyMyBlogs } from "../selector";

export const myBlogsWrapperClasses =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencyMyBlogsDispatch = (dispatch: Dispatch) => ({
  setAgencyMyBlogs: (data: BlogsListPage) => dispatch(setAgencyMyBlogs(data)),
});

const agencyMyBlogsRetriever = createSelector(
  retrieveAgencyMyBlogs,
  (agencyMyBlogs) => ({ agencyMyBlogs }),
);

// ---------------------------------------- COMPONET -----------------------
export default function AgencyDashboardMyBlogs() {
  const { setAgencyMyBlogs } = agencyMyBlogsDispatch(useDispatch());
  const { agencyMyBlogs } = useSelector(agencyMyBlogsRetriever);
  const [loading, setLoading] = useState<boolean>(false);
  const [MyBlogsInput, setMyBlogsInput] = useState<CommonInput>({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    const agency = new AgencyService();
    (async () => {
      try {
        const result = await agency.myBlogs(MyBlogsInput);
        setAgencyMyBlogs(result);
      } catch (error) {
        console.log("Error in AgencyDashboardMyBlogs: ", error);
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
        blogs: [...agencyMyBlogs.blogs],
        totalBlogsNumber: agencyMyBlogs.totalBlogsNumber,
      };
      const updatedBlogs = oldBlogs.blogs.filter((blog) => blog._id !== id);

      setAgencyMyBlogs({
        blogs: updatedBlogs,
        totalBlogsNumber: [
          {
            total: Math.max(0, (oldBlogs.totalBlogsNumber[0]?.total || 1) - 1),
          },
        ],
      });

      const agency = new AgencyService();
      try {
        await agency.deleteMyBlog(id);
      } catch (error) {
        console.log("Error in deleteMyBlog of AgencyDashboardMyBlogs: ", error);
        await sweetErrorHandling(error!);
        setAgencyMyBlogs(oldBlogs);
      }
    },
    [agencyMyBlogs, setAgencyMyBlogs],
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
          myBlogs={agencyMyBlogs}
          myBlogsInput={MyBlogsInput}
          setMyBlogsInput={setMyBlogsInput}
        />
      )}
    </div>
  );
}
