import type { Agency } from "@/lib/type/agency";
import { useNavigate } from "react-router-dom";
import SomeInfoSection from "@/app/components/SellerInfo";
import React, { useState } from "react";
import type { ToggleBtnState } from "@/lib/type/common";
import AgentAgencyToggleBtn from "@/app/components/AgentAgencyDetailToggleBtn";
import AgentContact from "@/app/components/AgentContact";
import PropertyDetailFeaturedProperty from "@/app/components/PropertyDetailFeaturedProperty";
import { createSelector } from "reselect";
import { retrieveFeaturedProperties } from "../homePage/selector";
import { useSelector } from "react-redux";

// ------------------------------------ REDUX INTEGRATION -----------------------------------
const featuredPropertiesRetriever = createSelector(
  retrieveFeaturedProperties,
  (featuredProperties) => ({ featuredProperties })
);

const AddNewAgent: React.FC = () => {
  const navigation = useNavigate();

  return (
    <button
      type="button"
      className="list-none text-base text-white capitalize font-jostFont py-[10px] px-5 rounded-md bg-green-800 leading-tight hover:bg-green-700 active:scale-95 transition-all duration-300 ease-linear"
      onClick={() => {
        navigation(`/agents/become-an-agent?agencyId=${""}&agencyName=${""}`);
      }}
    >
      Add New Agent
    </button>
  );
};

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
              extraFeature={<AddNewAgent />}
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
