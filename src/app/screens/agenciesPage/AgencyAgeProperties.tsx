import DetailPageLoading from "@/app/components/loading/DetailPageLoading";
import type { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { setChosenAgencyTargetItems } from "./slice";
import type { Agency, AgencyAgePropertiesInput } from "@/lib/type/agency";
import { createSelector } from "reselect";
import { retrieveChosenAgencyTargetItems } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import AgencyService from "@/app/services/AgencyService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { AgencyTargetType } from "@/lib/enums/agency.enum";
import { useParams } from "react-router-dom";

// -------------------------------- REDUX INTEGRATION ----------------
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenAgencyTargetItems: (data: Agency) =>
    dispatch(setChosenAgencyTargetItems(data)),
});

const chosenAgencyTargetItemsRetriever = createSelector(
  retrieveChosenAgencyTargetItems,
  (chosenAgencyTargetItems) => ({ chosenAgencyTargetItems })
);

export default function AgencyAgeProperties() {
  const { agencyId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [agencyItemsSearch, setAgencyItemsSearch] =
    useState<AgencyAgePropertiesInput>({
      page: 1,
      limit: 8,
      agencyTarget: AgencyTargetType.PROPERTIES,
    });

  const { setChosenAgencyTargetItems } = actionDispatch(useDispatch());
  const { chosenAgencyTargetItems } = useSelector(
    chosenAgencyTargetItemsRetriever
  );

  // ---------------------------------------GETING DATA FROM DB ---------------------------
  useEffect(() => {
    if (!agencyId) return;
    setLoading(true);
    const fetchData = async () => {
      const agency = new AgencyService();
      try {
        const result = await agency.getAgencyAgeProperties(
          agencyId,
          agencyItemsSearch
        );
        setChosenAgencyTargetItems(result);
      } catch (error) {
        console.log("Error n fetching chosenAgencyTargetItems: ", error);
        await sweetErrorHandling(error!);
      }
    };
    fetchData();
  }, [agencyId, agencyItemsSearch]);

  // ------------------------------------------- RENDER  ------------------------------------------
  if (loading && !chosenAgencyTargetItems) {
    return <DetailPageLoading />;
  }
  return <div>PROPERTIES</div>;
}
