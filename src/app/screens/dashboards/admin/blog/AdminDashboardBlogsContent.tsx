import AdminDashboardUtilityCard from "../utility/AdminDashboardUtiliyCard";
import AdminDashboardUtilityWrapper from "../utility/AdminDashboardUtiliyWrapper";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import NoFound from "@/app/components/NoFound";
import type { RowAction, SetStateType } from "@/lib/type/common";
import { PaginationCom } from "@/app/components/PaginationCom";
import type {
  AdminAllBlogsType,
  BlogSearchInput,
  BlogsListPage,
} from "@/lib/type/blogs";
import { BlogStatus } from "@/lib/enums/blog.enum";
import { blogColumns } from "@/app/data/blog";
import { useMemo } from "react";

interface AdminDashboardBlogsContentType {
  blogs: BlogsListPage<AdminAllBlogsType>;
  loading: boolean;
  searchInput: BlogSearchInput;
  setSearchInput: SetStateType<BlogSearchInput>;
  onStatusChange: (id: string, status: BlogStatus) => Promise<void>;
}
export default function AdminDashboardBlogsContent({
  blogs,
  loading,
  onStatusChange,
  searchInput,
  setSearchInput,
}: AdminDashboardBlogsContentType) {
  const actions: RowAction<AdminAllBlogsType, BlogStatus>[] = useMemo(() => {
    return [
      {
        label: "Blocked",
        onClick: (row: AdminAllBlogsType) => {
          onStatusChange(row.id, BlogStatus.BLOCKED);
        },
        variant: "secondary",
        btnClasses: "bg-slate-400 hover:bg-slate-600 text-white font-jostFont",
        status: BlogStatus.BLOCKED,
      },
      {
        label: "Deleted",
        onClick: (row: AdminAllBlogsType) =>
          onStatusChange(row.id, BlogStatus.DELETED),
        variant: "destructive",
        btnClasses: "bg-red-400 hover:bg-red-600 text-white font-jostFont",
        status: BlogStatus.DELETED,
      },

      {
        label: "Activate",
        onClick: (row: AdminAllBlogsType) =>
          onStatusChange(row.id, BlogStatus.ACTIVE),
        variant: "outline",
        btnClasses: "bg-green-400 hover:bg-green-600 text-white font-jostFont",
        status: BlogStatus.ACTIVE,
      },
    ];
  }, [onStatusChange]);

  return (
    <div className="flex-1  flex flex-col justify-between h-full">
      {loading ? (
        <SpinnerGrids columns="grid-cols-1" count={1} cardHeight="h-96" />
      ) : blogs.blogs.length ? (
        <AdminDashboardUtilityWrapper>
          <AdminDashboardUtilityCard<BlogStatus, AdminAllBlogsType>
            columns={blogColumns}
            data={blogs.blogs}
            actions={actions}
          />
        </AdminDashboardUtilityWrapper>
      ) : (
        <NoFound title="No Data found!" />
      )}

      {/* Pagination */}
      {!!blogs.blogs.length && (
        <PaginationCom
          totalPages={Math.ceil(
            (blogs.totalBlogsNumber[0]?.total ?? 0) / searchInput.limit,
          )}
          styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
          currentPage={searchInput.page}
          onPageChange={setSearchInput}
        />
      )}
    </div>
  );
}
