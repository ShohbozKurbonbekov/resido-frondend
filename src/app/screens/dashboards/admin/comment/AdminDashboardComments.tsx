import AdminDashboardUtilityHeader from "@/app/screens/dashboards/admin/utility/AdminDashboardUtilityHeader";
import AdminDashboardCommentsContent from "./AdminDashboardCommentsContent";
import { MessageSquare } from "lucide-react";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import type { AdminGetCommentsType, Comments } from "@/lib/type/comment";
import { setAdminGetComments } from "../slice";
import { retrieveAdminGetComments } from "../selector";
import { useCallback, useEffect, useState } from "react";
import AdminDashboardCommentsHeaderContent from "./AdminDashboardCommentsHeaderContent";
import { CommentStatus } from "@/lib/enums/comment.enum";
import AdminDashboardFilter from "./AdminCommentsFilter";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AdminService from "@/app/services/Admin.service";
import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate } from "react-router-dom";

// -------------------------- Redux integration --------------------

const adminGetCommentsDispatch = (dispatch: Dispatch) => ({
  setAdminGetComments: (data: Comments<AdminGetCommentsType>) =>
    dispatch(setAdminGetComments(data)),
});

const adminGetCommentsRetriever = createSelector(
  retrieveAdminGetComments,
  (adminGetComments) => ({ adminGetComments }),
);

// -------------------------- Component --------------------

export default function AdminDashboardComments() {
  const { authmember } = useGlobals();
  const { setAdminGetComments } = adminGetCommentsDispatch(useDispatch());
  const { adminGetComments } = useSelector(adminGetCommentsRetriever);

  const [loading, setLoading] = useState<boolean>(true);
  const [commentsInput, setCommentsInput] = useState<
    CommonInput & {
      status?: CommentStatus;
      username?: string;
    }
  >({
    limit: 8,
    page: 1,
    status: CommentStatus.ACTIVE,
    username: "",
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const admin = new AdminService();
        const result = await admin.adminGetComments(commentsInput);
        setAdminGetComments(result);
      } catch (error) {
        console.log(
          "Error in fetching admin comments in for AdminDashboardComments: ",
          error,
        );
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [commentsInput]);
  // -------------------------- Handlers --------------------
  const onStatusChange = useCallback(
    async (id: string, status: CommentStatus) => {
      const prevComments = adminGetComments;
      const updatedComments = adminGetComments.comments.filter(
        (c) => c.id !== id,
      );

      setAdminGetComments({
        comments: updatedComments,
        metaCounter: prevComments.metaCounter,
      });

      try {
        const admin = new AdminService();
        await admin.adminCommentStatusChange(id, status);
      } catch (error) {
        setAdminGetComments(prevComments);
        console.log(
          "Error in onStatusChange of AdminDashboardComments: ",
          error,
        );
        await sweetErrorHandling(error!);
      }
    },
    [adminGetComments, setAdminGetComments],
  );
  // -------------------------- Render --------------------
  if (!authmember) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex flex-col gap-7 h-full">
      <AdminDashboardUtilityHeader
        title="Comments Management"
        subtitle="View and Control over platform comments "
        Icon1={<MessageSquare className="h-6 w-6 text-blue-600" />}
        headerContent={<AdminDashboardCommentsHeaderContent />}
      />

      <AdminDashboardFilter<CommentStatus>
        filterInput={commentsInput}
        setLoading={setLoading}
        setFilterInput={setCommentsInput}
        statusOptions={[
          { value: CommentStatus.ACTIVE, label: "Active" },
          { value: CommentStatus.ARCHIVED, label: "Archived" },
          { value: CommentStatus.DELETE, label: "Deleted" },
        ]}
        searchPlaceholder="Search a commenter"
      />
      <AdminDashboardCommentsContent
        onStatusChange={onStatusChange}
        comments={adminGetComments}
        loading={loading}
        commentsInput={commentsInput}
        setCommentsInput={setCommentsInput}
      />
    </div>
  );
}
