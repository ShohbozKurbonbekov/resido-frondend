import type { User } from "@/lib/type/dashboard/user";
import React, { useMemo } from "react";
import OverviewCard from "@/app/components/Cards/OverviewCard";
import { Building2, LayoutDashboard, Users2 } from "lucide-react";
import StatTile from "@/app/components/Cards/StaticOverviewCard";

const containerClasses = "flex flex-col gap-4";
const sectionTitleClasses =
  "flex items-center gap-2 text-sm md:text-base font-jostFont font-semibold text-slate-700";

export const adminDashboardOverviewWrapper =
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-7  mt-5 px-2";

interface AdminOverviewContentType {
  admin: User;
}
const AdminOverviewContent: React.FC<AdminOverviewContentType> = React.memo(
  ({ admin }) => {
    const generatedAt = admin.adminOverviewStats?.generatedAt;

    const overviewStates = useMemo(() => {
      if (
        admin.adminOverviewStats &&
        admin.adminOverviewStats.globalStats &&
        admin.adminOverviewStats.personalStats
      ) {
        const generateStates = (arr: string[]) =>
          Object.entries(admin.adminOverviewStats!.globalStats)
            .concat(Object.entries(admin.adminOverviewStats!.personalStats))
            .filter(([title]) => arr.includes(title));

        return {
          actionStates: generateStates([
            "blogs",
            "myBlogs",
            "myMessages",
            "notifications",
            "comments",
            "tariffs",
          ]),
          staticStates: generateStates([
            "users",
            "properties",
            "agencies",
            "agents",
          ]),
        };
      }

      return {
        staticStates: [],
        actionStates: [],
      };
    }, [admin.adminOverviewStats]);

    console.log(overviewStates.actionStates);
    return (
      <div className="bg-white p-5 rounded-2xl  flex flex-col gap-10">
        {/* -------- Static Metrics Section -------- */}
        <div className={containerClasses}>
          <div className="flex items-center gap-2 border-l-4 border-sky-500 pl-3">
            <h4 className={sectionTitleClasses}>
              <LayoutDashboard className="w-4 h-4 text-sky-500" />
              Performance Summary
            </h4>
          </div>

          <div className={adminDashboardOverviewWrapper}>
            {overviewStates.staticStates.map(([key, value]) => (
              <StatTile
                key={key}
                title={key}
                amount={{ total: value }}
                updatedAt={generatedAt!}
                icon={key === "properties" ? Building2 : Users2}
              />
            ))}
          </div>
        </div>

        {/* -------- Actionable Cards Section -------- */}
        <div className={containerClasses}>
          <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
            <h4 className={sectionTitleClasses}>
              <LayoutDashboard className="w-4 h-4 text-indigo-500" />
              Manage Your Activity
            </h4>
          </div>

          <div className={adminDashboardOverviewWrapper}>
            {overviewStates.actionStates.map(([key, amount]) => (
              <OverviewCard
                key={key}
                title={key}
                amount={{ total: amount }}
                updatedAt={generatedAt || "not given"}
                initialUrl="/dashboard/admin-"
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default AdminOverviewContent;
