import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { AgencyDashboardOverviewType } from "@/lib/type/agency";
import { setAgencyDashboardOverview } from "../slice";
import { retrieveAgencyDashboardOverview } from "../selector";
import AgencyService from "@/app/services/Agency.service";
import AgencyDashboardOverviewHeader from "./AgencyDashboardOverviewHeader";
import AgencyDashboardOverviewContent from "./AgencyDashboardOverviewContent";

export const agencyDashboardOverviewWrapper =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-7  mt-5 px-2";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencyDashboardOverviewDispatch = (dispatch: Dispatch) => ({
  setAgencyDashboardOverview: (data: AgencyDashboardOverviewType) =>
    dispatch(setAgencyDashboardOverview(data)),
});

const agencyDashboardOverviewRetriever = createSelector(
  retrieveAgencyDashboardOverview,
  (agencyDashboardOverview) => ({ agencyDashboardOverview }),
);

// --------------------------------------- COMPONENT --------------------
export default function AgencyDashboardOverview() {
  const { setAgencyDashboardOverview } =
    agencyDashboardOverviewDispatch(useDispatch());
  const { agencyDashboardOverview } = useSelector(
    agencyDashboardOverviewRetriever,
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const agency = new AgencyService();

      try {
        const result = await agency.agencyDashboardOverview();
        setAgencyDashboardOverview(result);
      } catch (error) {
        console.log("Error in fetching fetchAgencyDashboardOverview: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  // --------------------------------------- RENDER --------------------
  return (
    <>
      {loading ? (
        <SpinnerGrids columns={agencyDashboardOverviewWrapper} count={3} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <AgencyDashboardOverviewHeader />
          <AgencyDashboardOverviewContent
            agencyDashboardOverview={agencyDashboardOverview}
          />
        </div>
      )}
    </>
  );
}
