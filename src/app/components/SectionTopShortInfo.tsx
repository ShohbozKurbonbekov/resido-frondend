import {
  defaultAgencyAvatar,
  defaultUserAvatar,
  serverAPI,
} from "@/lib/config";
import React from "react";

import type { SocialsPlatform } from "@/lib/type/common";
import SocialsNetwork from "./SocialsNetwork";

// --------------------------------------------------- COMPONENT ------------------------------------
interface SectionTopShortInfoDataType {
  role: string;
  avatar: string | undefined;
  name: string;
  address: string;
  bioInfo: string;
  totalProperties: number | string;
  socialLinks: Record<SocialsPlatform, string | null>;
}

interface SectionTopShortInfoType {
  data: SectionTopShortInfoDataType;
}

const SectionTopShortInfo: React.FC<SectionTopShortInfoType> = React.memo(
  ({ data }) => {
    const {
      avatar,
      name,
      address,
      bioInfo,
      totalProperties,
      socialLinks,
      role,
    } = data;

    const imgUrl = avatar
      ? `${serverAPI}/${avatar}`
      : role === "agency"
        ? defaultAgencyAvatar
        : defaultUserAvatar;

    const imgEl = (
      <img
        src={imgUrl}
        loading="lazy"
        alt={name || "agent picture here"}
        className="w-full lg:w-full lg:h-full  h-10/12 rounded-lg object-cover "
      />
    );

    // -------------------------------------------- HANDLERS ------------------------------------

    // --------------------------------------------------- RENDERS ------------------------------------
    return (
      <section className="agent-shortInfo bg-sky-100 pt-0 pb-14">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[min(19.3vw,288.500px)_1fr] lg:gap-x-10 grid-cols-1 box-border bg-white rounded-md -mt-10  relative z-10">
            <div className="p-4 flex flex-row item-center justify-center">
              {imgEl}
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2 py-5 px-10 lg:p-[30px_20px_20px_0]">
              {/* Agent name */}
              <div className="flex flex-col items-start space-y-1">
                <h4 className="font-bold text-darkBlue font-jostFont capitalize text-lg">
                  {name || "N/A"}
                </h4>
                <span className="text-size_15 text-slate-400 font-light font-jostFont ps-1">
                  {address || "N/A"}
                </span>
              </div>

              {/* Agent Description */}
              <p className="leading-7 text-slate-400 text-size_15 font-jostFont">
                {bioInfo || "N/A"}
              </p>

              {/* Agent Property Amount */}
              <div className="py-1 px-4 bg-green-600 text-white text-size_10 font-jostFont rounded-sm">
                {totalProperties ?? 0} Properties
              </div>

              {/* Social contacts */}
              <SocialsNetwork networks={socialLinks} />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default SectionTopShortInfo;
