import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import NoFound from "@/app/components/NoFound";
import Autoplay from "embla-carousel-autoplay";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveLatestComments } from "./selector";
import type { Comment } from "@/lib/type/comment";
import { carouselAutoPlayDelay } from "@/lib/config";
import PreviewCard from "./PreviewCard";
import { handleCarouselCards } from "@/lib/utils";

// --------------------- REDUX SELECTOR ----------------------
const latestCommentsRetriever = createSelector(
  retrieveLatestComments,
  (latestComments) => ({ latestComments }),
);

const carouselOptions: EmblaOptionsType = {
  loop: true,
  duration: 35,
  align: "start",
};

// ------------------------ COMPONENT ---------------------

const CustomersReview: React.FC = () => {
  const { latestComments } = useSelector(latestCommentsRetriever);
  // ------------------- CAROUSEL ------------------------
  const autoPlay = useRef(
    Autoplay({ delay: carouselAutoPlayDelay, stopOnInteraction: false }),
  );

  const [carouselRef, carouselApi] = useEmblaCarousel(carouselOptions, [
    autoPlay.current,
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setScrollSnaps(carouselApi.scrollSnapList());
    carouselApi.on("select", () => onSelect(carouselApi));
  }, [onSelect, carouselApi]);

  const scrollTo = useCallback(
    (index: number) => carouselApi?.scrollTo(index),
    [carouselApi],
  );

  const width = window.innerWidth;
  const visibleCards = handleCarouselCards(Number(width));
  const shouldScroll = latestComments.length > visibleCards;

  const scrollPrev = () => carouselApi?.scrollPrev();
  const scrollNext = () => carouselApi?.scrollNext();

  // -------------------------- RENDER -----------------------
  return (
    <section className="py-20  bg-[url(/img/pattern.png)] bg-slate-200 flex  flex-row justify-center">
      <div className="container flex flex-col gap-10">
        <div className="max-w-xl flex flex-col items-center gap-y-2 text-darkBlue mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-tight text-3xl text-center">
            Good Reviews by Customers
          </h2>
          <p className="mb-2 leading-onePointEight text-center">
            Hear from our satisfied clients who have experienced exceptional
            service and seamless property transactions with our team.
          </p>
        </div>

        {latestComments.length ? (
          <div className="w-full relative">
            <div
              className="overflow-hidden"
              ref={carouselRef}
              onMouseEnter={() => autoPlay.current.stop()}
              onMouseLeave={() => autoPlay.current.play()}
            >
              <div className="flex touch-pan-y touch-pinch-zoom ">
                {latestComments.map((comment: Comment) => (
                  <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-3">
                    <PreviewCard comment={comment} />
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}
            {shouldScroll && (
              <div className="flex justify-center mt-6 gap-3">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-gray-800 scale-110 shadow-md"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  ></button>
                ))}
              </div>
            )}

            {/* ARROWS */}
            {shouldScroll && (
              <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 -translate-y-[70%] bg-white/70 hover:bg-white rounded-full shadow-md p-2 hidden sm:flex"
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
            )}

            {shouldScroll && (
              <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 -translate-y-[70%] bg-white/70 hover:bg-white rounded-full shadow-md p-2 hidden sm:flex"
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
            )}
          </div>
        ) : (
          <NoFound />
        )}
      </div>
    </section>
  );
};

export default CustomersReview;
