import { USER_DASHBOARD_FEATURES } from "@/app/data/dashboard/user";
import { useGlobals } from "@/app/hooks/useGlobals";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import type { DashboardSidebarType, User } from "@/lib/type/dashboard/user";
import { useState } from "react";
import { Link } from "react-router-dom";

const wrapperClasses =
  "sidebar w-full mb-7 pt-14 p-6 flex flex-col gap-y-7 bg-white rounded-md shadow-md shadow-slate-200 box-border items-center";

const featuresClasses =
  "flex flex-col list-none [&>*:last-child]:border-b-0 w-full";

// ------------------------------------------------- COMPONENT -------------------------------------------------
export default function DashboardSideBar() {
  const { authmember } = useGlobals();
  const { avatar, memberName, memberAddress } = authmember as User;

  const [thisBtnHover, setBtnHover] = useState<string>("");
  const imgUrl = avatar ? `${serverAPI}/${avatar}` : defaultUserAvatar;

  // ------------------------------------------------- RENDER -------------------------------------------------
  return (
    <div className={wrapperClasses}>
      <div className="sidebar-header flex flex-col items-center">
        <img
          src={imgUrl}
          alt=""
          className="max-w-44 rounded-full object-cover mb-2 "
        />
        <h3 className="text-xl mt-2.5 mb-1 text-darkBlue font-bold font-jostFont capitalize text-center leading-tight">
          {memberName || "Unknown"}
        </h3>
        <p className="text-blue-700 font-jostFont capitalize font-normal text-size_15 text-center">
          {memberAddress || "No address"}
        </p>
      </div>

      <ul className={featuresClasses}>
        {USER_DASHBOARD_FEATURES.map(
          (feature: DashboardSidebarType, index: number) => {
            const { title, Icon, url } = feature;
            return (
              <Link to={url} key={title}>
                <li
                  key={title}
                  className={`w-full px-2 py-4 transition-all duration-100 ease-linear border-b-slate-300 border-2 border-t-0 border-s-0 border-r-0 ${
                    thisBtnHover === `btn-${index + 1}`
                      ? "text-green-700 bg-green-200 border-b-white"
                      : null
                  } ${
                    thisBtnHover === `btn-${index + 2}`
                      ? "border-b-white"
                      : null
                  }`}
                  onMouseEnter={() => setBtnHover(`btn-${index + 1}`)}
                  onMouseLeave={() => setBtnHover("")}
                >
                  <button
                    className="flex flex-row items-center justify-start gap-2 w-full"
                    onClick={() => {}}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-start font-semibold capitalize">
                      {title}
                    </span>
                  </button>
                </li>
              </Link>
            );
          }
        )}
      </ul>
    </div>
  );
}
