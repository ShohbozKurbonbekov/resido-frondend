import type { ChosenAgentPageType } from "@/lib/type/agent";
import { type Dispatch } from "@reduxjs/toolkit";
import { setChosenAgentComments, setChosenAgentPage } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenAgentPage } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AgentService from "@/app/services/AgentService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import SectionTopShortInfo from "@/app/components/SectionTopShortInfo";
import AgentDetailMainContent from "./AgentDetailMainContent";
import type { ChosenItemCommentsInput, Comments } from "@/lib/type/comment";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import CommentService from "@/app/services/CommentService";

// ----------------------------------------- REDUX INTEGRATION ------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenAgentPage: (data: ChosenAgentPageType) =>
    dispatch(setChosenAgentPage(data)),
  setChosenAgentComments: (data: Comments) =>
    dispatch(setChosenAgentComments(data)),
});

const chosenAgentPageRetriever = createSelector(
  retrieveChosenAgentPage,
  (chosenAgentPage) => ({ chosenAgentPage })
);

// --------------------------------------- COMPONENT --------------------------------------
const ChooseAgent: React.FC = () => {
  const { setChosenAgentPage, setChosenAgentComments } = actionDispatch(
    useDispatch()
  );
  const { chosenAgentPage } = useSelector(chosenAgentPageRetriever);

  const [agentCommentsInput, setAgentCommentsInput] =
    useState<ChosenItemCommentsInput>({
      page: 1,
      limit: 10,
      commentTarget: CommentTargetType.AGENT,
    });
  const [reloadMainPage, setReloadMainPage] = useState<boolean>(false);
  const { agentId } = useParams();
  const chosenAgent = chosenAgentPage?.agent?.[0];
  // -------------------------------------- FETCHING DATA FROM DB ------------------------------------------
  useEffect(() => {
    if (!agentId) return;
    const fetchingData = async () => {
      const agent = new AgentService();

      try {
        const agentData = await agent.getAgentDetail(agentId!);
        setChosenAgentPage(agentData);

        // AGENT COMMENTS DATA
        const comment = new CommentService();
        const result = await comment.getItemComments(
          agentId!,
          agentCommentsInput
        );
        setChosenAgentComments(result);
      } catch (error) {
        console.log("Error in fetching chosenAgentPage: ", error);
        await sweetErrorHandling(error!);
      }
    };
    fetchingData();
  }, [agentId, agentCommentsInput, reloadMainPage]);

  // ---------------------------------- RENDER ----------------------------------------------
  return (
    <>
      <SectionIntroNoBackground
        title="Agent Detail"
        subtitle={chosenAgent?.fullName ?? "N/A"}
      />
      {chosenAgent && <SectionTopShortInfo agent={chosenAgent} />}
      {chosenAgent && (
        <AgentDetailMainContent
          agent={chosenAgent}
          setAgentCommentsInput={setAgentCommentsInput}
          setReloadMainPage={setReloadMainPage}
        />
      )}
    </>
  );
};

export default ChooseAgent;
