import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setFollowedAgents } from "./slice";
import type { FollowedAgentsType } from "@/lib/type/agent";
import { retrieveFollowedAgents } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import AgentService from "@/app/services/AgentService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import FollowedAgentsContent from "./FollowedAgentsContent";
import FollowedAgentsHeader from "./FollowedAgentsHeader";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const followedAgentsDispatch = (dispatch: Dispatch) => ({
  setFollowedAgents: (data: FollowedAgentsType) =>
    dispatch(setFollowedAgents(data)),
});

const followedAgentsRetriever = createSelector(
  retrieveFollowedAgents,
  (followedAgents) => ({ followedAgents })
);

export const cardsWrapperClass =
  "grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4";
// --------------------------------------- COMPONENT --------------------
export default function FollowedAgents() {
  const { setFollowedAgents } = followedAgentsDispatch(useDispatch());
  const { followedAgents } = useSelector(followedAgentsRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
  const [followedAgentsInput, setFollowedAgentsInput] = useState<CommonInput>({
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    const agent = new AgentService();
    const fetchFollowedAgents = async () => {
      try {
        const result = await agent.getFollowedAgents(followedAgentsInput);
        setFollowedAgents(result);
      } catch (error) {
        console.log("Error in fetching getFollowedAgents: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedAgents();
  }, [followedAgentsInput, mainPageLoading]);
  // --------------------------------------- COMPONENT --------------------
  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      {loading ? (
        <SpinnerGrids columns={cardsWrapperClass} count={6} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <FollowedAgentsHeader />
          <FollowedAgentsContent
            followedAgents={followedAgents}
            followedAgentsInput={followedAgentsInput}
            setFollowedAgentsInput={setFollowedAgentsInput}
            setMainPageLoading={setMainPageLoading}
          />
        </div>
      )}
    </div>
  );
}
