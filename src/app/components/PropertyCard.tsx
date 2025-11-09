import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Bed, Copy, Hotel } from "lucide-react";
import { Link } from "react-router-dom";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency, formatPropertyArea } from "@/lib/utils";
import type { Property } from "@/lib/type/property";
import { carouselAutoPlayDelay, serverAPI } from "@/lib/config";

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  duration: 40, // default 25
};

interface PropertyCardType {
  property: Property;
}

export default function PropertyCard(props: PropertyCardType) {
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
  } = props.property;

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
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => onSelect(emblaApi));
    onSelect(emblaApi);
  }, [emblaApi, onSelect]);

  return (
    <Card className="h-full w-full shadow-none" key={id} id={id}>
      {/* Header images */}
      <CardHeader className="pb-3">
        <div className=" flex flex-col  max-h-[260px] relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image: string, index: number) => {
                const imageUrl: string = `${serverAPI}/${image}`;
                return (
                  <div className="flex-[0_0_100%]" key={index}>
                    <img
                      src={imageUrl}
                      className="h-full rounded-md"
                      alt={title}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card-header-description flex flex-row  gap-2 top-5 left-4  absolute">
            {/* verified sign  */}
            <span className="bg-[#009868] py-1 px-3 rounded-md text-slate-50 font-bold flex flex-row gap-1 items-center">
              <img src="/img/svg/verified.svg" className="" alt="" />
              <span className="text-[10px] tracking-wide">
                {props.property.author?.rank}
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
      <CardContent className="flex flex-col items-start justify-center">
        <div className="flex flex-row w-full gap-4 font-jostFont mb-1">
          <span className="py-1 px-3 bg-[#0098681A] text-darkBlue text-xs rounded-sm font-bold ">
            {sellingOption.optionRent?.type ?? sellingOption.optionSell?.type}
          </span>
          <span className="py-1 px-3 bg-[#3846411a] text-blue-600 text-xs rounded-sm font-bold ">
            {propertyType.toUpperCase()}
          </span>
        </div>
        <h3 className="text-darkBlue font-bold font-jostFont text-xl mb-1">
          {title}
        </h3>
        <p className="text-stone-400 flex flex-row  items-center gap-1 mb-2">
          <img src="/img/svg/map-1.svg" alt="map logo" />
          {`${address?.street}, ${address?.city}, ${address?.country}`}
        </p>
        <div className=" w-full flex flex-row justify-between items-center text-stone-400 text-sm font-jostFont mb-3">
          <span className="flex flex-row gap-1 items-center">
            <Hotel
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>
              {bedrooms}B{hall}H{kitchen}K
            </span>
          </span>

          <span className="flex flex-row gap-1 items-center">
            <Bed
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>{bedrooms} Beds</span>
          </span>

          <span className="flex flex-row gap-1 items-center">
            <Copy
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span className="">{formatPropertyArea(area)}</span>
          </span>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <span className="text-darkBlue text-2xl font-jostFont font-bold">
            {formatCurrency(
              (sellingOption?.optionRent?.overalAmount ??
                sellingOption?.optionSell?.overalAmunt)!,
              "USD"
            )}
          </span>
          <Link to={`${serverAPI}/property/${id}`}>
            <img src="/img/svg/send.svg" alt="reference" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
