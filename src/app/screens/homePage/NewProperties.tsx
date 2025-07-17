import { useCallback, useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import NoFound from "@/app/components/NoFound";

const carouselOptions: EmblaOptionsType = {
  loop: true,
  duration: 55,
  align: "center",
};

export default function NewProperties() {
  //Building states for caard Carousel
  const [cardCarouselRef, carouselApi] = useEmblaCarousel(carouselOptions, [
    Autoplay(),
  ]);
  const [carouselIndex, setCarouselIndex] = useState<number>();
  const [allCarouselNumbers, setAllCarouselNumbers] = useState<number[]>();
  const [newProperties] = useState<number[]>([1, 2, 3]);

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setCarouselIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setAllCarouselNumbers(() => carouselApi.scrollSnapList());
    carouselApi.on("select", () => onSelect(carouselApi));
  }, [carouselApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      carouselApi?.scrollTo(index);
    },
    [carouselApi]
  );
  return (
    <section className="new-properties pt-0 pb-20">
      <div className="container flex flex-col gap-12 items-center">
        <div className="section-heading max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue">
          <h2 className="font-bold capitalize font-jostFont leading-[1.2] text-3xl">
            recent property for rent
          </h2>
          <p className="mb-2 leading-[1.7] text-center">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
        </div>

        {/* if there is no property */}
        {newProperties.length ? (
          <div className="carousel-wrapper">
            <div className="overflow-hidden" ref={cardCarouselRef}>
              <div className="flex">
                {/* // 3-way slide-1 */}
                <div className="flex-[0_0_100%]">
                  <div className="w-full  grid grid-cols-2 lg:grid-cols-3  gap-4 place-items-center ">
                    {[1, 2, 3].map((_, index) => {
                      return <PropertyCard key={index} />;
                    })}
                  </div>
                </div>

                {/* // 3-way slide-2 */}
                <div className="flex-[0_0_100%]">
                  <div className="w-full  grid grid-cols-2 lg:grid-cols-3  gap-4 place-items-center ">
                    {[1, 2, 3].map((_, index) => {
                      return <PropertyCard key={index} />;
                    })}
                  </div>
                </div>

                {/* // 3-way slide-3 */}
                <div className="flex-[0_0_100%]">
                  <div className="w-full  grid grid-cols-2 lg:grid-cols-3  gap-4 place-items-center ">
                    {[1, 2, 3].map((_, index) => {
                      return <PropertyCard key={index} />;
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* DOTS */}
            <div className="pt-10 w-full flex flex-row items-center justify-center gap-3">
              {[0, 1, 3].map((_, index: number) => {
                return (
                  <button
                    className={`h-[10px] w-[10px] rounded-full   transition-all ${
                      index === carouselIndex
                        ? "bg-gray-600 scale-110 shadow-md shadow-gray-200"
                        : "bg-gray-400 shadow-none"
                    }`}
                    key={index}
                    onClick={() => scrollTo(index)}
                  ></button>
                );
              })}
            </div>
          </div>
        ) : (
          <NoFound title="no new Properties found !" />
        )}
      </div>
    </section>
  );
}
