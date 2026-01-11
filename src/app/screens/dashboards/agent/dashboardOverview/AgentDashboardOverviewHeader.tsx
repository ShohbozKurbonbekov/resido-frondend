import { Briefcase } from "lucide-react";

interface AgentDashboardOverviewHeaderType {
  title?: string;
  subtitle?: string;
}

export default function AgentDashboardOverviewHeader({
  title = "Agent Overview",
  subtitle = "Manage your listings, track performance, and handle client activity efficiently.",
}: AgentDashboardOverviewHeaderType) {
  return (
    <div className="flex flex-col gap-y-3 bg-white rounded-md py-5 px-4 shadow-sm">
      <div className="flex items-center gap-2 text-darkBlue font-bold font-jostFont">
        <Briefcase className="w-5 h-5" />
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
