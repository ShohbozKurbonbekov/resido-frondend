import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { FollowedAgent, FollowedAgentsType } from "@/lib/type/agent";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import React from "react";
import FollowedAgentsCard from "./FollowedAgentsCard";
import { cardsWrapperClass } from "./FollowedAgents";

interface FollowedAgentsContentType {
  followedAgents: FollowedAgentsType;
  followedAgentsInput: CommonInput;
  setFollowedAgentsInput: SetStateType<CommonInput>;
  setMainPageLoading: SetStateType<boolean>;
}
const FollowedAgentsContent: React.FC<FollowedAgentsContentType> = React.memo(
  ({
    followedAgents,
    setFollowedAgentsInput,
    followedAgentsInput,
    setMainPageLoading,
  }) => {
    return (
      <>
        {followedAgents?.agents?.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className={cardsWrapperClass}>
              {followedAgents?.agents.map((agent: FollowedAgent) => (
                <FollowedAgentsCard
                  agent={agent}
                  key={agent?._id}
                  setMainPageLoading={setMainPageLoading}
                />
              ))}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (followedAgents.totalNumbers[0]?.total ?? 0) /
                  followedAgentsInput.limit
              )}
              styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
              currentPage={followedAgentsInput.page}
              onPageChange={setFollowedAgentsInput}
            />
          </div>
        ) : (
          <NoFound title="No followed agents found" />
        )}
      </>
    );
  }
);

export default FollowedAgentsContent;
