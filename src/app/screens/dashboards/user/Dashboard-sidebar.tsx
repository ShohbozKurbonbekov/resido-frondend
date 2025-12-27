import { useGlobals } from "@/app/hooks/useGlobals";
import { Button } from "@/components/ui/button";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import type { DashboardSidebarFeauturesType } from "@/lib/type/common";
import React, { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const wrapperClasses =
  "w-full mb-7 pt-14 p-6 flex flex-col gap-y-7 bg-white rounded-md shadow-md shadow-slate-200 box-border items-center";

const featuresClasses =
  "flex flex-col list-none [&>*:last-child]:border-b-0 w-full gap-y-1";

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
    const navigation = useNavigate();
    const [isActive, setIsActive] = useState<string>("btn-1");
    const imgUrl = avatar ? `${serverAPI}/${avatar}` : defaultUserAvatar;

    // ---------------------------------------------- HANDLERS ----------------------------------------------
    const handleClick = useCallback(
      (btn: string, url: string) => {
        setIsActive(btn);
        navigation(url, { replace: true });
      },
      [navigation]
    );
    // ------------------------------------------------- RENDER -------------------------------------------------
    return (
      <div className={wrapperClasses}>
        <div className="flex flex-col items-center">
          <img
            src={imgUrl}
            alt={name}
            className="max-w-44 rounded-full object-cover mb-2 "
          />
          <h3 className="text-xl mt-2.5 mb-1 text-darkBlue font-bold font-jostFont capitalize text-center leading-tight w-full truncate">
            {name}
          </h3>
          <p
            className="text-blue-700 font-jostFont capitalize font-normal text-size_15 text-center w-full truncate
        "
          >
            {address || "No address"}
          </p>
        </div>
        <ul className={featuresClasses}>
          {DASHBOARD_FEATURES.map(
            (feature: DashboardSidebarFeauturesType, index: number) => {
              const { title, Icon, url } = feature;
              return (
                <li className="w-full">
                  <Button
                    variant={"default"}
                    className={`w-full text-base bg-white text-gray-800 border-sm shadow-none py-5  border-gray-200 border font-jostFont hover:bg-sky-600 hover:text-white hover:border-transparent ${isActive === `btn-${index + 1}` ? "bg-sky-600 text-white" : ""}`}
                    onClick={
                      title === "Logout"
                        ? logout
                        : () => handleClick(`btn-${index + 1}`, url)
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-start font-semibold capitalize">
                      {title}
                    </span>
                  </Button>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
);

export default DashboardSideBar;
