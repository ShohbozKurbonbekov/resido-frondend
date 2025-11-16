import VideoPlayer from "./DetailVideoPalyer";
import LocationMap from "@/app/components/map/LocationMap";
import LightboxImages from "@/app/components/lightboxImage/LightboxImages";
import RatingBox from "@/app/components/progressBar/RatingBox";
import SaveShareCom from "./SaveShareCom";
import AgentContact from "../../components/AgentContact";
import MortageCalculation from "./MortageCalculation";
import PropertyDetailFeaturedProperty from "../../components/PropertyDetailFeaturedProperty";
import { retrieveChosenProperty } from "./selector";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ChosenPropTopIntro from "./ChosenPropTopIntro";
import ChosenPropAccordion from "./ChosenPropAccordion";
import DetailFeaturesCom from "./DetailFeaturesCom";
import AmenitiesCom from "./AmenititesCom";
import ChosenPropertyReviews from "./PropertyDetailReviews";
import type { Comments } from "@/lib/type/comment";
import ChosenPropertyNearbyPlaces from "./PropertyDetailNearbyPlaces";
import ChosenPropWriteComment from "./ChosenPropWriteComment";

interface ChosenPropertyMainContentType {
  chosenPropComments: Comments;
}

//------------------------------------------- REDUX SETUP -------------------------
const chosenPropertyRetriever = createSelector(
  retrieveChosenProperty,
  (chosenProperty) => ({ chosenProperty })
);

// ------------------------------------------ COMPONENT ----------------------------
export default function ChosenPropertyMainContent({
  chosenPropComments,
}: ChosenPropertyMainContentType) {
  const { chosenProperty } = useSelector(chosenPropertyRetriever);
  const { mainProperty, trendingProperties } = chosenProperty;

  // ------------------------------ RENDER -----------------------
  return (
    <div className="container py-20 grid rid-cols-1 lg:grid-cols-6 gap-5 ">
      <div className="lg:col-span-4">
        {/* ----------------------- TOP INTRODUCTION -------------------------------
         */}
        <ChosenPropTopIntro property={mainProperty[0]} />
        {/* ----------------------- DETAIL & FEATURES -------------------------------
         */}
        <ChosenPropAccordion
          triggerTitle={"Detail & Features"}
          open={true}
          content={<DetailFeaturesCom property={mainProperty[0]} />}
          classes={"flex flex-row  justify-between mt-3"}
        />
        {/* ----------------------- DESCRIPTION -------------------------------
         */}
        <ChosenPropAccordion
          open={true}
          triggerTitle={"Description"}
          content={
            <p className="leading-7  text-slate-500 font-jostFont">
              {mainProperty[0].description}
            </p>
          }
        />
        {/* ----------------------- AMENITIES-------------------------------
         */}
        <ChosenPropAccordion
          triggerTitle={"Amenities"}
          content={<AmenitiesCom amenitites={mainProperty[0].amenities} />}
          classes={"flex flex-col gap-4 mt-3"}
        />
        {/*----------------------------------------- VIDEO ---------------------------*/}
        <ChosenPropAccordion
          triggerTitle={"Property Video"}
          content={<VideoPlayer />}
        />
        {/* --------------------------------  PROPERTY LOCATION ------------------------------*/}
        <ChosenPropAccordion
          triggerTitle={"Location"}
          content={<LocationMap property={mainProperty[0]} />}
        />
        {/* ------------------------------------ GALLERY --------------------------------------*/}
        <ChosenPropAccordion
          triggerTitle={"Gallery"}
          content={<LightboxImages property={mainProperty[0]} />}
        />
        {/*-------------------------------------- RATING -------------------------------------*/}
        <RatingBox property={mainProperty[0]} />
        {/* -------------------------------------- COMMENTS -------------------------------------------------*/}
        <ChosenPropAccordion
          triggerTitle={`${
            chosenPropComments?.metaCounter[0]?.total ?? 0
          } Reviews`}
          content={
            <ChosenPropertyReviews chosenPropComments={chosenPropComments} />
          }
        />

        {/* ------------------------------------ NEARBY LOCATIONS -------------------------- */}
        <ChosenPropAccordion
          triggerTitle={"Nearby"}
          content={<ChosenPropertyNearbyPlaces property={mainProperty[0]} />}
        />

        {/* -------------------------------------- COMMENT ------------------------------*/}
        <ChosenPropAccordion
          triggerTitle={"Write a comment"}
          content={<ChosenPropWriteComment property={mainProperty[0]} />}
        />
      </div>

      {/*------------------------------------------ SHARE AND LIKE --------------------------------*/}
      <div className="lg:col-span-2">
        <SaveShareCom property={mainProperty[0]} />
        <AgentContact agentData={mainProperty[0]?.agentData[0]} />

        {/* ------------------------------------------- MORETAGE CALCULATION -----------------------*/}
        <MortageCalculation />

        {/* --------------------------------------- FEATURED PROPERTIES ------------------------------*/}
        <PropertyDetailFeaturedProperty featuredProperty={trendingProperties} />
      </div>
    </div>
  );
}
