import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setAdminAllBlogs } from "./slice";
import type {
  AdminAllBlogsType,
  BlogSearchInput,
  BlogsListPage,
} from "@/lib/type/blogs";
import { retrieveAdminAllBlogs } from "./selector";
import { useCallback, useEffect, useState } from "react";
import AdminService from "@/app/services/Admin.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AdminDashboardUtilityHeader from "./utility/AdminDashboardUtilityHeader";
import { SquarePen } from "lucide-react";
import { BlogCategory, BlogStatus, SortOrder } from "@/lib/enums/blog.enum";
import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate } from "react-router-dom";
import AdminDashboardBlogsContent from "./blog/AdminDashboardBlogsContent";
import AdminDashboardListFilter from "./utility/AdminDashboardListFilter";

// ---------------------------- Redux Integration --------------------
const adminAllBlogsDispatch = (dispatch: Dispatch) => ({
  setAdminAllBlogs: (data: BlogsListPage<AdminAllBlogsType>) =>
    dispatch(setAdminAllBlogs(data)),
});

const adminAllBlogsRetriever = createSelector(
  retrieveAdminAllBlogs,
  (adminAllBlogs) => ({ adminAllBlogs }),
);

// ---------------------------- Component --------------------
export default function AdminDashboardBlogs() {
  const { authmember } = useGlobals();
  const { setAdminAllBlogs } = adminAllBlogsDispatch(useDispatch());
  const { adminAllBlogs } = useSelector(adminAllBlogsRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<
    BlogSearchInput & { status?: BlogStatus }
  >({
    limit: 8,
    page: 1,
    search: {
      category: BlogCategory.GENERAL,
      title: "",
    },
    sort: SortOrder.DESC,
    status: BlogStatus.ACTIVE,
  });

  // Fetch blogs
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const admin = new AdminService();
        const result = await admin.adminAllBlogs(searchInput);
        setAdminAllBlogs(result);
      } catch (error) {
        console.log(
          "Error in fetching admin all blogs for AdminDashboardBlogs: ",
          error,
        );
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchInput]);
  // ---------------------------- Handlers --------------------

  const onTextSubmit = useCallback(async (text: string) => {
    setSearchInput((prev) => ({
      ...prev,
      page: 1,
      search: { ...prev.search, title: text.trim() },
    }));
  }, []);

  const onChangeBlogStatus = useCallback(
    async (id: string, status: BlogStatus) => {
      const prevBlogs = adminAllBlogs;
      const updatedBlogs = prevBlogs.blogs.filter((b) => id !== b.id);

      setAdminAllBlogs({
        blogs: updatedBlogs,
        totalBlogsNumber: [
          {
            total: Math.max(0, (prevBlogs.totalBlogsNumber[0]?.total || 1) - 1),
          },
        ],
      });
      try {
        const admin = new AdminService();
        await admin.adminChangeBlogStatus(id, status);
      } catch (error) {
        setAdminAllBlogs(prevBlogs);
        console.log("Error in onStatusChange of AdminDashboardBlogs");
        await sweetErrorHandling(error!);
      }
    },
    [adminAllBlogs, setAdminAllBlogs],
  );

  // Toggle category
  const onCategoryChange = (c: BlogCategory) => {
    setLoading(true);
    setSearchInput((prev) => ({
      ...prev,
      page: 1,
      search: {
        ...prev.search,
        category: c,
      },
    }));
  };

  // Toggle sort
  const onSort = (s: SortOrder) => {
    setLoading(true);
    setSearchInput((prev) => ({
      ...prev,
      sort: s,
    }));
  };

  // Toggle status
  const onStatusChange = (s: BlogStatus) => {
    setLoading(true);
    setSearchInput((prev) => ({
      ...prev,
      page: 1,
      status: s,
    }));
  };
  // ---------------------------- Render --------------------
  if (!authmember) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex flex-col gap-7 h-full">
      <AdminDashboardUtilityHeader
        title="Blogs Management"
        subtitle="Manage, review, and control all blog posts across the platform."
        Icon1={<SquarePen className="h-6 w-6 text-blue-600" />}
      />
      <AdminDashboardListFilter<BlogStatus, BlogCategory>
        onSortChange={onSort}
        onCategoryChange={onCategoryChange}
        onStatusChange={onStatusChange}
        onTextSubmit={onTextSubmit}
        category={searchInput.search?.category}
        categoryData={Object.keys(BlogCategory) as BlogCategory[]}
        sort={searchInput.sort}
        sortData={Object.keys(SortOrder) as SortOrder[]}
        status={searchInput.status}
        statusData={Object.keys(BlogStatus) as BlogStatus[]}
      />

      <AdminDashboardBlogsContent
        blogs={adminAllBlogs}
        loading={loading}
        onStatusChange={onChangeBlogStatus}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}
