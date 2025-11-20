import type { AgentData } from "@/lib/type/agent";
import React, { useCallback, useMemo, useState } from "react";
import SellerInfo from "@/app/components/SellerInfo";
import NoFound from "@/app/components/NoFound";
import PropertyCard from "@/app/components/PropertyCard";
import type { Property } from "@/lib/type/property";
import { useNavigate } from "react-router-dom";
import RatingBox from "@/app/components/progressBar/RatingBox";
import { handleRating } from "@/lib/utils";
import { retrieveChosenAgentComments } from "./selector";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import type { SetStateType } from "@/lib/type/common";
import type { ChosenItemCommentsInput } from "@/lib/type/comment";
import ChosenItemComments from "@/app/components/ChosenItemComments";
import ChosenItemWriteComment from "@/app/components/ChosenItemWriteComment";
import { MessageSquareX, MessagesSquare } from "lucide-react";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import AgentContact from "@/app/components/AgentContact";
import { retrieveFeaturedProperties } from "../homePage/selector";
import PropertyDetailFeaturedProperty from "@/app/components/PropertyDetailFeaturedProperty";

// ---------------------------------------------- REDUX USAGE -------------------------------------
const featuredPropertiesRetriever = createSelector(
  retrieveFeaturedProperties,
  (featuredProperties) => ({ featuredProperties })
);

const chosenAgentCommentsRetriever = createSelector(
  retrieveChosenAgentComments,

  (chosenAgentComments) => ({ chosenAgentComments })
);

const agentPropertiesTypeBtn =
  "transition-all duration-300 capitalize text-sm font-bold ease-linear  rounded-md py-4 px-6 bg-blue-500 text-white hover:bg-blue-700";
const activeBtn = "bg-blue-900 shadow-pagesActiveButtons";
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

    const [agentPropertyType, setPropertyType] = useState<{
      type: string | null;
    }>({
      type: "RENT",
    });

    const noProperties =
      !agent?.properties?.rent?.length && !agent?.properties?.sale?.length;
    const navigation = useNavigate();
    const agentRating = useMemo(() => {
      return handleRating(agent?.averageRating);
    }, [agent]);

    const totalComments = useMemo(() => {
      const comments = chosenAgentComments?.metaCounter[0]?.total ?? 0;
      return comments;
    }, [chosenAgentComments]);
    // ------------------------------------------- HANDLERS ----------------------------------------
    const propertiesList = useCallback((properties: Property[]) => {
      return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2  gap-5">
          {properties.slice(0, 4).map((property) => (
            <PropertyCard property={property} key={property._id} />
          ))}
        </div>
      );
    }, []);

    const handlePropertyTypeBtn = useCallback((str: string) => {
      setPropertyType(() => ({ type: str }));
    }, []);

    const handleClick = () => {
      navigation(`/agents/${agent._id}/properties`);
    };

    const returnTargetProperties = useMemo(() => {
      if (!agent?.properties?.rent?.length && !agent?.properties?.sale?.length)
        return null;

      if (
        agentPropertyType.type === "RENT" &&
        agent?.properties?.rent?.length
      ) {
        return propertiesList(agent.properties.rent);
      }

      if (
        agentPropertyType.type === "SALE" &&
        agent?.properties?.sale?.length
      ) {
        return propertiesList(agent.properties.sale);
      }
      return null;
    }, [agent, agentPropertyType, propertiesList]);
    // ------------------------------------------- RENDERS ----------------------------------------

    return (
      <section className="bg-sky-100">
        <div className="container  pb-20 grid rid-cols-1 lg:grid-cols-6 gap-5 ">
          <div className="lg:col-span-4">
            {/* Agent Some Info */}
            <SellerInfo title={"Agent Information"} data={agent} />

            {/* Agent Properties */}
            <div className="mt-10  rounded-md bg-white flex flex-col">
              <div className="py-2 px-4 mb-4 border-b-2 border-slate-200">
                <button
                  className={`${agentPropertiesTypeBtn}   me-2.5 ${
                    agentPropertyType.type === "RENT" ? activeBtn : "scale-75"
                  }`}
                  onClick={() => handlePropertyTypeBtn("RENT")}
                  type="button"
                >
                  Rental
                </button>
                <button
                  className={`${agentPropertiesTypeBtn} ${
                    agentPropertyType.type === "SALE" ? activeBtn : "scale-75"
                  }`}
                  onClick={() => handlePropertyTypeBtn("SALE")}
                  type="button"
                >
                  for sale
                </button>
              </div>
              {returnTargetProperties ? returnTargetProperties : <NoFound />}

              {!noProperties && (
                <div className="mx-auto">
                  <button
                    className="py-2.5 px-12 bg-blue-800 text-white hover:bg-blue-500 rounded-md border-0 transition-all duration-300 ease-linear cursor-pointer text-base capitalize mt-5 mb-6"
                    type="button"
                    onClick={handleClick}
                  >
                    Browse More Properties
                  </button>
                </div>
              )}
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
            <AgentContact agentData={agent} />

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
