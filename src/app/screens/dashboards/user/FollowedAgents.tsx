import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import FallowedAgentsHeader from "./FollowedAgentsHeader";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setFollowedAgents } from "./slice";
import type { FollowedAgentsType } from "@/lib/type/agent";
import { retrieveFollowedAgents } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import AgentService from "@/app/services/AgentService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const followedAgentsDispatch = (dispatch: Dispatch) => ({
  setFollowedAgents: (data: FollowedAgentsType) =>
    dispatch(setFollowedAgents(data)),
});

const followedAgentsRetriever = createSelector(
  retrieveFollowedAgents,
  (followedAgents) => ({ followedAgents })
);

// --------------------------------------- COMPONENT --------------------
export default function FollowedAgents() {
  const { setFollowedAgents } = followedAgentsDispatch(useDispatch());
  const { followedAgents } = useSelector(followedAgentsRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [followedAgentsInput, setFollowedAgentsInput] = useState<CommonInput>({
    page: 1,
    limit: 5,
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
  }, [followedAgentsInput]);
  // --------------------------------------- COMPONENT --------------------
  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      {loading ? (
        <SpinnerGrids columns="grid grid-cols-1" cardHeight="h-30" />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <FallowedAgentsHeader />
        </div>
      )}
    </div>
  );
}
