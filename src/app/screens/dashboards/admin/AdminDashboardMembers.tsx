import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setAdminGetAllMembers } from "./slice";
import { retrieveAdminGetAllMembers } from "./selector";
import { useCallback, useEffect, useState } from "react";
import AdminService from "@/app/services/Admin.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AdminDashboardUtilityHeader from "./utility/AdminDashboardUtilityHeader";
import { Users2 } from "lucide-react";
import { SortOrder } from "@/lib/enums/blog.enum";
import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate } from "react-router-dom";
import type { AdminGetAllMembersType, AdminMembers } from "@/lib/type/member";
import { MemberStatus, MemberType } from "@/lib/enums/agent.enum";
import AdminDashboardListFilter from "./utility/AdminDashboardListFilter";
import AdminDashboardMembersContent from "./AdminDashboardMembersContent";

// ---------------------------- Redux Integration --------------------
const adminGetAllMembersDispatch = (dispatch: Dispatch) => ({
  setAdminGetAllMembers: (data: AdminMembers) =>
    dispatch(setAdminGetAllMembers(data)),
});

const adminGetAllMembersRetriever = createSelector(
  retrieveAdminGetAllMembers,
  (adminGetAllMembers) => ({ adminGetAllMembers }),
);

// ---------------------------- Component --------------------
export default function AdminDashboardMembers() {
  const { authmember } = useGlobals();
  const { setAdminGetAllMembers } = adminGetAllMembersDispatch(useDispatch());
  const { adminGetAllMembers } = useSelector(adminGetAllMembersRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [memberCategory, setMemberCategory] = useState<AdminGetAllMembersType>({
    limit: 8,
    page: 1,
    memberCategory: {
      memberType: MemberType.USER,
      username: "",
    },
    sort: SortOrder.DESC,
    status: MemberStatus.ACTIVE,
  });

  // Fetch All Members
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const admin = new AdminService();
        const result = await admin.adminGetAllMembers(memberCategory);
        setAdminGetAllMembers(result);
      } catch (error) {
        console.log(
          "Error in fetching admin all members for AdminDashboardMembers: ",
          error,
        );
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [memberCategory]);
  // ---------------------------- Handlers --------------------

  const onUsernameSubmit = useCallback(async (username: string) => {
    setMemberCategory((prev) => ({
      ...prev,
      page: 1,
      memberCategory: { ...prev.memberCategory, username: username.trim() },
    }));
  }, []);

  const onChangeMemberStatus = useCallback(
    async (id: string, type: MemberType, status: MemberStatus) => {
      const prevMembers = adminGetAllMembers;
      const updatedMembers = adminGetAllMembers.members.filter(
        (m) => id !== m.id,
      );

      setAdminGetAllMembers({
        members: updatedMembers,
        metaCounter: [
          {
            total: Math.max(0, (prevMembers.metaCounter[0]?.total || 1) - 1),
          },
        ],
      });
      try {
        const admin = new AdminService();
        await admin.adminChangeMemberStatus(id, type, status);
      } catch (error) {
        setAdminGetAllMembers(prevMembers);
        console.log("Error in onChangeMemberStatus of AdminDashboardMembers");
        await sweetErrorHandling(error!);
      }
    },
    [adminGetAllMembers, setAdminGetAllMembers],
  );

  // Toggle category
  const onCategoryChange = (c: MemberType) => {
    setLoading(true);
    setMemberCategory((prev) => ({
      ...prev,
      page: 1,
      memberCategory: {
        ...prev.memberCategory,
        memberType: c,
      },
    }));
  };

  // Toggle sort
  const onSort = (s: SortOrder) => {
    setLoading(true);
    setMemberCategory((prev) => ({
      ...prev,
      sort: s,
    }));
  };

  // Toggle status
  const onStatusChange = (s: MemberStatus) => {
    console.group(s);
    setLoading(true);
    setMemberCategory((prev) => ({
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
        title="Members Management"
        subtitle="Review, activate, block, or remove members to maintain platform integrity"
        Icon1={<Users2 className="h-6 w-6 text-blue-600" />}
      />
      <AdminDashboardListFilter<MemberStatus, MemberType>
        category={memberCategory?.memberCategory?.memberType}
        categoryData={
          Object.keys(MemberType).filter(
            (c) => c !== "REAL_ESTATE_ADMIN",
          ) as MemberType[]
        }
        filterHeader={
          <span className="text-2xl  font-semibold tracking-wide text-slate-700 text-center font-loraFont">
            Member Lookup
          </span>
        }
        onCategoryChange={onCategoryChange}
        onSortChange={onSort}
        onStatusChange={onStatusChange}
        onTextSubmit={onUsernameSubmit}
        sort={memberCategory.sort}
        sortData={Object.keys(SortOrder) as SortOrder[]}
        status={memberCategory.status}
        statusData={Object.values(MemberStatus) as MemberStatus[]}
      />

      <AdminDashboardMembersContent
        loading={loading}
        memberCategory={memberCategory}
        members={adminGetAllMembers}
        onChangeMemberStatus={onChangeMemberStatus}
        setMemberCategory={setMemberCategory}
      />
    </div>
  );
}
