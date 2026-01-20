import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setUserdashboardOverview } from "./slice";
import { retrieveUserdashboardOverview } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { UserDashboardOverviewType } from "@/lib/type/dashboard/user";
import MemberService from "@/app/services/Member.service";
import UserDashboardOverviewContent from "./UserDashboardOverviewContent";
import UserDashboardOverviewHeader from "./UserDashboardOverviewHeader";

export const UserDashboardOververWrapper =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-7  mt-5 px-2";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const userDashboardOverviewDispatch = (dispatch: Dispatch) => ({
  setUserdashboardOverview: (data: UserDashboardOverviewType) =>
    dispatch(setUserdashboardOverview(data)),
});

const userDashboardOverviewRetriever = createSelector(
  retrieveUserdashboardOverview,
  (userDashboardOverview) => ({ userDashboardOverview }),
);

// --------------------------------------- COMPONENT --------------------
export default function UserDashboardOverview() {
  const { setUserdashboardOverview } =
    userDashboardOverviewDispatch(useDispatch());
  const { userDashboardOverview } = useSelector(userDashboardOverviewRetriever);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDashboardOverview = async () => {
      const member = new MemberService();

      try {
        const result = await member.userDashboardOverview();
        setUserdashboardOverview(result);
      } catch (error) {
        console.log("Error in fetching userDashboardOverview: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDashboardOverview();
  }, []);
  // --------------------------------------- RENDER --------------------
  return (
    <div className="lg:col-span-9">
      {loading ? (
        <SpinnerGrids columns={UserDashboardOververWrapper} count={5} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <UserDashboardOverviewHeader />
          <UserDashboardOverviewContent
            userDashboardOverview={userDashboardOverview}
          />
        </div>
      )}
    </div>
  );
}
