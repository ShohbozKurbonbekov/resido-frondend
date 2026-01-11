import type { AgentDashboardOverviewType } from "@/lib/type/agent";
import React, { useMemo } from "react";
import { agentDashboardOververWrapper } from "../AgentDashboardOverview";
import OverviewCard from "@/app/components/Cards/OverviewCard";
import { Eye, Heart, LayoutDashboard } from "lucide-react";
import StatTile from "@/app/components/Cards/StaticOverviewCard";

const containerClasses = "flex flex-col gap-4";
const sectionTitleClasses =
  "flex items-center gap-2 text-sm md:text-base font-jostFont font-semibold text-slate-700";

interface AgentDashboardOverviewContentType {
  agentDashboardOverview: AgentDashboardOverviewType;
}

const AgentDashboardOverviewContent: React.FC<AgentDashboardOverviewContentType> =
  React.memo(({ agentDashboardOverview }) => {
    const { generatedAt } = agentDashboardOverview;

    const overviewStates = useMemo(() => {
      const generateStates = (arr: string[]) =>
        Object.entries(agentDashboardOverview).filter(([key]) =>
          arr.includes(key)
        );

      return {
        actionStates: generateStates([
          "myProperties",
          "myBlogs",
          "reviews",
          "messages",
          "transactions",
        ]),
        staticStates: generateStates(["totalLikes", "totalViews"]),
      };
    }, [agentDashboardOverview]);

    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col gap-10">
        {/* -------- Static Metrics Section -------- */}
        <section className={containerClasses}>
          <div className="flex items-center gap-2 border-l-4 border-sky-500 pl-3">
            <h4 className={sectionTitleClasses}>
              <LayoutDashboard className="w-4 h-4 text-sky-500" />
              Performance Summary
            </h4>
          </div>

          <div className={agentDashboardOververWrapper}>
            {overviewStates.staticStates.map(([key, total]) => (
              <StatTile
                key={key}
                title={key}
                amount={total}
                updatedAt={generatedAt!}
                icon={key === "totalViews" ? Eye : Heart}
              />
            ))}
          </div>
        </section>

        {/* -------- Actionable Cards Section -------- */}
        <section className={containerClasses}>
          <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
            <h4 className={sectionTitleClasses}>
              <LayoutDashboard className="w-4 h-4 text-indigo-500" />
              Manage Your Activity
            </h4>
          </div>

          <div className={agentDashboardOververWrapper}>
            {overviewStates.actionStates.map(([key, amount]) => (
              <OverviewCard
                key={key}
                title={key}
                amount={amount}
                updatedAt={generatedAt || "not given"}
                initialUrl="/dashboard/agent-"
              />
            ))}
          </div>
        </section>
      </div>
    );
  });

export default AgentDashboardOverviewContent;
