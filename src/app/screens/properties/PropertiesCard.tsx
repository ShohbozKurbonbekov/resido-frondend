import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  Bed,
  Copy,
  Hotel,
  MailPlus,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const options: EmblaOptionsType = {
  duration: 30,
  loop: true,
  align: "start",
  slidesToScroll: 1,
};
export default function Properties() {
  const [liked, setLiked] = useState(false);
  const [carouselRef, carouselApi] = useEmblaCarousel(options, [Autoplay()]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [AllSlideNumbers, setAllSlideNumbers] = useState<number[]>([]);

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setCarouselIndex(carouselApi.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => carouselApi && carouselApi.scrollTo(index),
    [carouselApi]
  );

  useEffect(() => {
    if (!carouselApi) return;
    setAllSlideNumbers(carouselApi.scrollSnapList());
    carouselApi.on("select", () => onSelect(carouselApi));
    onSelect(carouselApi);
  }, [carouselApi, onSelect]);

  return (
    <Card className="grid grid-cols-5 shadow-none">
      <CardHeader className="col-span-2 p-2 md:pr-2">
        <div className="f-full relative">
          <div className="wrapper">
            <div className="overflow-hidden" ref={carouselRef}>
              <div className="flex">
                {/* // slide  1 */}
                <div className="flex-[0_0_100%]">
                  <img
                    src="/img/p-1.jpg"
                    alt=""
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
                <div className="flex-[0_0_100%]">
                  <img
                    src="/img/p-10.jpg"
                    alt=""
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
                <div className="flex-[0_0_100%]">
                  <img
                    src="/img/p-14.jpg"
                    alt=""
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              </div>
            </div>

            {/* // dots */}
            <div className="absolute bottom-1 flex justify-center w-full mt-4 gap-1">
              {AllSlideNumbers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === carouselIndex
                      ? "bg-green-600 scale-110"
                      : "bg-gray-50"
                  }`}
                ></button>
              ))}
            </div>
          </div>
          <div className="absolute top-1 sm:top-3 md:top-2  lg:top-4 flex flex-row w-full items-start justify-between px-3">
            <span className="px-3 py-2 bg-green-600 text-white font-semibold text-xs md:text-size_10 lg:text-sm rounded-sm flex flex-row  items-center gap-1 ">
              <ShieldCheck className="w-3 h-3 " />
              <span className="leading-none">Verified</span>
            </span>
            <motion.button
              whileTap={{ scale: 1.5 }}
              onClick={() => setLiked(!liked)}
            >
              <Heart
                className={`w-5 lg:w-7  h-5 lg:h-7 ${
                  liked
                    ? "fill-red-500 text-red-500 "
                    : "fill-white stroke-white "
                }`}
              />
            </motion.button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="col-span-3 pt-2 pr-2 pb-2 pl-0 lg:pl-2 flex flex-col space-y-3">
        <div className="flex flex-row">
          <span className="flex flex-row space-x-1 ">
            <span
              className="text-sm  sm:text-xs md:text-size_10 lg:text-sm py-2 px-3 md:py-1 md:mx-2 lg:py-2 lg:px-3 bg-green-100 text-green-600 capitalize rounded-sm font-bold "
              style={{ margin: 0 }}
            >
              For Rent
            </span>
            <span className="text-sm sm:text-xs md:text-size_10 lg:text-sm py-2 px-3 md:py-1 md:mx-2 lg:py-2 lg:px-3 capitalize bg-blue-100 text-blue-600 rounded-sm font-bold">
              Apartment
            </span>
          </span>
          <h4 className="font-bold text-blue-900 text-xs md:text-sm font-jostFont flex-1 lg:text-2xl text-end">
            $80,0000
          </h4>
        </div>
        <h5 className="font-bold font-jostFont text-blue-900 text-xs md:text-size_10 lg:text-xl">
          4789 Resot Relly Market, Montreal Canada, HAQC445
        </h5>

        <div className=" w-full flex flex-row justify-between items-center text-stone-400 text-[13.5px] font-jostFont my-3">
          <span className="flex flex-row gap-1 items-center">
            <Hotel className="bg-blue-100 box-content rounded-full border-1 p-2  h-[17px] md:h-[12px] lg:h-[20px] w-[17px] md:w-[12px] lg:w-[20px]" />
            <span>3BHK</span>
          </span>
          <span className="flex flex-row gap-1 items-center">
            <Bed className="bg-blue-100 box-content  rounded-full border-1 p-2  h-[17px] md:h-[12px] lg:h-[20px] w-[17px] md:w-[12px] lg:w-[20px]" />
            <span>3 Beds</span>
          </span>

          <span className="flex flex-row gap-1 items-center">
            <Copy className="bg-blue-100 box-content rounded-full border-1 p-2  h-[17px] md:h-[12px] lg:h-[20px] w-[17px] md:w-[12px] lg:w-[20px]" />
            <span className="">1800 SQFT</span>
          </span>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <button className="px-4 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 bg-blue-900 text-white  rounded focus-visible:ring-0 flex flex-row justify-center items-center hover:bg-blue-700 transition-colors duration-150 ease-in gap-1 w-full col-span-2">
            <ShieldCheck className="h-5 w-5 lg:h-7 lg:w-7 " />
            <Link
              to=""
              className="hover:no-underline text-xs md:text-size_10 lg:text-sm text-white font-jostFont"
            >
              Availabilty
            </Link>
          </button>

          <button className="px-4 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 bg-sky-100 text-blue-900  rounded focus-visible:ring-0 flex flex-row justify-center items-center hover:bg-blue-900 transition-colors duration-150 ease-in gap-1 hover:text-white w-full col-span-1">
            <Smartphone className="h-5 w-5 lg:h-7 lg:w-7 " />
          </button>

          <button className="px-4 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 bg-sky-100 text-blue-900  rounded focus-visible:ring-0 flex flex-row justify-center items-center hover:bg-blue-900 transition-colors duration-150 ease-in gap-1 hover:text-white w-full col-span-1">
            <MailPlus className="h-5 w-5 lg:h-7 lg:w-7 " />
          </button>

          <button className="px-4 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 bg-sky-100 text-blue-900  rounded focus-visible:ring-0 flex flex-row justify-center items-center hover:bg-blue-900 transition-colors duration-150 ease-in gap-1 hover:text-white w-full col-span-1">
            <Heart className="h-5 w-5 lg:h-7 lg:w-7 stroke-blue-900 fill-emerald-900 hover:fill-slate-50" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
