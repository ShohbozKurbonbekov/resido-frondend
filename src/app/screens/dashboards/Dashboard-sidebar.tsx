import { useGlobals } from "@/app/hooks/useGlobals";
import { serverAPI } from "@/lib/config";
import type { DashboardSidebar } from "@/lib/type/dashboard/dashboard";
import type { userDashboardSidebarType } from "@/lib/type/dashboard/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardSideBarProps {
  featuresData: DashboardSidebar[];
  wrapperClasses?: string;
  featuresClasses?: string;
  data: userDashboardSidebarType;
}

export default function DashboardSideBar({
  featuresData,
  wrapperClasses = "sidebar w-full mb-7 pt-14 p-6 flex flex-col gap-y-7 bg-white rounded-md shadow-md shadow-slate-200 box-border items-center",
  data,
  featuresClasses = "flex flex-col list-none [&>*:last-child]:border-b-0 w-full",
}: DashboardSideBarProps) {
  const { authmember } = useGlobals();
  const navigation = useNavigate();
  const {
    memberImage: image,
    memberName: name,
    memberLocation: location,
  } = data;
  const [thisBtnHover, setBtnHover] = useState<string>("");

  const makeUrl = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[/\s]+/g, "-");
  };

  return (
    <div className={wrapperClasses}>
      {/* // header */}
      <div className="sidebar-header">
        <img
          src={image}
          alt=""
          className="max-w-44 rounded-full object-cover mb-2 "
        />
        <h3 className="text-xl mt-2.5 mb-1 text-darkBlue font-bold font-jostFont capitalize text-center leading-tight">
          {name}
        </h3>
        <p className="text-blue-700 font-jostFont capitalize font-normal text-size_15 text-center">
          {location}
        </p>
      </div>

      {/* // features */}
      <ul className={featuresClasses}>
        {featuresData.map((feature: DashboardSidebar, index: number) => {
          const { title, Icon } = feature;
          return (
            <li
              key={title}
              className={`w-full px-2 py-4 transition-all duration-100 ease-linear border-b-slate-300 border-2 border-t-0 border-s-0 border-r-0 ${
                thisBtnHover === `btn-${index + 1}`
                  ? "text-green-700 bg-green-200 border-b-white"
                  : null
              } ${
                thisBtnHover === `btn-${index + 2}` ? "border-b-white" : null
              }`}
              onMouseEnter={() => setBtnHover(`btn-${index + 1}`)}
              onMouseLeave={() => setBtnHover("")}
            >
              <button
                className="flex flex-row items-center justify-start gap-2 w-full"
                onClick={() => {
                  navigation(
                    `/${makeUrl(authmember?.memberType)}/${makeUrl(
                      feature.title
                    )}`
                  );
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1 text-start font-semibold capitalize">
                  {title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
