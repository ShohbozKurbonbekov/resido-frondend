import type { TotalCounter } from "@/lib/type/common";
import React from "react";
import type { LucideIcon } from "lucide-react";
import { dateConverter } from "@/lib/utils";

interface StatTileType {
  title: string;
  amount: TotalCounter;
  updatedAt: string;
  icon: LucideIcon;
}

const StatTile: React.FC<StatTileType> = React.memo(
  ({ title, amount, updatedAt, icon: Icon }) => {
    const formattedTitle = title.split(/(?=[A-Z])/).join(" ");

    return (
      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3 border border-slate-200">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-200">
            <Icon className="h-5 w-5 text-slate-600" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-jostFont">
              {formattedTitle}
            </span>
            <span className="text-xs text-slate-400 font-jostFont">
              Updated {dateConverter(updatedAt)}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="text-3xl font-bold text-slate-700  font-jostFont">
          {amount.total}
        </div>
      </div>
    );
  },
);

export default StatTile;
