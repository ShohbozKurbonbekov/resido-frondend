import { Users } from "lucide-react";

interface AgencyMyAgentsHeaderType {
  title?: string;
  subtitle?: string;
}

export default function AgencyMyAgentsHeader({
  title = "My Agents",
  subtitle = "Manage your agency agents. You can view agent status, monitor activity, and control agent availability within your agency.",
}: AgencyMyAgentsHeaderType) {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-md py-5 px-4">
      <div className="flex items-center gap-2 text-darkBlue font-bold font-jostFont">
        <Users className="w-5 h-5" />
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
