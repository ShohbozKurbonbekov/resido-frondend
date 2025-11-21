import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenAgencyPage } from "./slice";
import type { Agency } from "@/lib/type/agency";
import { retrieveChosenAgentPage } from "../agentsPage/selector";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenAgencyPage } from "./selector";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AgencyService from "@/app/services/AgencyService";
// ----------------------------------------- REDUX INTEGRATION --------------------------
const chosenAgencyPageDispatch = (dispatch: Dispatch) => ({
  setChosenAgencyPage: (data: Agency) => dispatch(setChosenAgencyPage(data)),
});

const chosenAgencyPageRetriever = createSelector(
  retrieveChosenAgencyPage,
  (chosenAgencyPage) => ({ chosenAgencyPage })
);

// ------------------------------------------ COMPONENT ------------------------------
export default function ChooseAgency() {
  const { setChosenAgencyPage } = chosenAgencyPageDispatch(useDispatch());
  const [loading, setLoading] = useState<boolean>(true);
  const { chosenAgencyPage } = useSelector(chosenAgencyPageRetriever);
  console.log(chosenAgencyPage);
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
      try {
        const result = await agency.getAgencyDetail(agencyId);
        setChosenAgencyPage(result);
      } catch (error) {
        console.log("Error in fetching ChosenAgencyPage data: ", error);
        await sweetErrorHandling(error!);
      }
      setLoading(false);
    };
    fetchData();
  }, [agencyId]);

  return (
    <>
      <SectionIntroNoBackground
        title="Agency Detail"
        subtitle={`Agency page`}
      />
      {/* <SectionTopShortInfo
        shortInfo={{
          logo: chosenAgency.agencyImage,
          location: chosenAgency.agencyLocation,
          name: chosenAgency.agencyName,
          description: chosenAgency.agencyDescription,
          propertyNumber: chosenAgency.agencyPropertyNumbers,
          ...chosenAgency.agencySocialContacts,
        }}
      /> */}
      {/* <AgencyDetailMainContent
        agency={chosenAgency}
        handleTab={handleTabContent}
        activeTab={activeTab}
        agencyInfo={activeTab === "agents" ? agencyAgents : agencyProperties}
        featuredProperty={featuredProperty} */}
      {/* /> */}
    </>
  );
}
