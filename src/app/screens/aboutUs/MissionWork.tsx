import TitleContentSection from "@/app/components/TitleContentSection";
import type { CardsContentType, TeamMemberType } from "@/lib/type/about-us";
import MissionWorkCard from "./MissionWorkCard";
import { CARDS_DATA } from "@/app/data/aboutUs";

const iconClasses = "w-12 h-14 fill-blue-700 stroke-blue-700";
interface CommonSectionType {
  title: string;
  subtitle: string;
  members?: TeamMemberType[] | undefined;
}
export default function MisionWork({ title, subtitle }: CommonSectionType) {
  return (
    <TitleContentSection
      sectionTitle={
        <div className="container">
          <div className="flex flex-col space-y-2 items-center mb-12">
            <h2 className="text-3xl font-jostFont text-darkBlue font-bold leading-tight capitalize">
              {title}
            </h2>
            <p className="leading-onePointEight mb-1 capitalize font-jostFont">
              {subtitle}
            </p>
          </div>
        </div>
      }
      sectionContent={
        <>
          <div className="container grid grid-cols-1 md:grid-cols-2  gap-5 justify-items-start items-center">
            <div className="left-wrapper flex flex-col space-y-5 w-full">
              {CARDS_DATA.map((card: CardsContentType, index: number) => (
                <MissionWorkCard
                  key={index}
                  title={card.cardTitle}
                  subtitle={card.cardSubtitle}
                  logo={<card.Icon className={iconClasses} />}
                />
              ))}
            </div>
            <div className="w-full">
              <img
                src="/img/vec-2.png"
                alt="background image"
                className="w-full object-cover"
              />
            </div>
          </div>
        </>
      }
      sectionClass={"py-20 w-full"}
    />
  );
}
