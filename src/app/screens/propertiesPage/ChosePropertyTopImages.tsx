import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import type { Property } from "@/lib/type/property";
import { carouselAutoPlayDelay, serverAPI } from "@/lib/config";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef } from "react";

const options: EmblaOptionsType = {
  duration: 50,
  loop: true,
  align: "start",
};

interface ChosePropertyTopImagesType {
  mainProperty: Property;
}

const ChosePropertyTopImages: React.FC<ChosePropertyTopImagesType> = React.memo(
  ({ mainProperty }: ChosePropertyTopImagesType) => {
    const { images, title } = mainProperty;
    const autoPlay = useRef(
      Autoplay({ stopOnInteraction: false, delay: carouselAutoPlayDelay }),
    );

    const [carouselRef, carouselApi] = useEmblaCarousel(options, [
      autoPlay.current,
    ]);

    const scrollPrev = () => carouselApi?.scrollPrev();
    const scrollNext = () => carouselApi?.scrollNext();
    return (
      <div className="wrapper relative">
        <div
          className="overflow-hidden"
          ref={carouselRef}
          onMouseEnter={() => autoPlay.current.stop()}
          onMouseLeave={() => autoPlay.current.play()}
        >
          <div className="flex">
            {images.map((image) => {
              const imageUrl = `${serverAPI}/${image}`;
              return (
                <div className="flex-[0_0_100%] sm:flex-[0_0_50%] aspect-blogCardRatio">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full  h-full object-cover border-t-0 border-l-0 border-r-0 border-b-sky-300 border-2"
                  />
                </div>
              );
            })}
          </div>
          <div className="carousel-controls">
            <div className="embla__buttons">
              <button
                className={
                  "absolute top-1/2 -translate-y-1/2 md:left-10 p-2  rounded-md bg-white/40 hover:bg-white/60 transition-all duration-150 ease-linear left-3"
                }
                type="button"
                onClick={scrollPrev}
              >
                <ArrowLeft className={`text-slate-50 w-5 h-5`} />
              </button>
              <button
                className="absolute top-[calc(50%-2.5px)] md:right-10 p-2 rounded-md bg-white/40 hover:bg-white/60 transition-all duration-150 ease-linear  right-5"
                type="button"
                onClick={scrollNext}
              >
                <ArrowRight className={`text-slate-50 w-5 h-5`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default ChosePropertyTopImages;
