import { defaultUserAvatar, serverAPI } from "@/lib/config";
import type { AgentData } from "@/lib/type/agent";
import React, { useMemo } from "react";
import {
  Facebook,
  Linkedin,
  Mail,
  Instagram,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import type { T } from "@/lib/type/common";

interface SocialsIconType {
  Icon: LucideIcon;
}
type SocialsPlatform =
  | "facebook"
  | "email"
  | "instagram"
  | "linkedin"
  | "twitter";

const IconsObj: Record<SocialsPlatform, SocialsIconType> = {
  facebook: { Icon: Facebook },
  instagram: { Icon: Instagram },
  email: { Icon: Mail },
  linkedin: { Icon: Linkedin },
  twitter: { Icon: Twitter },
};

// --------------------------------------------------- COMPONENT ------------------------------------

interface SectionTopShortInfoProp {
  agent: AgentData;
}

const SectionTopShortInfo: React.FC<SectionTopShortInfoProp> = React.memo(
  ({ agent }) => {
    const {
      avatar,
      nickname,
      fullName,
      address,
      bioInfo,
      totalProperties,
      socialLinks,
    } = agent;
    const imgUrl = avatar ? `${serverAPI}/${avatar}` : defaultUserAvatar;

    // -------------------------------------------- HANDLERS ------------------------------------
    const socialNetworks = useMemo(() => {
      return (Object.entries(socialLinks) as [SocialsPlatform, string | null][])
        .filter(([_, value]) => value)
        .map(([key, value]) => ({
          key: IconsObj[key],
          url: value,
        }));
    }, [socialLinks]);

    // --------------------------------------------------- RENDERS ------------------------------------
    return (
      <section className="agent-shortInfo bg-sky-100 pt-0 pb-14">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[min(19.3vw,288.500px)_1fr] lg:gap-x-10 grid-cols-1 box-border bg-white rounded-md -mt-10  relative z-10">
            <div className="p-4 flex flex-row item-center justify-center">
              <img
                src={imgUrl}
                loading="lazy"
                alt={nickname || "agent picture here"}
                className="w-10/12 lg:w-full lg:h-full  h-10/12 rounded-full object-cover "
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2 py-5 px-10 lg:p-[30px_20px_20px_0]">
              {/* Agent name */}
              <div className="flex flex-col items-start space-y-1">
                <h4 className="font-bold text-darkBlue font-jostFont capitalize text-lg">
                  {fullName || "N/A"}
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
              {socialNetworks.length ? (
                <ul className="list-none flex flex-row gap-x-2.5 items-center justify-start my-2">
                  {socialNetworks.map((network: T) => {
                    const Icon = network.key?.Icon;
                    const url = network.url;

                    return (
                      <li key={url}>
                        <a href={url}>
                          <Icon className="w-5 h-5 fill-transparent stroke-black box-content p-3 bg-sky-100 rounded-full hover:stroke-blue-400 transition-colors duration-200 ease-linear border " />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-base font-jostFont text-slate-400">
                  (No social networks provided by the agent)
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default SectionTopShortInfo;
