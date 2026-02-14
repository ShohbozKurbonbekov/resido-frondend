import type { ToggleBtnState } from "@/lib/type/common";
import { loweredCaseStr } from "@/lib/utils";
import React, { useCallback, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/lib/type/property";
import type { AgentData, AgentPropertiesType } from "@/lib/type/agent";
import type { AgencyToggleStateType } from "@/lib/type/agency";
import AgentCard from "./Cards/AgentCard";
import NoFound from "./NoFound";
import { useNavigate } from "react-router-dom";

const btnToggleClasses =
  "transition-all duration-300 capitalize text-sm font-bold ease-linear  rounded-md py-4 px-6 bg-blue-500 text-white hover:bg-blue-700";
const activeBtn = "bg-blue-900 shadow-pagesActiveButtons";
type GenerateCardsType = Property[] | AgentData[];

// --------------------------------------------- COMPONENT ----------------------------------------------
interface AgentAgencyToggleType {
  btnToggleUpdater: (str: string) => void;
  btnToggleState: ToggleBtnState;
  btnStr1: string;
  btnStr2: string;
  role: string;
  agentData?: AgentPropertiesType;
  agencyData?: AgencyToggleStateType;
  _id: string;
}

const AgentAgencyToggleBtn: React.FC<AgentAgencyToggleType> = React.memo(
  ({
    btnToggleUpdater,
    btnToggleState,
    btnStr1,
    btnStr2,
    role,
    agencyData,
    agentData,
    _id,
  }) => {
    const navigation = useNavigate();
    // ---------------------------------------- HANDLERS -----------------------------------------
    const handleClick = useCallback(
      (str: string) => {
        btnToggleUpdater(str);
      },
      [btnToggleUpdater],
    );

    const generateCards = useCallback(
      (cardsArr: GenerateCardsType) => {
        let content;

        if (role === "agent") {
          content = (
            <>
              {cardsArr.slice(0, 4).map((property) => (
                <PropertyCard
                  property={property as Property}
                  key={property._id}
                />
              ))}
            </>
          );
        } else {
          if (
            role === "agency" &&
            btnToggleState.type === btnStr1 &&
            agencyData?.agents?.length
          )
            content = (
              <>
                {agencyData?.agents.slice(0, 4)?.map((agent) => (
                  <AgentCard agent={agent} />
                ))}
              </>
            );

          if (
            role === "agency" &&
            btnToggleState.type === btnStr2 &&
            agencyData?.properties?.length
          ) {
            content = (
              <>
                {agencyData.properties.slice(0, 4).map((property) => (
                  <PropertyCard property={property} />
                ))}
              </>
            );
          }
        }
        return (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2  gap-5">
            {content}
          </div>
        );
      },
      [role, agencyData, btnStr1, btnStr2, btnToggleState],
    );

    const returnTargetItems = useMemo(() => {
      if (role === "agent") {
        if (!agentData?.rent?.length && !agentData?.sale?.length) return null;

        if (btnToggleState.type === btnStr1 && agentData?.rent?.length)
          return generateCards(agentData.rent);

        if (btnToggleState.type === btnStr2 && agentData.sale?.length)
          return generateCards(agentData.sale);
        return null;
      }
      if (role === "agency") {
        if (!agencyData?.agents?.length && !agencyData?.properties?.length)
          return null;
        if (btnToggleState.type === btnStr1 && agencyData.agents?.length)
          return generateCards(agencyData?.agents);

        if (btnToggleState.type === btnStr2 && agencyData?.properties?.length)
          return generateCards(agencyData?.properties);
      }
      return null;
    }, [
      agencyData,
      agentData,
      btnStr1,
      btnStr2,
      btnToggleState,
      generateCards,
      role,
    ]);

    const handleNavigation = useCallback(() => {
      const navigationUrl: string =
        role === "agent"
          ? `/agents/${_id}/properties`
          : `/agencies/${_id}/agents-properties`;

      navigation(navigationUrl);
    }, [_id, navigation, role]);

    const noDataFound =
      role === "agent"
        ? !agentData?.rent?.length && !agentData?.sale?.length
        : !agencyData?.agents?.length && !agencyData?.properties?.length;

    const btnEl1 =
      role === "agent"
        ? `for ${loweredCaseStr(btnStr1)}`
        : loweredCaseStr(btnStr1);
    const btnEl2 =
      role === "agent"
        ? `for ${loweredCaseStr(btnStr2)}`
        : loweredCaseStr(btnStr2);

    return (
      <div className="mt-10  rounded-md bg-white flex flex-col">
        <div className="py-2 px-4 mb-4 border-b-2 border-slate-200">
          <button
            className={`${btnToggleClasses} me-2.5 ${
              btnToggleState.type === btnStr1 ? activeBtn : "scale-75"
            }`}
            onClick={() => handleClick(btnStr1)}
            type="button"
          >
            {`${btnEl1}`}
          </button>
          <button
            className={`${btnToggleClasses} ${
              btnToggleState.type === btnStr2 ? activeBtn : "scale-75"
            }`}
            onClick={() => handleClick(btnStr2)}
            type="button"
          >
            {`${btnEl2}`}
          </button>
        </div>
        {returnTargetItems ? returnTargetItems : <NoFound />}

        {!noDataFound && (
          <div className="mx-auto">
            <button
              className="py-2.5 px-12 bg-blue-800 text-white hover:bg-blue-500 rounded-md border-0 transition-all duration-300 ease-linear cursor-pointer text-base capitalize mt-5 mb-6"
              type="button"
              onClick={handleNavigation}
            >
              Browse More results
            </button>
          </div>
        )}
      </div>
    );
  },
);
export default AgentAgencyToggleBtn;
