import VideoPlayer from "./DetailVideoPalyer";
import LocationMap from "@/app/components/map/LocationMap";
import LightboxImages from "@/app/components/lightboxImage/LightboxImages";
import RatingBox from "@/app/components/progressBar/RatingBox";
import SaveShareCom from "./SaveShareCom";
import AgentContact from "../../components/AgentContact";
import MortageCalculation from "./MortageCalculation";
import PropertyDetailFeaturedProperty from "../../components/PropertyDetailFeaturedProperty";
import { retrieveChosenPropComments, retrieveChosenProperty } from "./selector";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ChosenPropTopIntro from "./ChosenPropTopIntro";
import ChosenPropAccordion from "./ChosenPropAccordion";
import DetailFeaturesCom from "./DetailFeaturesCom";
import AmenitiesCom from "./AmenititesCom";
import type { ChosenItemCommentsInput } from "@/lib/type/comment";
import ChosenPropertyNearbyPlaces from "./PropertyDetailNearbyPlaces";
import { handleRating } from "@/lib/utils";
import { useMemo } from "react";
import type { SetStateType } from "@/lib/type/common";
import ChosenItemComments from "@/app/components/ChosenItemComments";
import ChosenItemWriteComment from "@/app/components/ChosenItemWriteComment";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import { serverAPI } from "@/lib/config";
import { UserSavingTargetGroup } from "@/lib/enums/user.enum";

interface ChosenPropertyMainContentType {
  setPropertyComments: SetStateType<ChosenItemCommentsInput>;
  setReloadMainPage: SetStateType<boolean>;
}

//------------------------------------------- REDUX SETUP -------------------------
const chosenPropertyRetriever = createSelector(
  retrieveChosenProperty,
  (chosenProperty) => ({ chosenProperty })
);

const chosenPropCommentsRetriever = createSelector(
  retrieveChosenPropComments,
  (chosenPropComments) => ({ chosenPropComments })
);
// ------------------------------------------ COMPONENT ----------------------------
export default function ChosenPropertyMainContent({
  setPropertyComments,
  setReloadMainPage,
}: ChosenPropertyMainContentType) {
  const { chosenPropComments } = useSelector(chosenPropCommentsRetriever);
  const { chosenProperty } = useSelector(chosenPropertyRetriever);
  const { mainProperty, trendingProperties } = chosenProperty;
  const property = mainProperty[0];
  const agentData = property?.agentData;
  const shareTitle = "visit our page to see a special property for you";
  const shareUrl = `${serverAPI}/properties/${property?._id}`;

  const propertyRating = useMemo(() => {
    const rating = property?.averageRating;
    return handleRating(rating);
  }, [property]);

  // ------------------------------ RENDER -----------------------
  return (
    <div className="container py-20 grid rid-cols-1 lg:grid-cols-6 gap-5 ">
      <div className="lg:col-span-4">
        {/* ----------------------- TOP INTRODUCTION -------------------------------
         */}
        <ChosenPropTopIntro
          property={property}
          setReloadMainPage={setReloadMainPage}
        />
        {/* ----------------------- DETAIL & FEATURES -------------------------------
         */}
        <ChosenPropAccordion
          triggerTitle={"Detail & Features"}
          open={true}
          content={<DetailFeaturesCom property={property} />}
          classes={"flex flex-row  justify-between mt-3"}
        />
        {/* ----------------------- DESCRIPTION -------------------------------
         */}
        <ChosenPropAccordion
          open={true}
          triggerTitle={"Description"}
          content={
            <p className="leading-7  text-slate-500 font-jostFont">
              {property?.description}
            </p>
          }
        />
        {/* ----------------------- AMENITIES-------------------------------
         */}
        <ChosenPropAccordion
          triggerTitle={"Amenities"}
          content={<AmenitiesCom amenitites={property?.amenities} />}
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
          content={<LocationMap property={property} />}
        />
        {/* ------------------------------------ GALLERY --------------------------------------*/}
        <ChosenPropAccordion
          triggerTitle={"Gallery"}
          content={<LightboxImages property={property} />}
        />
        {/*-------------------------------------- RATING -------------------------------------*/}
        <RatingBox ratingValue={handleRating(propertyRating)} />

        {/* -------------------------------------- COMMENTS READING -------------------------------------------------*/}
        <ChosenPropAccordion
          triggerTitle={`${
            chosenPropComments?.metaCounter[0]?.total ?? 0
          } Reviews`}
          content={
            <ChosenItemComments
              chosenItemComments={chosenPropComments}
              setPropertyComments={setPropertyComments}
            />
          }
        />

        {/* ------------------------------------ NEARBY LOCATIONS -------------------------- */}
        <ChosenPropAccordion
          triggerTitle={"Nearby"}
          content={<ChosenPropertyNearbyPlaces property={property} />}
        />

        {/* -------------------------------------- WRITE COMMENT ------------------------------*/}
        <ChosenPropAccordion
          triggerTitle={"Write a comment"}
          content={
            <ChosenItemWriteComment
              id={property._id}
              targetType={CommentTargetType.PROPERTY}
              setReloadMainPage={setReloadMainPage}
            />
          }
        />
      </div>

      {/*------------------------------------------ SHARE AND LIKE --------------------------------*/}
      <div className="lg:col-span-2">
        <SaveShareCom
          setReloadMainPage={setReloadMainPage}
          isSaved={property.meSaved!}
          savedItemId={property._id}
          shareTitle={shareTitle}
          shareUrl={shareUrl}
          targetItem={UserSavingTargetGroup.PROPERTY}
        />
        <AgentContact
          contactData={{
            avatar: agentData?.avatar,
            id: agentData?._id,
            name: agentData?.fullName ?? agentData?.nickname,
            phone: agentData?.phone,
            role: agentData?.role,
          }}
        />

        {/* ------------------------------------------- MORETAGE CALCULATION -----------------------*/}
        <MortageCalculation />

        {/* --------------------------------------- FEATURED PROPERTIES ------------------------------*/}
        <PropertyDetailFeaturedProperty featuredProperty={trendingProperties} />
      </div>
    </div>
  );
}
