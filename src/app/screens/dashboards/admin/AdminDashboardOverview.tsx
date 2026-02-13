import { useGlobals } from "@/app/hooks/useGlobals";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { User } from "@/lib/type/dashboard/user";
import { setAdminOverview } from "./slice";
import { retrieveAdminOverview } from "./selector";
import MemberService from "@/app/services/Member.service";
import AdminOverviewHeader from "./overview/AdminOverviewHeader";
import AdminOverviewContent from "./overview/AdminOverviewContent";
import { Navigate } from "react-router-dom";
import NoFound from "@/app/components/NoFound";

export const agencyDashboardOverviewWrapper =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-7  mt-5 px-2";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const adminOverviewDispatch = (dispatch: Dispatch) => ({
  setAdminOverview: (data: User | null) => dispatch(setAdminOverview(data)),
});

const adminOverviewRetriever = createSelector(
  retrieveAdminOverview,
  (adminOverview) => ({ adminOverview }),
);

// --------------------------------------- COMPONENT --------------------
export default function AdminOverview() {
  const { authmember } = useGlobals();
  const { setAdminOverview } = adminOverviewDispatch(useDispatch());
  const { adminOverview } = useSelector(adminOverviewRetriever);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const member = new MemberService();

      try {
        const result = await member.getAdmin();
        setAdminOverview(result);
      } catch (error) {
        console.log("Error in fetching fetchAdminOverview: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!authmember) {
    return <Navigate to="/" />;
  }
  // --------------------------------------- RENDER --------------------
  return (
    <>
      {loading ? (
        <SpinnerGrids columns={agencyDashboardOverviewWrapper} count={3} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <AdminOverviewHeader />
          {adminOverview?.adminOverviewStats ? (
            <AdminOverviewContent admin={adminOverview} />
          ) : (
            <NoFound title="No Statics Found" />
          )}
        </div>
      )}
    </>
  );
}
