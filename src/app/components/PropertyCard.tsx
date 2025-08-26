import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Bed, Copy, Hotel } from "lucide-react";
import { Link } from "react-router-dom";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import type { T } from "@/lib/type/common";
import { formatCurrency, formatPropertyArea } from "@/lib/utils";

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "center",
  duration: 25, // default 25
};
interface PropertyCardType {
  property: T;
}

export default function PropertyCard(props: PropertyCardType) {
  const { property } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [Autoplay()]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => onSelect(emblaApi));
    onSelect(emblaApi);
  }, [emblaApi, onSelect]);

  return (
    <Card className="h-auto w-full shadow-none">
      <CardHeader className="pb-3">
        <div className="card-header-wrapper flex flex-col  max-h-[260px] relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {/* slide 1 */}
              <div className="flex-[0_0_100%]">
                <img
                  src={property.propertyImages[0]}
                  className="h-full rounded-md"
                  alt={property.propertyName}
                />
              </div>

              {/* slide 2 */}
              <div className="flex-[0_0_100%]">
                <img
                  src={property.propertyImages[1]}
                  className="h-full rounded-md"
                  alt={property.propertyName}
                />
              </div>

              {/* slide - 3 */}
              <div className="flex-[0_0_100%]">
                <img
                  src={property.propertyImages[2]}
                  className="h-full rounded-md"
                  alt={property.propertyName}
                />
              </div>
            </div>
          </div>
          <div className="card-header-description flex flex-row  gap-2 top-[20px] left-[15px]  absolute">
            {/* verified sign  */}
            <span className="bg-[#009868] py-1 px-3 rounded-md text-slate-50 font-bold flex flex-row gap-1 items-center">
              <img src="/img/svg/verified.svg" className="" alt="" />
              <span className="text-[10px] tracking-wide">
                {property.propertyStatus}
              </span>
            </span>

            {/* new sign */}
            <span className="bg-[#a70a29] py-1 px-3 rounded-md text-slate-50 font-bold flex flex-row gap-1 items-center">
              <img src="/img/svg/moon.svg" alt="" />
              <span className="text-[10px] tracking-wide">new</span>
            </span>
          </div>

          {/* DOTS */}
          <div className="flex justify-center mt-4 gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-center">
        <div className="flex flex-row w-full gap-4 font-jostFont mb-1">
          <span className="py-1 px-3 bg-[#0098681A] text-darkBlue text-[12px] rounded-sm font-bold ">
            {property.propertyMarketStatus}
          </span>
          <span className="py-1 px-3 bg-[#3846411a] text-blue-600 text-[12px] rounded-sm font-bold ">
            {property.propertyType}
          </span>
        </div>
        <h3 className="text-darkBlue font-bold font-jostFont text-xl mb-1">
          {property.propertyName}
        </h3>
        <p className="text-stone-400 flex flex-row  items-center gap-1 mb-2">
          <img src="/img/svg/map-1.svg" alt="" />
          {property.propertyLocation}
        </p>
        <div className=" w-full flex flex-row justify-between items-center text-stone-400 text-[13.5px] font-jostFont mb-3">
          <span className="flex flex-row gap-1 items-center">
            <Hotel
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>
              {property.PropertyBedroom}B{property.propertyHall}H
              {property.propertyKitchen}K
            </span>
          </span>
          <span className="flex flex-row gap-1 items-center">
            <Bed
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>{property.PropertyBedroom} Beds</span>
          </span>

          <span className="flex flex-row gap-1 items-center">
            <Copy
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span className="">
              {formatPropertyArea(property.propertyArea)}
            </span>
          </span>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <span className="text-darkBlue text-2xl font-jostFont font-bold">
            {formatCurrency(property.propertyPrice, "USD")}
          </span>
          <Link to="/properties/detail">
            <img src="/img/svg/send.svg" alt="" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
