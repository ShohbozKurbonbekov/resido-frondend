import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TitleContentSection from "@/app/components/TitleContentSection";
import { OUR_MEMBERS } from "@/app/data/contactUs";
import SocialsNetwork from "@/app/components/SocialsNetwork";

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
  duration: 40,
};

interface MeetTeamType {
  title: string;
  subtitle: string;
}

// -------------------------------------------- COMPONENT ----------------------------
export default function MeetTeam({ title, subtitle }: MeetTeamType) {
  const autoPlay = useRef(Autoplay());
  const [emblaRef, carouselApi] = useEmblaCarousel(carouselOptions, [
    autoPlay.current,
  ]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [allCarouselNumbers, setAllCarouselNumbers] = useState<number[]>([]);
  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setCarouselIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setAllCarouselNumbers(() => carouselApi.scrollSnapList());
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, onSelect]);

  // -------------------------------------------- HANDLERS ----------------------------

  const scrollTo = useCallback(
    (index: number) => carouselApi && carouselApi.scrollTo(index),
    [carouselApi]
  );

  // -------------------------------------------- RENDER ----------------------------
  return (
    <TitleContentSection
      sectionTitle={
        <>
          {/* background image */}
          <img
            src="/img/pattern.png"
            className="inset-0 absolute object-cover w-full h-full -z-10"
            alt="section-pattern background"
          />
          <div className="container">
            <div className="flex flex-col space-y-2 items-center mb-12">
              <h2 className="text-3xl font-jostFont text-darkBlue font-bold leading-tight capitalize">
                {title}
              </h2>
              <p className="leading-onePointEight mb-1.5 capitalize font-jostFont">
                {subtitle}
              </p>
            </div>
          </div>
        </>
      }
      sectionContent={
        <div className="container">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {OUR_MEMBERS?.map((member) => (
                <div
                  key={member.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] p-2"
                >
                  <Card className="relative z-10 ">
                    <CardHeader className="flex flex-row items-center justify-center">
                      <img
                        src={member.photoUrl}
                        alt={member.memberName}
                        className="h-28 w-28 rounded-full"
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-y-1">
                      <h3 className="text-lg font-bold capitalize text-darkBlue font-jostFont leading-tight">
                        {member.memberName}
                      </h3>
                      <p className="text-slate-400 text-sm font-light font-jostFont capitalize">
                        {member.memberRole}
                      </p>

                      {/* social links */}
                      <SocialsNetwork networks={member.socialLinks} />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* // dots */}
          <div className="items-center flex justify-center w-full mt-5 gap-3">
            {allCarouselNumbers.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === carouselIndex
                    ? "bg-gray-500 scale-110 shadow-[0_0_0_3px_rgba(0,0,0,0.2)]"
                    : "bg-gray-300 shadow-none"
                }`}
              ></button>
            ))}
          </div>
        </div>
      }
      sectionClass={"py-20 w-full bg-sky-50 relative"}
    />
  );
}
