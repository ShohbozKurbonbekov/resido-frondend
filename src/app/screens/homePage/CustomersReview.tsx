import { useCallback, useEffect, useState } from "react";
import PreviewCard from "./PreviewCard";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import NoFound from "@/app/components/NoFound";

const carouselOptions: EmblaOptionsType = {
  loop: true,
  duration: 60,
  align: "start",
};

const CustomersReview: React.FC = () => {
  const [carouselRef, carouselApi] = useEmblaCarousel(carouselOptions, [
    AutoScroll({
      playOnInit: true,
    }),
  ]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const toggleAutoPlay = useCallback(() => {
    const autoScroll = carouselApi?.plugins()?.autoScroll;
    console.log(autoScroll);
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;

    playOrStop();
  }, [carouselApi]);

  useEffect(() => {
    const autoScroll = carouselApi?.plugins()?.autoScroll;

    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    carouselApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [carouselApi]);

  return (
    <section className="customersReview py-20  bg-[url(/img/pattern.png)] bg-slate-200 flex  flex-row justify-center">
      <div className="container flex flex-col gap-10">
        <div className="section-heading max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-[1.2] text-3xl">
            Good Reviews by Customers
          </h2>
          <p className="mb-2 leading-[1.7] text-center">
            Hear from our satisfied clients who have experienced exceptional
            service and seamless property transactions with our team.
          </p>
        </div>

        {[1, 3, 4, 5].length ? (
          <div className="wrapper w-full">
            <div className="overflow-hidden" ref={carouselRef}>
              <div className="flex touch-pan-y touch-pinch-zoom ">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => (
                  <div
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.3333%] lg:flex-[0_0_25%] px-1.5"
                    key={index}
                  >
                    <PreviewCard />
                  </div>
                ))}
              </div>
            </div>

            {/* // start button */}
            <div className="mt-10 w-full flex flex-row items-center justify-center">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-slate-100  text-slate-400 font-bold hover:bg-slate-50  hover:scale-110 transition-all duration-150 ease-in-out"
                onClick={toggleAutoPlay}
              >
                {isPlaying ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        ) : (
          <NoFound title="no customer's preview found" borderColor="#fff" />
        )}
      </div>
    </section>
  );
};

export default CustomersReview;
