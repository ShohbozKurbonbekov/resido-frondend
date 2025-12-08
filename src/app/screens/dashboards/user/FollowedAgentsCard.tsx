import Stars from "@/app/components/Stars";
import AgentService from "@/app/services/AgentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import type { FollowedAgent } from "@/lib/type/agent";
import type { SetStateType } from "@/lib/type/common";
import { dateConverter, handleRating } from "@/lib/utils";
import React, { useCallback } from "react";

interface AgentCardType {
  agent: FollowedAgent;
  setMainPageLoading: SetStateType<boolean>;
}

const AgentCard: React.FC<AgentCardType> = React.memo(
  ({ agent, setMainPageLoading }) => {
    const imgUrl = agent.avatar
      ? `${serverAPI}/${agent.avatar}`
      : defaultUserAvatar;

    // -------------------------------------- HANDLERS --------------------------------------------
    const handleUnfollow = useCallback(async () => {
      const target = new AgentService();
      try {
        await target.unFollowAgent(agent._id);
        setMainPageLoading((prev) => !prev);
        await sweetTopSmallSuccessAlert("Successfully unfollowed", 1400);
      } catch (error) {
        console.log("Error in unFollowAgent: ", error);
        await sweetErrorHandling(error!);
      }
    }, [agent, setMainPageLoading]);

    return (
      <Card className="w-full max-w-md bg-white rounded-md hover:shadow-2xl transition-all duration-300 ease-linear border p-4  mx-auto">
        {/* Avatar */}
        <div className="w-full flex justify-center mt-2 mb-3">
          <div className="w-36 h-36 rounded-full overflow-hidden  border-2 border-slate-200">
            <img
              src={imgUrl}
              alt={agent.nickname}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold truncate flex justify-between items-center gap-2 font-jostFont text-darkBlue capitalize">
            <span className="truncate">{agent.fullName || agent.nickname}</span>

            <Stars rating={handleRating(agent.averageRating)} />
          </CardTitle>
          <p className="flex flex-row justify-between items-center truncate gap-2 text-xs text-gray-500 font-jostFont capitalize">
            <span> agent since</span>
            {dateConverter(String(agent.createdAt), "Do MMM YYYY")}
          </p>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium text-muted-foreground font-jostFont capitalize">
              Total Followers:
            </span>
            <span className="flex flex-row items-center justify-center h-6 w-6 font-semibold font-jostFont text-darkBlue bg-slate-200  rounded-full text-xs">
              {agent.totalSavings}
            </span>
          </div>

          <div className="flex gap-2 mt-2 font-jostFont">
            <button
              className="w-1/2 bg-rose-500 text-white py-2 rounded-lg font-medium hover:bg-rose-700 duration-200 ease-linear transition-all active:shadow-[0_0_1px_3px_rgba(255,0,0,0.4)]"
              onClick={handleUnfollow}
            >
              Unfollow
            </button>
            <a
              href={`/agents/${agent._id}`}
              className="w-1/2 text-center bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-700 duration-200 ease-linear transition-all active:shadow-[0_0_1px_3px_rgba(0,0,255,0.4)]"
            >
              Visit
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default AgentCard;
