import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/app/carousel/CarouselArrowButtons";
import type { EmblaOptionsType } from "embla-carousel";

const options: EmblaOptionsType = {
  duration: 60,
  loop: true,
  slidesToScroll: 1,
  align: "start",
};

export default function DetailTopImage() {
  const [carouselRef, carouselApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true }),
  ]);

  // Carousel processes
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(carouselApi);
  return (
    <div className="wrapper relative">
      <div className="overflow-hidden  h-full" ref={carouselRef}>
        <div className="flex w-full touch-pan-y touch-action: pinch-zoom">
          <div className="flex-[0_0_50%] h-full">
            <img src="/img/p-1.jpg" alt="" className="w-full  h-full" />
          </div>
          <div className="flex-[0_0_50%]">
            <img src="/public/img/p-10.jpg" alt="" className="w-full" />
          </div>
          <div className="flex-[0_0_50%]">
            <img src="/img/p-1.jpg" alt="" className="w-full" />
          </div>
          <div className="flex-[0_0_50%]">
            <img src="/public/img/p-10.jpg" className="w-full" alt="" />
          </div>
        </div>
        <div className="carousel-controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="text-slate-50 w-5 h-5 "
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="text-slate-50 w-5 h-5 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
