import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenAgencyPage } from "./slice";
import type { Agency } from "@/lib/type/agency";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenAgencyPage } from "./selector";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AgencyService from "@/app/services/Agency.service";
import DetailPageLoading from "@/app/components/loading/DetailPageLoading";
import SectionTopShortInfo from "@/app/components/SectionTopShortInfo";
import AgencyDetailMainContent from "./AgencyDetailMainContent";
import type { FeaturedPropertyResults } from "@/lib/type/property";
import { setFeaturedProperties } from "../homePage/slice";
import PropertyService from "@/app/services/Property.service";
// ----------------------------------------- REDUX INTEGRATION --------------------------
const chosenAgencyPageDispatch = (dispatch: Dispatch) => ({
  setChosenAgencyPage: (data: Agency) => dispatch(setChosenAgencyPage(data)),
});
const featuredPropertiesDispatch = (dispatch: Dispatch) => ({
  setFeaturedProperties: (data: FeaturedPropertyResults) =>
    dispatch(setFeaturedProperties(data)),
});

const chosenAgencyPageRetriever = createSelector(
  retrieveChosenAgencyPage,
  (chosenAgencyPage) => ({ chosenAgencyPage }),
);

// ------------------------------------------ COMPONENT ------------------------------
export default function ChooseAgency() {
  const { setFeaturedProperties } = featuredPropertiesDispatch(useDispatch());
  const { setChosenAgencyPage } = chosenAgencyPageDispatch(useDispatch());
  const [loading, setLoading] = useState<boolean>(true);
  const { chosenAgencyPage: agency } = useSelector(chosenAgencyPageRetriever);
  const { agencyId } = useParams();
  // const [activeTab, setActiveTab] = useState<"properties" | "agents">("agents");

  // const handleTabContent = (str: "agents" | "properties"): void => {
  //   setActiveTab(str);
  // };
  useEffect(() => {
    // ------------------------------- FETCHING DATA ------------------------
    if (!agencyId) return;
    const fetchData = async () => {
      setLoading(true);
      const agency = new AgencyService();
      const property = new PropertyService();
      try {
        // CHOSEN AGENCY
        const result = await agency.getAgencyDetail(agencyId);
        setChosenAgencyPage(result);

        // FEATURED PROPERTY
        const featuredPropertiesInput = { page: 1, limit: 4 };
        const result2 = await property.getFeaturedProperty(
          featuredPropertiesInput,
        );
        setFeaturedProperties(result2);
      } catch (error) {
        console.log("Error in fetching ChosenAgencyPage data: ", error);
        await sweetErrorHandling(error!);
      }
      setLoading(false);
    };
    fetchData();
  }, [agencyId]);

  if (loading && !agency) {
    return <DetailPageLoading />;
  }
  return (
    agency && (
      <>
        <SectionIntroNoBackground
          title="Agency Detail"
          subtitle={agency?.memberName ?? "N/A"}
        />

        <SectionTopShortInfo
          data={{
            role: "agency",
            address: agency?.address,
            avatar: agency.avatar,
            bioInfo: agency.bioInfo,
            name: agency.memberName,
            socialLinks: agency.socialLinks,
            totalProperties: agency.propertiesTotalNumber,
          }}
        />
        <AgencyDetailMainContent agency={agency} />
      </>
    )
  );
}
