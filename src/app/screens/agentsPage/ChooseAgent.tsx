import type { ChosenAgentPageType } from "@/lib/type/agent";
import { type Dispatch } from "@reduxjs/toolkit";
import { setChosenAgentPage } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenAgentPage } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import AgentService from "@/app/services/AgentService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import SectionTopShortInfo from "@/app/components/SectionTopShortInfo";
import AgentDetailMainContent from "./AgentDetailMainContentProp";

// ----------------------------------------- REDUX INTEGRATION ------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenAgentPage: (data: ChosenAgentPageType) =>
    dispatch(setChosenAgentPage(data)),
});

const chosenAgentPageRetriever = createSelector(
  retrieveChosenAgentPage,
  (chosenAgentPage) => ({ chosenAgentPage })
);

// --------------------------------------- COMPONENT --------------------------------------
const ChooseAgent: React.FC = () => {
  const { setChosenAgentPage } = actionDispatch(useDispatch());
  const { chosenAgentPage } = useSelector(chosenAgentPageRetriever);
  const { agentId } = useParams();
  const chosenAgent = chosenAgentPage?.agent?.[0];
  // -------------------------------------- FETCHING DATA FROM DB ------------------------------------------
  useEffect(() => {
    if (!agentId) return;
    const fetchingData = async () => {
      const agent = new AgentService();

      try {
        const agentData = await agent.getAgentDetail(agentId!);
        console.log(agentData);
        setChosenAgentPage(agentData);
      } catch (error) {
        console.log("Error in fetching chosenAgentPage: ", error);
        await sweetErrorHandling(error!);
      }
    };
    fetchingData();
  }, [agentId]);

  // ---------------------------------- RENDER ----------------------------------------------
  return (
    <>
      <SectionIntroNoBackground
        title="Agent Detail"
        subtitle={chosenAgent?.fullName ?? "N/A"}
      />
      {chosenAgent && <SectionTopShortInfo agent={chosenAgent} />}
      {chosenAgent && <AgentDetailMainContent agent={chosenAgent} />}
    </>
  );
};

export default ChooseAgent;
