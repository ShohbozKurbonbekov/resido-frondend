import CommonAccordion from "@/app/components/accordion/Accordion";
import DetailShortInfo from "./DetailShortInfo";
import { Check, VideoOff } from "lucide-react";
import VideoPlayer from "./DetailVideoPalyer";
import LocationMap from "@/app/components/map/LocationMap";
import LightboxImages from "@/app/components/lightboxImage/LightboxImages";
import RatingBox from "@/app/components/progressBar/RatingBox";
import { useEffect, useState } from "react";
import PropertyDetailReviews from "./PropertyDetailReviews";
import moment from "moment";
import type { PropertyDetailReviewType } from "@/lib/type/property";
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

const galleryItems: string[] = [
  "/public/img/p-10.jpg",
  "/public/img/p-11.jpg",
  "/public/img/p-12.jpg",
  "/public/img/p-13.jpg",
  "/public/img/p-14.jpg",
  "/public/img/p-15.jpg",
];

export default function DetaiLMaincontent() {
  const locationUrl: string =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.30943582457!2d-79.37805805!3d43.7182412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20Ontario%2C%20Kanada!5e0!3m2!1suz!2sus!4v1754833881587!5m2!1suz!2sus";
  const videoAvailable: boolean = true;
  const [totalReviews, setTotalReviews] = useState<number>(104);
  const [allReviews] = useState<PropertyDetailReviewType[]>([
    {
      reviewDate: moment().format(`MMMM Do YYYY`),
      reviewImage: "/public/img/user-1.jpg",
      reviewName: "Rosalina Kelian",
      reviewDescription:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab. perspiciatis unde omnis iste natus error.",
    },
    {
      reviewDate: moment().format(`MMMM Do YYYY`),
      reviewImage: "/public/img/user-2.jpg",
      reviewName: "Rosalina Kelian",
      reviewDescription:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab. perspiciatis unde omnis iste natus error.",
    },
    {
      reviewDate: moment().format(`MMMM Do YYYY`),
      reviewImage: "/public/img/user-3.jpg",
      reviewName: "Rosalina Kelian",
      reviewDescription:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab. perspiciatis unde omnis iste natus error.",
    },
    {
      reviewDate: moment().format(`MMMM Do YYYY`),
      reviewImage: "/public/img/user-4.jpg",
      reviewName: "Rosalina Kelian",
      reviewDescription:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab. perspiciatis unde omnis iste natus error.",
    },
    {
      reviewDate: moment().format(`MMMM Do YYYY`),
      reviewImage: "/public/img/user-5.jpg",
      reviewName: "Rosalina Kelian",
      reviewDescription:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab. perspiciatis unde omnis iste natus error.",
    },
  ]);

  useEffect(() => {
    setTotalReviews(10);
  }, []);
  return (
    <div className="container pt-20 pb-20 grid grid-cols-1 lg:grid-cols-6 gap-5 px-6 lg:px-3">
      <div className="lg:col-span-4">
        <DetailShortInfo />
        {/* // collapsible accordion 1 */}
        <CommonAccordion
          triggerTitle={"Detail & Features"}
          content={
            <>
              <ul className="flex flex-col gap-4">
                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Bedrooms:
                  </span>
                  <span className="text-slate-400 text-sm "> 3 Beds</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Garage:
                  </span>
                  <span className="text-slate-400 text-sm "> 1</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Status:
                  </span>
                  <span className="text-slate-400 text-sm "> Active</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Kitchen Features:
                  </span>
                  <span className="text-slate-400 text-sm ">
                    {" "}
                    Kitchen Facilites
                  </span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Elevetor:
                  </span>
                  <span className="text-slate-400 text-sm "> Yes</span>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Bedrooms:
                  </span>
                  <span className="text-slate-400 text-sm "> 2 Bath</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Property Type:
                  </span>
                  <span className="text-slate-400 text-sm"> Apartment</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Cooling:
                  </span>
                  <span className="text-slate-400 text-sm "> Central A/C</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Exterior:
                  </span>
                  <span className="text-slate-400 text-sm "> FinishBrick</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Fireplace:
                  </span>
                  <span className="text-slate-400 text-sm "> Yes</span>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Areas:
                  </span>
                  <span className="text-slate-400 text-sm "> 4,240 sq ft</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Year:
                  </span>
                  <span className="text-slate-400 text-sm"> Built 1982</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Heating Type:
                  </span>
                  <span className="text-slate-400 text-sm ">
                    {" "}
                    Forced Air A/C
                  </span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Swimming Pool:
                  </span>
                  <span className="text-slate-400 text-sm "> Yes</span>
                </li>

                <li>
                  <span className="font-bold text-sm font-jostFont text-blue-800 ">
                    Free Wifi:
                  </span>
                  <span className="text-slate-400 text-sm "> No</span>
                </li>
              </ul>
            </>
          }
          classes={"flex flex-row  justify-between mt-3"}
        />
        {/* // collapsible accordion 2 */}
        <CommonAccordion
          triggerTitle={"Description"}
          content={
            <p className="leading-7 text-slate-500 font-jostFont">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          }
        />
        {/* // collapsible accordion 3 */}
        <CommonAccordion
          triggerTitle={"Detail & Features"}
          content={
            <>
              <ul className="flex flex-col gap-3">
                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm ">
                    {" "}
                    Air Conditioning
                  </span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm ">
                    {" "}
                    Laundery Room
                  </span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm ">
                    {" "}
                    Window Covering
                  </span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm "> Free WiFe</span>
                </li>
              </ul>

              <ul className="flex flex-col gap-3">
                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm ">
                    {" "}
                    Swimming Pool
                  </span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm "> Gym</span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm "> Internet</span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm "> Car Parking</span>
                </li>
              </ul>

              <ul className="flex flex-col gap-3">
                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm ">
                    {" "}
                    Centeral Heating
                  </span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm "> Alarm</span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm "> Pets Allow</span>
                </li>

                <li className="flex flex-row items-center gap-1">
                  <span className="relative p-[6px] rounded-full bg-green-100">
                    <Check className="w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600" />
                  </span>
                  <span className="text-slate-500 text-sm ">Spa & Massage</span>
                </li>
              </ul>
            </>
          }
          classes={"flex flex-row  justify-between mt-3"}
        />
        {/* // collapsible accordion 4 */}
        <CommonAccordion
          triggerTitle={"Property Video"}
          content={
            videoAvailable ? (
              <VideoPlayer />
            ) : (
              <p className="flex flex-row justify-center items-center gap-2 mt-5">
                <VideoOff className="h-6 w-6 text-slate-400" />
                <span className="italic font-semibold text-red-200 text-xl capitalize ">
                  {" "}
                  No video Available
                </span>
              </p>
            )
          }
        />
        {/* // collapsible Accordion 5 */}
        <CommonAccordion
          triggerTitle={"Floor Plan"}
          content={
            <>
              <ul className="border-2 rounded-md ">
                <li className="border-b-2 px-5 py-4 flex flex-row gap-5 items-center justify-start">
                  <span className="text-sm font-bold font-jostFont capitalize text-darkBlue">
                    First floor
                  </span>
                  <span className="py-2 px-4 bg-slate-200 font-jostFont text-sm leading-none  text-darkBlue font-light rounded-sm">
                    740 sq ft
                  </span>
                </li>

                <li className="border-b-2 px-5 py-4 flex flex-row gap-5 items-center justify-start">
                  <span className="text-sm font-bold font-jostFont capitalize text-darkBlue">
                    second floor
                  </span>
                  <span className="py-2 px-4 bg-slate-200 font-jostFont text-sm leading-none  text-darkBlue font-light rounded-sm">
                    710 sq ft
                  </span>
                </li>

                <li className=" px-5 py-4 flex flex-row gap-5 items-center justify-start">
                  <span className="text-sm font-bold font-jostFont capitalize text-darkBlue">
                    Garage floor
                  </span>
                  <span className="py-2 px-4 bg-slate-200 font-jostFont text-sm leading-none  text-darkBlue font-light rounded-sm">
                    520 sq ft
                  </span>
                </li>
              </ul>
            </>
          }
        />
        {/* // collapsible accordion */}
        <CommonAccordion
          triggerTitle={"Location"}
          content={<LocationMap mapUrl={locationUrl} />}
        />
        {/* // collapsible Accordion 6 */}
        <CommonAccordion
          triggerTitle={"Gallery"}
          content={
            <>
              <div>
                <LightboxImages
                  imageItems={galleryItems.map((item) => ({ src: item }))}
                />
              </div>
            </>
          }
        />

        {/* // Rating */}
        <RatingBox />

        {/* // collapsible Accordion 7 */}
        <CommonAccordion
          triggerTitle={`${totalReviews} Reviews`}
          content={<PropertyDetailReviews allReviews={allReviews} />}
        />

        {/* // collapsible Accordion 8 */}
        <CommonAccordion
          triggerTitle={"Nearby"}
          content={
            <PropertyDetailNearbyPlaces propertyName={"Burch Khalifa"} />
          }
        />

        {/* // collapsible Accordion 9 */}
        <CommonAccordion
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
      <div className="bg-yellow-300 lg:col-span-2">part2</div>
    </div>
  );
}
