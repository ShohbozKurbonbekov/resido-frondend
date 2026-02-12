import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import NoFound from "@/app/components/NoFound";
import type { RowAction, SetStateType } from "@/lib/type/common";
import { PaginationCom } from "@/app/components/PaginationCom";
import { useMemo } from "react";
import type {
  AdminDashboardCommonMember,
  AdminGetAgencyType,
  AdminGetAgentType,
  AdminGetAllMembersType,
  AdminGetUserType,
  AdminMembers,
} from "@/lib/type/member";
import { MemberStatus, MemberType } from "@/lib/enums/agent.enum";
import AdminDashboardUtilityWrapper from "./utility/AdminDashboardUtiliyWrapper";
import AdminDashboardUtilityCard from "./utility/AdminDashboardUtiliyCard";
import { userColumns } from "@/app/data/dashboard/user";
import { agentColumns } from "@/app/data/agent";
import { agencyColumns } from "@/app/data/agency";

interface AdminDashboardMembersContentType {
  members: AdminMembers;
  loading: boolean;
  memberCategory: AdminGetAllMembersType;
  setMemberCategory: SetStateType<AdminGetAllMembersType>;
  onChangeMemberStatus: (
    id: string,
    type: MemberType,
    status: MemberStatus,
  ) => Promise<void>;
}
export default function AdminDashboardMembersContent({
  loading,
  memberCategory,
  members,
  onChangeMemberStatus,
  setMemberCategory,
}: AdminDashboardMembersContentType) {
  const memberType = memberCategory.memberCategory?.memberType;
  const actions: RowAction<AdminDashboardCommonMember, MemberStatus>[] =
    useMemo(() => {
      return [
        {
          label: "Blocked",
          onClick: (row: AdminDashboardCommonMember) => {
            onChangeMemberStatus(row.id, row.type, MemberStatus.BLOCKED);
          },
          variant: "secondary",
          btnClasses:
            "bg-slate-400 hover:bg-slate-600 text-white font-jostFont",
          status: MemberStatus.BLOCKED,
        },
        {
          label: "Deleted",
          onClick: (row: AdminDashboardCommonMember) =>
            onChangeMemberStatus(row.id, row.type, MemberStatus.DELETED),
          variant: "destructive",
          btnClasses: "bg-red-400 hover:bg-red-600 text-white font-jostFont",
          status: MemberStatus.DELETED,
        },

        {
          label: "Activate",
          onClick: (row: AdminDashboardCommonMember) =>
            onChangeMemberStatus(row.id, row.type, MemberStatus.ACTIVE),
          variant: "outline",
          btnClasses:
            "bg-green-400 hover:bg-green-600 text-white font-jostFont",
          status: MemberStatus.ACTIVE,
        },
      ];
    }, [onChangeMemberStatus]);

  return (
    <div className="flex-1  flex flex-col justify-between h-full">
      {loading ? (
        <SpinnerGrids columns="grid-cols-1" count={1} cardHeight="h-96" />
      ) : members.members.length ? (
        <AdminDashboardUtilityWrapper>
          {memberType === MemberType.USER && (
            <AdminDashboardUtilityCard<MemberStatus, AdminGetUserType>
              columns={userColumns}
              data={members.members}
              actions={actions}
            />
          )}
          {memberType === MemberType.AGENT && (
            <AdminDashboardUtilityCard<MemberStatus, AdminGetAgentType>
              columns={agentColumns}
              data={members.members as AdminGetAgentType[]}
              actions={actions}
            />
          )}
          {memberType === MemberType.AGENCY && (
            <AdminDashboardUtilityCard<MemberStatus, AdminGetAgencyType>
              columns={agencyColumns}
              data={members.members as AdminGetAgencyType[]}
              actions={actions}
            />
          )}
        </AdminDashboardUtilityWrapper>
      ) : (
        <NoFound title="No Data found!" />
      )}

      {/* Pagination */}
      {!!members.members.length && (
        <PaginationCom
          totalPages={Math.ceil(
            (members.metaCounter[0]?.total ?? 0) / memberCategory.limit,
          )}
          styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
          currentPage={memberCategory.page}
          onPageChange={setMemberCategory}
        />
      )}
    </div>
  );
}
