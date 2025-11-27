import type { LucideIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Facebook, Linkedin, Mail, Instagram, Twitter } from "lucide-react";
import type { SocialsPlatform, T } from "@/lib/type/common";

// ----------------------------------- TYPE SAFETY -----------------------
interface SocialsIconType {
  Icon: LucideIcon;
}

const IconsObj: Record<SocialsPlatform, SocialsIconType> = {
  facebook: { Icon: Facebook },
  instagram: { Icon: Instagram },
  email: { Icon: Mail },
  linkedin: { Icon: Linkedin },
  twitter: { Icon: Twitter },
};

// -------------------------------------------------- COMPONENT ---------------------------------------------
interface SocialsNetworkType {
  networks: Record<SocialsPlatform, string | null>;
}
const SocialsNetwork: React.FC<SocialsNetworkType> = React.memo(
  ({ networks }) => {
    const socialNetworks = useMemo(() => {
      return (Object.entries(networks) as [SocialsPlatform, string | null][])
        .filter(([_, value]) => value)
        .map(([key, value]) => ({
          key: IconsObj[key],
          url: value,
        }));
    }, [networks]);

    // -------------------------------------------------- RENDER ---------------------------------------------

    return socialNetworks.length ? (
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
    );
  }
);
export default SocialsNetwork;
