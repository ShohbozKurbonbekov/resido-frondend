import type { LucideIcon } from "lucide-react";

interface AdminOverviewHeaderType {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  stats?: string; // optional KPI indicator (e.g. "24 Active Users")
}

export default function AdminOverviewHeader({
  title,
  subtitle,
  icon: Icon,
  stats,
}: AdminOverviewHeaderType) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white px-6 py-7 shadow-sm border border-gray-100 font-jostFont">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-darkBlue/10">
            <Icon className="h-6 w-6 text-darkBlue" />
          </div>

          {/* Title & Subtitle */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-darkBlue">{title}</h2>
            <p className="text-sm text-gray-500 sm:text-base">{subtitle}</p>
          </div>
        </div>

        {/* Optional KPI Badge */}
        {stats && (
          <div className="rounded-full bg-darkBlue px-4 py-1.5 text-sm font-medium text-white">
            {stats}
          </div>
        )}
      </div>
    </div>
  );
}
