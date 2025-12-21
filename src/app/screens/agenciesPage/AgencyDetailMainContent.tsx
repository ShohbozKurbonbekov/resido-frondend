import type { Agency } from "@/lib/type/agency";
import { useNavigate } from "react-router-dom";
import SomeInfoSection from "@/app/components/SellerInfo";
import React, { useCallback, useState } from "react";
import type { ToggleBtnState } from "@/lib/type/common";
import AgentAgencyToggleBtn from "@/app/components/AgentAgencyDetailToggleBtn";
import AgentContact from "@/app/components/AgentContact";
import PropertyDetailFeaturedProperty from "@/app/components/PropertyDetailFeaturedProperty";
import { createSelector } from "reselect";
import { retrieveFeaturedProperties } from "../homePage/selector";
import { useSelector } from "react-redux";
import { useGlobals } from "@/app/hooks/useGlobals";
import { MemberType } from "@/lib/enums/agent.enum";
import { sweetFailureProvider } from "@/lib/sweetAlerts";
import { ErrorMessages } from "@/lib/config";

// ------------------------------------ REDUX INTEGRATION -----------------------------------
const featuredPropertiesRetriever = createSelector(
  retrieveFeaturedProperties,
  (featuredProperties) => ({ featuredProperties })
);

// ------------------------------------------- ADD AGENCY BUTTON -------------------------------------------------

interface AddNewAgentType {
  agencyId: string;
  agencyName: string;
}

const AddNewAgent: React.FC<AddNewAgentType> = React.memo(
  ({ agencyId, agencyName }) => {
    const navigation = useNavigate();
    const { authmember } = useGlobals();

    const handleClick = useCallback(async () => {
      if (!authmember) {
        await sweetFailureProvider(ErrorMessages.error2, false, "/");
        return;
      }

      if (authmember.role !== MemberType.USER) {
        await sweetFailureProvider(ErrorMessages.error7, true);
        return;
      }

      if (authmember && authmember.role === MemberType.USER) {
        navigation(
          `/agents/become-an-agent?agencyId=${agencyId}&agencyName=${agencyName}`
        );
        return;
      }
    }, [authmember, navigation, agencyId, agencyName]);

    return (
      <button
        type="button"
        className="list-none text-base text-white capitalize font-jostFont py-2.5 px-5 rounded-md bg-green-800 leading-tight hover:bg-green-700 active:scale-95 transition-all duration-300 ease-linear"
        onClick={handleClick}
      >
        Appy to this agency
      </button>
    );
  }
);

// ------------------------------------------- COMPONENT ------------------------------------

interface AgencyDetailMainContentType {
  agency: Agency;
}
const AgencyDetailMainContent: React.FC<AgencyDetailMainContentType> =
  React.memo(({ agency }) => {
    const { featuredProperties } = useSelector(featuredPropertiesRetriever);

    const [toggleBtnType, setToggleBtnType] = useState<ToggleBtnState>({
      type: "agents",
    });

    // ------------------------------------------- RENDER ---------------------------------------------
    return (
      <section className="bg-sky-100">
        <div className="container  pb-20 grid grid-cols-1 lg:grid-cols-6 gap-5 ">
          <div className="lg:col-span-4">
            {/* AGENT SOME INFO */}
            <SomeInfoSection
              extraFeature={
                <AddNewAgent
                  agencyId={agency._id}
                  agencyName={agency.memberName}
                />
              }
              data={{
                address: agency?.address,
                isVerified: agency?.isVerified,
                memberEmail: agency?.memberEmail,
                name: agency?.agencyOwner,
                phone: agency?.memberPhone,
                rank: agency?.agencyBadge,
                role: "agency",
                yearOfExperience: agency?.yearOfExperience,
                memberYear: agency.memberSince,
              }}
              title={"Agency iNFO"}
            />

            {/*  TOGGLE AGENT PROPERTIES AND AGENTS*/}
            <AgentAgencyToggleBtn
              role="agency"
              btnToggleUpdater={(str) =>
                setToggleBtnType((prev) => ({ ...prev, type: str }))
              }
              btnToggleState={toggleBtnType}
              btnStr1={"agents"}
              btnStr2={"properties"}
              agencyData={agency.agencyItems}
              _id={agency._id}
            />
          </div>

          {/* AGENT CONTACT AND TRENDING PROPERTIES  */}
          <div className="lg:col-span-2">
            <AgentContact
              contactData={{
                avatar: agency?.avatar,
                id: agency?._id,
                name: agency?.memberName,
                phone: agency?.memberPhone,
                role: agency?.role,
              }}
            />

            <PropertyDetailFeaturedProperty
              featuredProperty={featuredProperties.properties}
            />
          </div>
        </div>
      </section>
    );
  });

export default AgencyDetailMainContent;
