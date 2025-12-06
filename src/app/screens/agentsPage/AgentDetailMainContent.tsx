import type { AgentData } from "@/lib/type/agent";
import React, { useMemo, useState } from "react";
import SellerInfo from "@/app/components/SellerInfo";
import RatingBox from "@/app/components/progressBar/RatingBox";
import { handleRating } from "@/lib/utils";
import { retrieveChosenAgentComments } from "./selector";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import type { SetStateType, ToggleBtnState } from "@/lib/type/common";
import type { ChosenItemCommentsInput } from "@/lib/type/comment";
import ChosenItemComments from "@/app/components/ChosenItemComments";
import ChosenItemWriteComment from "@/app/components/ChosenItemWriteComment";
import { MessageSquareX, MessagesSquare } from "lucide-react";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import AgentContact from "@/app/components/AgentContact";
import { retrieveFeaturedProperties } from "../homePage/selector";
import PropertyDetailFeaturedProperty from "@/app/components/PropertyDetailFeaturedProperty";
import AgentAgencyToggleBtn from "@/app/components/AgentAgencyDetailToggleBtn";
import SaveShareCom from "../propertiesPage/SaveShareCom";
import { serverAPI } from "@/lib/config";
import { UserSavingTargetGroup } from "@/lib/enums/user.enum";

// ---------------------------------------------- REDUX USAGE -------------------------------------
const featuredPropertiesRetriever = createSelector(
  retrieveFeaturedProperties,
  (featuredProperties) => ({ featuredProperties })
);

const chosenAgentCommentsRetriever = createSelector(
  retrieveChosenAgentComments,

  (chosenAgentComments) => ({ chosenAgentComments })
);

// ------------------------------------------- COMPONENT ----------------------------------------
interface AgentDetailMainContentProp {
  agent: AgentData;
  setAgentCommentsInput: SetStateType<ChosenItemCommentsInput>;
  setReloadMainPage: SetStateType<boolean>;
}
const AgentDetailMainContent: React.FC<AgentDetailMainContentProp> = React.memo(
  ({ agent, setAgentCommentsInput, setReloadMainPage }) => {
    const { chosenAgentComments } = useSelector(chosenAgentCommentsRetriever);
    const { featuredProperties } = useSelector(featuredPropertiesRetriever);
    const shareUrl = `${serverAPI}/agent/${agent?._id}`;
    const shareTitle = "Visit us to see our special agent";

    const [agentPropertyType, setPropertyType] = useState<ToggleBtnState>({
      type: "RENT",
    });

    const agentRating = useMemo(() => {
      return handleRating(agent?.averageRating);
    }, [agent]);

    const totalComments = useMemo(() => {
      const comments = chosenAgentComments?.metaCounter[0]?.total ?? 0;
      return comments;
    }, [chosenAgentComments]);

    // ------------------------------------------- RENDERS ----------------------------------------
    return (
      <section className="bg-sky-100">
        <div className="container  pb-20 grid rid-cols-1 lg:grid-cols-6 gap-5 ">
          <div className="lg:col-span-4">
            {/* Agent Some Info */}
            <SellerInfo
              title={"Agent Information"}
              data={{
                address: agent?.address,
                isVerified: agent?.isVerified,
                memberEmail: agent?.memberEmail,
                name: agent?.fullName ?? agent?.nickname,
                phone: agent?.phone,
                rank: agent?.rank,
                role: "agent",
                yearOfExperience: agent?.yearOfExperience,
                currentStatus: agent?.currentStatus,
              }}
            />

            {/* Agent Properties */}
            <div className="mt-10  rounded-md bg-white flex flex-col">
              <AgentAgencyToggleBtn
                role="agent"
                btnToggleUpdater={(str) => setPropertyType({ type: str })}
                btnToggleState={agentPropertyType}
                btnStr1={"RENT"}
                btnStr2={"SALE"}
                agentData={agent?.properties}
                _id={agent._id}
              />
            </div>

            {/*AGENT RATING */}
            <RatingBox ratingValue={agentRating} />

            {/* COMMENTS READING*/}
            <div className="mt-6 bg-white p-6 rounded-md">
              {totalComments ? (
                <div className="wrapper">
                  <p className=" font-normal capitalize font-jostFont text-lg flex flex-row items-center gap-3  px-5 py-2  text-slate-500 mb-5 rounded-md">
                    <MessagesSquare />
                    {totalComments} comment{totalComments > 1 ? "s" : ""} all
                  </p>
                  <ChosenItemComments
                    chosenItemComments={chosenAgentComments}
                    setPropertyComments={setAgentCommentsInput}
                  />
                </div>
              ) : (
                <p className="flex flex-row items-center gap-3 text-lg font-jostFont text-slate-500">
                  <MessageSquareX /> No comments yet
                </p>
              )}
            </div>

            {/* COMMENT WRITING*/}
            <div className="mt-6 bg-white p-6 rounded-md">
              <ChosenItemWriteComment
                id={agent._id}
                targetType={CommentTargetType.AGENT}
                setReloadMainPage={setReloadMainPage}
              />
            </div>
          </div>

          {/* AGENT CONTACT*/}
          <div className="lg:col-span-2">
            <SaveShareCom
              setReloadMainPage={setReloadMainPage}
              savedItemId={agent?._id}
              shareUrl={shareUrl}
              shareTitle={shareTitle}
              isSaved={agent.meSaved!}
              targetItem={UserSavingTargetGroup.AGENT}
            />
            <AgentContact
              contactData={{
                avatar: agent?.avatar,
                id: agent?._id,
                name: agent.nickname ?? agent.fullName,
                phone: agent.phone,
                role: agent.role,
              }}
            />

            {/* FEATURED  PROPERTIES*/}

            <PropertyDetailFeaturedProperty
              featuredProperty={featuredProperties?.properties}
            />
          </div>
        </div>
      </section>
    );
  }
);

export default AgentDetailMainContent;
