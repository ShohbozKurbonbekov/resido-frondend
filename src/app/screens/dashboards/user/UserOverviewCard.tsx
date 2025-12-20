import type { TotalCounter } from "@/lib/type/common";
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { dateConverter } from "@/lib/utils";
import { Link } from "react-router-dom";

interface UserOverviewCardType {
  title: string;
  amount: TotalCounter;
  updatedAt: string;
}
const UserOverviewCard: React.FC<UserOverviewCardType> = React.memo(
  ({ amount, title, updatedAt }) => {
    const formattedTitle = title.split(/(?=[A-Z])/).join(" ");
    const urlPath = useMemo(() => {
      const url = title
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase();
      return `/dashboard/${url}`;
    }, [title]);

    return (
      <Link to={urlPath}>
        <Card className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 shadow-md transition-all duration-400 ease-linear hover:scale-105 hover:shadow-lg py-5 group">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-sky-200  to-sky-500" />

          <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
            <p className="font-jostFont text-lg">Press click to visit...</p>
          </div>
          <CardHeader className="pb-4 relative">
            <CardTitle className="font-jostFont text-sm font-semibold tracking-wide text-gray-700 group-hover:text-white capitalize">
              {formattedTitle}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="relative text-4xl font-extrabold leading-none tracking-tight text-gray-700 group-hover:text-white">
                {amount.total}
              </div>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm font-jostFont">
                According to {dateConverter(updatedAt, "Do MMMM")}
              </span>
            </div>

            <div className="relative group-hover:bg-slate-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 shadow">
              <TrendingUp className="h-6 w-6 text-gray-700" />
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }
);
export default UserOverviewCard;
