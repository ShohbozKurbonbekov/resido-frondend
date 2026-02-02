import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setAgencyMyAgents } from "../slice";
import type {
  CommonAgentResults,
  MyAgentsDashboardType,
} from "@/lib/type/agent";
import { retrieveAgencyMyAgents } from "../selector";
import { useCallback, useEffect, useState } from "react";
import type { CommonInput } from "@/lib/type/common";
import { AgentStatus } from "@/lib/enums/agent.enum";
import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate, useNavigate } from "react-router-dom";
import AgencyMyAgentsHeader from "./AgencyMyAgentsHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import AgencyMyAgentsContent from "./AgencyMyAgentsContent";
import AgencyService from "@/app/services/Agency.service";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";

export const myAgentsCardWrapper = "flex flex-col gap-y-2";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencyMyAgentsDispatch = (dispatch: Dispatch) => ({
  setAgencyMyAgents: (data: CommonAgentResults<MyAgentsDashboardType>) =>
    dispatch(setAgencyMyAgents(data)),
});
const agencyMyAgentsRetriever = createSelector(
  retrieveAgencyMyAgents,
  (myAllAgents) => ({ myAllAgents }),
);

// -------------------------------------- COMPONENT --------------------------
export default function AgencyDashboardMyAgents() {
  const { setAgencyMyAgents } = agencyMyAgentsDispatch(useDispatch());
  const { myAllAgents } = useSelector(agencyMyAgentsRetriever);
  const { authmember } = useGlobals();
  const navigation = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [myAgentsInput, setMyAgentsInput] = useState<
    CommonInput & { status?: AgentStatus }
  >({
    page: 1,
    limit: 5,
    status: AgentStatus.AVAILABLE,
  });

  // Fetch agency my agents
  useEffect(() => {
    if (!myAgentsInput.status) return;
    setLoading(true);
    (async () => {
      try {
        const agency = new AgencyService();
        const result = await agency.agencyMyAgents(myAgentsInput);
        setAgencyMyAgents(result);
      } catch (error) {
        console.log("Error in AgencyDashboardMyAgents: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [myAgentsInput]);

  // -------------------------------------- HANDLERS --------------------------

  const onStatusChange = useCallback((status: AgentStatus) => {
    setMyAgentsInput((prev) => ({ ...prev, status }));
  }, []);

  const onChangeAgentStatus = useCallback(
    async (id: string, status: AgentStatus) => {
      const prevAgents = myAllAgents;
      const updatedAgents = prevAgents.agents.filter(
        (agent) => agent._id !== id,
      );
      setAgencyMyAgents({
        agents: updatedAgents,
        totalNumbers: [
          { total: Math.max(0, (prevAgents.totalNumbers[0]?.total || 1) - 1) },
        ],
      });

      try {
        const agency = new AgencyService();
        await agency.changeAgentStatus(id, status);
        await sweetTopSmallSuccessAlert("Agent Status changed!");
      } catch (error) {
        setAgencyMyAgents(prevAgents);
        console.log(
          "Error in onChangeAgentStatus of AgencyDashboardMyAgents: ",
          error,
        );
        await sweetErrorHandling(error!);
      }
    },
    [myAllAgents, setAgencyMyAgents],
  );

  const onViewProperties = useCallback(
    (id: string) => {
      navigation(`/agents/${id}/properties`);
    },
    [navigation],
  );
  // -------------------------------------- RENDER --------------------------
  if (!authmember) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex flex-col gap-5 h-full">
      <AgencyMyAgentsHeader />

      {loading ? (
        <SpinnerGrids columns={myAgentsCardWrapper} count={3} />
      ) : (
        <AgencyMyAgentsContent
          onChangeAgentStatus={onChangeAgentStatus}
          onViewProperties={onViewProperties}
          onStatusChange={onStatusChange}
          myAgentsInput={myAgentsInput}
          myAllAgents={myAllAgents}
          setMyAgentsInput={setMyAgentsInput}
        />
      )}
    </div>
  );
}
