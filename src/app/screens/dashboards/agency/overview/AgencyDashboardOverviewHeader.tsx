import { Building2 } from "lucide-react";

interface AgencyDashboardOverviewHeaderType {
  title?: string;
  subtitle?: string;
}

export default function AgencyDashboardOverviewHeader({
  title = "Agency Overview",
  subtitle = "Monitor your agency performance, manage agents, and oversee listings and activity.",
}: AgencyDashboardOverviewHeaderType) {
  return (
    <div className="flex flex-col gap-y-3 bg-white rounded-md py-5 px-4 shadow-sm">
      <div className="flex items-center gap-2 text-darkBlue font-bold font-jostFont">
        <Building2 className="w-5 h-5" />
        <h3 className="text-base sm:text-lg md:text-xl font-semibold capitalize">
          {title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
