import React, { useMemo } from "react";
import OverviewCard from "@/app/components/Cards/OverviewCard";
import {
  CheckCircle,
  CreditCard,
  Eye,
  LayoutDashboard,
  XCircle,
} from "lucide-react";
import StatTile from "@/app/components/Cards/StaticOverviewCard";
import type { AgencyDashboardOverviewType } from "@/lib/type/agency";
import { agencyDashboardOverviewWrapper } from "./AgencyDashboardOverview";
import clsx from "clsx";
import { SubscriptionStatus } from "@/lib/enums/agency.enum";
import { dateConverter } from "@/lib/utils";

const containerClasses = "flex flex-col gap-4";
const sectionTitleClasses =
  "flex items-center gap-2 text-sm md:text-base font-jostFont font-semibold text-slate-700";

interface AgencyDashboardOverviewContentType {
  agencyDashboardOverview: AgencyDashboardOverviewType;
}

const AgencyDashboardOverviewContent: React.FC<AgencyDashboardOverviewContentType> =
  React.memo(({ agencyDashboardOverview }) => {
    const { generatedAt } = agencyDashboardOverview;
    const { myBillingInfo } = agencyDashboardOverview;

    const overviewStates = useMemo(() => {
      const generateStates = (arr: string[]) =>
        Object.entries(agencyDashboardOverview).filter(([key]) =>
          arr.includes(key),
        );

      return {
        actionStates: generateStates([
          "myProperties",
          "myNotifications",
          "myAgents",
          "myBlogs",
          "messages",
          "transactions",
        ]),
        staticStates: generateStates(["totalViews"]),
      };
    }, [agencyDashboardOverview]);

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

          <div className={agencyDashboardOverviewWrapper}>
            {overviewStates.staticStates.map(([key, total]) => (
              <StatTile
                key={key}
                title={key}
                amount={total}
                updatedAt={generatedAt!}
                icon={key === "totalViews" ? Eye : CreditCard}
              />
            ))}
          </div>
        </div>

        {/*Billing Info*/}
        <div className={containerClasses}>
          <div className="flex items-center gap-2 border-l-4 border-sky-500 pl-3">
            <h4 className={sectionTitleClasses}>
              <CreditCard className="w-4 h-4 text-sky-500" />
              Membership Summary
            </h4>
          </div>
          <div className="rounded-lg border bg-white p-4 font-jostFont ">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800 font-semibold font-jostFont">
                <CreditCard className="h-5 w-5 text-sky-500" />
                Billing
              </div>

              <div
                className={clsx(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  myBillingInfo?.subscriptionStatus ===
                    SubscriptionStatus.ACTIVE
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600",
                )}
              >
                {myBillingInfo?.subscriptionStatus ===
                SubscriptionStatus.ACTIVE ? (
                  <CheckCircle className="h-3.5 w-3.5" />
                ) : (
                  <XCircle className="h-3.5 w-3.5" />
                )}
                {myBillingInfo?.subscriptionStatus}
              </div>
            </div>

            {/* Content */}
            <div className="mt-4 space-y-1">
              <p className="text-xs text-muted-foreground">Current Plan</p>
              <p className="text-lg font-semibold text-slate-700">
                {myBillingInfo?.subscriptionPlanType}
              </p>
            </div>

            {/* Footer */}
            <p className="mt-4 text-xs text-muted-foreground">
              Updated {dateConverter(generatedAt!)}
            </p>
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

          <div className={agencyDashboardOverviewWrapper}>
            {overviewStates.actionStates.map(([key, amount]) => (
              <OverviewCard
                key={key}
                title={key}
                amount={amount}
                updatedAt={generatedAt || "not given"}
                initialUrl="/dashboard/agency-"
              />
            ))}
          </div>
        </div>
      </div>
    );
  });

export default AgencyDashboardOverviewContent;
