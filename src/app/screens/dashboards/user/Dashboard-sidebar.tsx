import { useGlobals } from "@/app/hooks/useGlobals";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import type { DashboardSidebarFeauturesType } from "@/lib/type/common";
import React from "react";
import { NavLink } from "react-router-dom";

const wrapperClasses =
  "w-full mb-7 pt-14 p-6 flex flex-col gap-y-7 bg-white rounded-md shadow-md shadow-slate-200 box-border items-center";

const featuresClasses = "flex flex-col list-none  w-full gap-y-1";

// ------------------------------------------------- COMPONENT -------------------------------------------------
interface DashboardSideBarType {
  name: string;
  avatar: string | undefined;
  address: undefined | string;
  DASHBOARD_FEATURES: DashboardSidebarFeauturesType[];
}

const DashboardSideBar: React.FC<DashboardSideBarType> = React.memo(
  ({ name, avatar, address, DASHBOARD_FEATURES }) => {
    const { logout } = useGlobals();
    const imgUrl = avatar ? `${serverAPI}/${avatar}` : defaultUserAvatar;

    ///// ------------------------------- HANDLERS -------------------------

    // ------------------------------------------------- RENDER -------------------------------------------------
    return (
      <div className={wrapperClasses}>
        <div className="flex flex-col items-center">
          <img
            src={imgUrl}
            alt={name}
            className="max-w-44 rounded-full object-cover mb-2 "
          />
          <h3 className="text-lg lg:text-xl mt-2.5 mb-1 text-darkBlue font-bold font-jostFont capitalize text-center leading-tight line-clamp-2">
            {name}
          </h3>
          <p
            className="text-blue-700 font-jostFont capitalize font-normal text-size_15 text-center line-clamp-2
        "
          >
            {address || "No address"}
          </p>
        </div>
        <ul className={featuresClasses}>
          {DASHBOARD_FEATURES.map((feature: DashboardSidebarFeauturesType) => {
            const { title, Icon, url } = feature;
            const overview = url === "/dashboard";
            return (
              <NavLink
                to={url}
                end={overview}
                onClick={title === "Logout" ? logout : undefined}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm md:text-base font-jostFont font-semibold transition-colors duration-200 border border-gray-200
    ${
      isActive
        ? "bg-sky-600 text-white border-transparent shadow-sm"
        : "bg-white text-gray-800 hover:bg-sky-600 hover:text-white hover:border-transparent"
    }
    `
                }
              >
                <Icon className="h-5 w-5 shrink-0" />

                <span className="flex-1 text-left capitalize">{title}</span>
              </NavLink>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default DashboardSideBar;
