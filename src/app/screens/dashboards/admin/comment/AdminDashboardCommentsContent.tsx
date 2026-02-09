import { commentColumns } from "@/app/data/mix";
import AdminDashboardUtilityCard from "../utility/AdminDashboardUtiliyCard";
import AdminDashboardUtilityWrapper from "../utility/AdminDashboardUtiliyWrapper";
import type { AdminGetCommentsType, Comments } from "@/lib/type/comment";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import NoFound from "@/app/components/NoFound";
import type { CommonInput, RowAction, SetStateType } from "@/lib/type/common";
import { CommentStatus } from "@/lib/enums/comment.enum";
import { PaginationCom } from "@/app/components/PaginationCom";

interface AdminDashboardCommentsContentType {
  comments: Comments<AdminGetCommentsType>;
  loading: boolean;
  commentsInput: CommonInput & { status?: CommentStatus; username?: string };
  setCommentsInput: SetStateType<
    CommonInput & { status?: CommentStatus; username?: string }
  >;
  onStatusChange: (id: string, status: CommentStatus) => Promise<void>;
}
export default function AdminDashboardCommentsContent({
  comments,
  commentsInput,
  setCommentsInput,
  loading,
  onStatusChange,
}: AdminDashboardCommentsContentType) {
  const actions: RowAction<AdminGetCommentsType, CommentStatus>[] = [
    {
      label: "Archive",
      onClick: (row: AdminGetCommentsType) => {
        onStatusChange(row.id, CommentStatus.ARCHIVED);
      },
      variant: "secondary",
      btnClasses: "bg-slate-400 hover:bg-slate-600 text-white font-jostFont",
      status: CommentStatus.ARCHIVED,
    },
    {
      label: "Delete",
      onClick: (row: AdminGetCommentsType) =>
        onStatusChange(row.id, CommentStatus.DELETE),
      variant: "destructive",
      btnClasses: "bg-red-400 hover:bg-red-600 text-white font-jostFont",
      status: CommentStatus.DELETE,
    },

    {
      label: "Activate",
      onClick: (row: AdminGetCommentsType) =>
        onStatusChange(row.id, CommentStatus.ACTIVE),
      variant: "outline",
      btnClasses: "bg-green-400 hover:bg-green-600 text-white font-jostFont",
      status: CommentStatus.ACTIVE,
    },
  ];

  return (
    <div className="flex-1  flex flex-col justify-between h-full">
      {loading ? (
        <SpinnerGrids columns="grid-cols-1" count={1} cardHeight="h-96" />
      ) : comments.comments.length ? (
        <AdminDashboardUtilityWrapper>
          <AdminDashboardUtilityCard<CommentStatus, AdminGetCommentsType>
            columns={commentColumns}
            data={comments.comments}
            actions={actions}
          />
        </AdminDashboardUtilityWrapper>
      ) : (
        <NoFound title="No Data found!" />
      )}
      {comments.comments.length && (
        <PaginationCom
          totalPages={Math.ceil(
            (comments.metaCounter[0]?.total ?? 0) / commentsInput.limit,
          )}
          styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
          currentPage={commentsInput.page}
          onPageChange={setCommentsInput}
        />
      )}
      {/* Pagination */}
    </div>
  );
}
