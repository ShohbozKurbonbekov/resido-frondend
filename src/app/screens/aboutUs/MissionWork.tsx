import TitleContentSection from "@/app/components/TitleContentSection";
import type { CommonSectionType } from "@/lib/type/about-us";
import { Group, LockKeyholeOpen, Twitter } from "lucide-react";
import MissionWorkCard from "./MissionWorkCard";

export default function MisionWork({ title, subtitle }: CommonSectionType) {
  return (
    <TitleContentSection
      sectionTitle={
        <div className="container">
          <div className="flex flex-col space-y-2 items-center mb-12">
            <h2 className="text-3xl font-jostFont text-darkBlue font-bold leading-tight capitalize">
              {title}
            </h2>
            <p className="leading-[1.7] mb-[5px] capitalize font-jostFont">
              {subtitle}
            </p>
          </div>
        </div>
      }
      sectionContent={
        <>
          <div className="container grid grid-cols-1 md:grid-cols-2  gap-5 justify-items-start items-center">
            <div className="left-wrapper flex flex-col space-y-5 w-full">
              <MissionWorkCard
                title={"Fully Secure & 24x7 Dedicated Support"}
                subtitle={
                  "If you are an individual client, or just a business startup looking for good backlinks for your website"
                }
                logo={
                  <LockKeyholeOpen className="w-12 h-[55px] fill-blue-700 stroke-blue-700" />
                }
              />
              <MissionWorkCard
                title={"Manage your Social & Busness Account Carefully"}
                subtitle={
                  "If you are an individual client, or just a business startup looking for good backlinks for your website."
                }
                logo={
                  <Twitter className="w-12 h-[55px] fill-blue-700 stroke-blue-700" />
                }
              />
              <MissionWorkCard
                title={"We are Very Hard Worker and loving"}
                subtitle={
                  "If you are an individual client, or just a business startup looking for good backlinks for your website"
                }
                logo={
                  <Group className="w-12 h-[55px] fill-blue-700 stroke-blue-700" />
                }
              />
            </div>
            <div className="w-full">
              <img
                src="/public/img/vec-2.png"
                alt=""
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
