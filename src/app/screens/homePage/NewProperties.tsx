"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import PropertyCard from "../../components/PropertyCard";
import NoFound from "@/app/components/NoFound";
import { retrieveRecentRentProperties } from "./selector";
import type { Property } from "@/lib/type/property";

// -------------------- REDUX SELECTOR --------------------
const recentRentPropertiesRetriever = createSelector(
  retrieveRecentRentProperties,
  (recentRentProperties) => ({ recentRentProperties })
);

// -------------------- EMBLA OPTIONS --------------------
const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  duration: 35, // smoother transitions
};

// -------------------- COMPONENT --------------------
export default function NewProperties() {
  const { recentRentProperties } = useSelector(recentRentPropertiesRetriever);

  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setSelectedIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // -------------------- RENDER --------------------
  return (
    <section className="pt-0 pb-20">
      <div className="container flex flex-col gap-12 items-center">
        {/* TITLE */}
        <div className="max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue">
          <h2 className="font-bold capitalize font-jostFont leading-tight text-3xl">
            Recent Properties for Rent
          </h2>
          <p className="mb-2 leading-[1.8] text-center">
            Find your next home from our most recent listings and Don't regret
            with havig it later
          </p>
        </div>

        {recentRentProperties.properties.length ? (
          <div className="carousel-wrapper relative w-full">
            <div
              className="overflow-hidden"
              ref={emblaRef}
              onMouseEnter={() => autoplay.current.stop()}
              onMouseLeave={() => autoplay.current.play()}
            >
              <div className="flex">
                {recentRentProperties.properties.map(
                  (property: Property, index) => (
                    <div
                      key={index}
                      className="
                        flex-[0_0_100%]
                        sm:flex-[0_0_50%]
                        lg:flex-[0_0_33.333%]
        
                        p-3

                      "
                    >
                      <PropertyCard property={property} />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-6 gap-3">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-gray-800 scale-110 shadow-md"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                ></button>
              ))}
            </div>

            {/* ARROWS */}
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow-md p-2 hidden sm:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow-md p-2 hidden sm:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <NoFound />
        )}
      </div>
    </section>
  );
}
