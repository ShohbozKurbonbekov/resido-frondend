import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Bed, Copy, Hotel, SquareArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency, formatPropertyArea } from "@/lib/utils";
import type { Property } from "@/lib/type/property";
import { carouselAutoPlayDelay, serverAPI } from "@/lib/config";
import React from "react";

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  duration: 40, // default 25
};

interface PropertyCardType {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardType> = React.memo(({ property }) => {
  const {
    _id: id,
    title,
    images,
    daysSinceCreated,
    sellingOption,
    address,
    propertyType,
    bedrooms,
    hall,
    kitchen,
    area,
  } = property;

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [
    Autoplay({ delay: carouselAutoPlayDelay, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => onSelect(emblaApi));
    onSelect(emblaApi);
  }, [emblaApi, onSelect]);

  return (
    <Card className="flex flex-col gap-2 shadow-none max-w-md mx-auto" key={id}>
      {/* Header images */}
      <CardHeader className="p-2 sm:p-4">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image: string, index: number) => {
                const imageUrl: string = `${serverAPI}/${image}`;
                return (
                  <div className="flex-[0_0_100%] p-1" key={index}>
                    <img
                      src={imageUrl}
                      className="h-full rounded-lg aspect-blogCardRatio"
                      alt={title}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row  gap-2 top-5 left-4  absolute">
            {/* verified sign  */}
            <span className="bg-green-500 py-1 px-3 rounded-md text-slate-50 font-bold flex flex-row gap-1 items-center">
              <img src="/img/svg/verified.svg" className="" alt="" />
              <span className="text-size_10 tracking-wide">
                {(property.author?.rank ?? "Unknown")
                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  .trim()}
              </span>
            </span>

            {/* new sign */}
            {daysSinceCreated <= 7 && (
              <span className="bg-[#a70a29] py-1 px-3 rounded-md text-slate-50 font-bold flex flex-row gap-1 items-center">
                <img src="/img/svg/moon.svg" alt="" />
                <span className="text-size_10 tracking-wide">new</span>
              </span>
            )}
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

      {/* Main Content Part */}
      <CardContent className="flex flex-col items-stretch justify-center">
        <div className="flex flex-row w-full gap-2 font-jostFont mb-1">
          <span className="py-1 px-3 bg-[#0098681A] text-darkBlue text-xs rounded-sm font-bold ">
            {sellingOption.optionRent?.type ?? sellingOption.optionSell?.type}
          </span>
          <span className="py-1 px-3 bg-[#3846411a] text-blue-600 text-size_10 rounded-sm font-bold ">
            {propertyType.toUpperCase()}
          </span>
        </div>
        <h3 className="text-darkBlue font-bold font-jostFont text-xl mb-1 w-full truncate">
          {title}
        </h3>
        <p className="text-stone-400 flex flex-row  items-center gap-1 mb-2 text-sm sm:text-base font-jostFont">
          <img src="/img/svg/map-1.svg" alt="map logo" />
          {`${address?.street}, ${address?.city}, ${address?.country}`}
        </p>
        <div className=" w-full flex flex-row justify-between items-center text-stone-400 text-xs sm:text-sm font-jostFont mb-3">
          <span className="flex flex-row gap-1 items-center">
            <Hotel className="bg-blue-100 box-content h-4 w-4 p-1 rounded-full border-2" />
            <span className="text-xs">
              {bedrooms}B{hall}H{kitchen}K
            </span>
          </span>

          <span className="flex flex-row gap-1 items-center">
            <Bed className="bg-blue-100 box-content p-1 w-4 h-4 rounded-full border-2" />
            <span className="text-xs">{bedrooms} Beds</span>
          </span>

          <span className="flex flex-row gap-1 items-center">
            <Copy className="bg-blue-100 box-content  p-1 w-4 h-4 rounded-full border-2" />
            <span className="">{formatPropertyArea(area)}</span>
          </span>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <span className="text-darkBlue text-2xl font-jostFont font-bold">
            {formatCurrency(
              (sellingOption?.optionRent?.overalAmount ??
                sellingOption?.optionSell?.overalAmunt)!,
              "USD",
            )}
          </span>
          <Link to={`/property/${id}`}>
            <SquareArrowUpRight className="h-5 w-5 rounded-full bg-slate-100 p-2  transition-all duration-200 ease-in-out text-blue-800  hover:scale-110 hover:bg-slate-200 box-content" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
});
export default PropertyCard;
