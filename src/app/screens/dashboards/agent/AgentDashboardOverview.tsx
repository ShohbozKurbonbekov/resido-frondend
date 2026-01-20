import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AgentService from "@/app/services/Agent.service";
import AgentDashboardOverviewHeader from "./dashboardOverview/AgentDashboardOverviewHeader";
import AgentDashboardOverviewContent from "./dashboardOverview/AgentDashboardOverviewContent";
import type { AgentDashboardOverviewType } from "@/lib/type/agent";
import { setAgentDashboardOverview } from "./slice";
import { retrieveAgentDashboardOverview } from "./selector";

export const agentDashboardOververWrapper =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-7  mt-5 px-2";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agentDashboardOverviewDispatch = (dispatch: Dispatch) => ({
  setAgentDashboardOverview: (data: AgentDashboardOverviewType) =>
    dispatch(setAgentDashboardOverview(data)),
});

const agentDashboardOverviewRetriever = createSelector(
  retrieveAgentDashboardOverview,
  (agentDashboardOverview) => ({ agentDashboardOverview }),
);

// --------------------------------------- COMPONENT --------------------
export default function AgentDashboardOverview() {
  const { setAgentDashboardOverview } =
    agentDashboardOverviewDispatch(useDispatch());
  const { agentDashboardOverview } = useSelector(
    agentDashboardOverviewRetriever,
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAgentDashboardOverview = async () => {
      const agent = new AgentService();

      try {
        const result = await agent.agentDashboardOverview();
        setAgentDashboardOverview(result);
      } catch (error) {
        console.log("Error in fetching fetchAgentDashboardOverview: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };
    fetchAgentDashboardOverview();
  }, []);
  // --------------------------------------- RENDER --------------------
  return (
    <>
      {loading ? (
        <SpinnerGrids columns={agentDashboardOververWrapper} count={3} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <AgentDashboardOverviewHeader />
          <AgentDashboardOverviewContent
            agentDashboardOverview={agentDashboardOverview}
          />
        </div>
      )}
    </>
  );
}
