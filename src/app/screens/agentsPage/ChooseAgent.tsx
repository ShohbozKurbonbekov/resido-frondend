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
import type { FeaturedPropertyResults } from "@/lib/type/property";
import { setFeaturedProperties } from "../homePage/slice";
import PropertyService from "@/app/services/PropertyService";
import DetailPageLoading from "@/app/components/loading/DetailPageLoading";

// ----------------------------------------- REDUX INTEGRATION ------------------------------
const ChosenAgentPageDispatch = (dispatch: Dispatch) => ({
  setChosenAgentPage: (data: ChosenAgentPageType) =>
    dispatch(setChosenAgentPage(data)),
  setChosenAgentComments: (data: Comments) =>
    dispatch(setChosenAgentComments(data)),
});
const FeaturedPropertiesDispatch = (dispatch: Dispatch) => ({
  setFeaturedProperties: (data: FeaturedPropertyResults) =>
    dispatch(setFeaturedProperties(data)),
});

const chosenAgentPageRetriever = createSelector(
  retrieveChosenAgentPage,
  (chosenAgentPage) => ({ chosenAgentPage })
);

// --------------------------------------- COMPONENT --------------------------------------
const ChooseAgent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { setChosenAgentPage, setChosenAgentComments } =
    ChosenAgentPageDispatch(useDispatch());
  const { setFeaturedProperties } = FeaturedPropertiesDispatch(useDispatch());
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
    setLoading(true);
    const fetchingData = async () => {
      const agent = new AgentService();
      const property = new PropertyService();
      const comment = new CommentService();

      try {
        // CHOSEN AGENT DATA
        const agentData = await agent.getAgentDetail(agentId!);
        setChosenAgentPage(agentData);

        // AGENT COMMENTS DATA
        const result = await comment.getItemComments(
          agentId!,
          agentCommentsInput
        );
        setChosenAgentComments(result);

        // FEATURED PROPERTY
        const featuredPropertiesInput = { page: 1, limit: 4 };
        const result2 = await property.getFeaturedProperty(
          featuredPropertiesInput
        );
        setFeaturedProperties(result2);
      } catch (error) {
        console.log("Error in fetching chosenAgentPage: ", error);
        await sweetErrorHandling(error!);
      }

      setLoading(false);
    };
    fetchingData();
  }, [agentId, agentCommentsInput, reloadMainPage]);

  // ---------------------------------- RENDER ----------------------------------------------

  if (loading && !chosenAgent) {
    return <DetailPageLoading />;
  }

  return (
    <>
      <SectionIntroNoBackground
        title="Agent Detail"
        subtitle={chosenAgent?.fullName ?? "N/A"}
      />

      <SectionTopShortInfo
        data={{
          address: chosenAgent.address,
          avatar: chosenAgent.avatar,
          bioInfo: chosenAgent.bioInfo,
          name: chosenAgent.fullName ?? chosenAgent.nickname,
          socialLinks: chosenAgent.socialLinks,
          totalProperties: chosenAgent.totalProperties,
          role: "agent",
        }}
      />
      <AgentDetailMainContent
        agent={chosenAgent}
        setAgentCommentsInput={setAgentCommentsInput}
        setReloadMainPage={setReloadMainPage}
      />
    </>
  );
};

export default ChooseAgent;
