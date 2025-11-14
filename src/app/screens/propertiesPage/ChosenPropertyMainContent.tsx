import VideoPlayer from "./DetailVideoPalyer";
import LocationMap from "@/app/components/map/LocationMap";
import LightboxImages from "@/app/components/lightboxImage/LightboxImages";
import RatingBox from "@/app/components/progressBar/RatingBox";
import type { PropertyDetailFeaturedPropertyType } from "@/lib/type/property";
import PropertyDetailNearbyPlaces from "./PropertyDetailNearbyPlaces";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SaveShareCom from "./SaveShareCom";
import AgentContact from "../../components/AgentContact";
import MortageCalculation from "./MortageCalculation";
import type { Agent } from "@/lib/type/agent";
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

interface ChosenPropertyMainContentType {
  propertyAgent: Agent;
  featuredProperty: PropertyDetailFeaturedPropertyType[];
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
  featuredProperty,
  propertyAgent,
}: ChosenPropertyMainContentType) {
  const { chosenProperty } = useSelector(chosenPropertyRetriever);
  const { mainProperty } = chosenProperty;

  const { agentName, agentPhone, agentImage } = propertyAgent;

  const propertyDetailUrl = "https://example.com/properties/123";

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
        {/* // collapsible Accordion 9 */}
        <ChosenPropAccordion
          triggerTitle={"Write a Review"}
          content={
            <form className="grid grid-cols-1 justify-items-start gap-y-3 box-border pb-3">
              <Textarea
                placeholder="Messages..."
                rows={5}
                className="focus-visible:ring-0 placeholder:font-jostFont placeholder:text-lg bg-sky-50 text-slate-700 tracking-wider"
              />
              <Select name="propertyRating">
                <SelectTrigger className="py-6 bg-sky-50 text-base font-jostFont box-border text-[rgb(128,128,128)] border-slate-300 focus:outline-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Choose Rating" />
                </SelectTrigger>
                <SelectContent side="bottom">
                  <SelectGroup>
                    <SelectItem
                      value="star-1"
                      className="box-border text-[rgb(128,128,128)] font-jostFont text-base font-normal leading-[1.5]"
                    >
                      01 Star
                    </SelectItem>
                    <SelectItem
                      value="star-2"
                      className="box-border text-[rgb(128,128,128)] font-jostFont text-base font-normal leading-[1.5]"
                    >
                      02 Star
                    </SelectItem>
                    <SelectItem
                      value="star-3"
                      className="box-border text-[rgb(128,128,128)] font-jostFont text-base font-normal leading-[1.5] "
                    >
                      03 Star
                    </SelectItem>
                    <SelectItem
                      value="star-4"
                      className="box-border text-[rgb(128,128,128)] font-jostFont text-base font-normal leading-[1.5]"
                    >
                      04 Star
                    </SelectItem>
                    <SelectItem
                      value="star-5"
                      className="box-border text-[rgb(128,128,128)] font-jostFont text-base font-normal leading-[1.5]"
                    >
                      05 Star
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div>
                  <input
                    type="text"
                    className="py-3 px-3 bg-sky-50 text-base font-jostFont box-border text-[rgb(128,128,128)] focus:ring-0 focus:outline-none border-2 border-slate-200 rounded-md w-full "
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="py-3 px-3 bg-sky-50 text-base font-jostFont box-border text-[rgb(128,128,128)] focus:ring-0 focus:outline-none border-2 border-slate-200 rounded-md w-full "
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <button
                className="px-5 py-4 bg-blue-800 text-white capitalize font-jostFont font-bold rounded-md hover:bg-blue-500 transition-all duration-300 ease-linear"
                type="submit"
              >
                Submit Review
              </button>
            </form>
          }
        />
      </div>
      <div className="lg:col-span-2">
        <SaveShareCom
          shareUrl={propertyDetailUrl}
          shareTitle="Check this out!"
        />
        <AgentContact
          agentImage={agentImage}
          agentName={agentName}
          agentPhone={agentPhone}
        />
        <MortageCalculation />
        <PropertyDetailFeaturedProperty featuredProperty={featuredProperty} />
      </div>
    </div>
  );
}
