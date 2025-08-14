import React, {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean; // true  => false
  nextBtnDisabled: boolean; // true  => false
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePrevNextButtons = (
  carouselApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollPrev();
  }, [carouselApi]);

  const onNextButtonClick = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollNext();
  }, [carouselApi]);

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!carouselApi.canScrollPrev());
    setNextBtnDisabled(!carouselApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    onSelect(carouselApi);
    carouselApi.on("reInit", onSelect).on("select", onSelect);
  }, [carouselApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      className={
        "absolute top-[calc(50%-2.5px)] md:left-10 p-2 rounded-md bg-white/40 hover:bg-white/60 transition-all duration-150 ease-linear left-5"
      }
      type="button"
      {...restProps}
    >
      <ArrowLeft className={`${className}`} />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      className="absolute top-[calc(50%-2.5px)] md:right-10 p-2 rounded-md bg-white/40 hover:bg-white/60 transition-all duration-150 ease-linear  right-5"
      type="button"
      {...restProps}
    >
      <ArrowRight className={`${className}`} />
      {children}
    </button>
  );
};
