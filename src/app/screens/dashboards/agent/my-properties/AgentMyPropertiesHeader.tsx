import { Building2 } from "lucide-react";

interface AgentMyPropertiesHeaderType {
  title?: string;
  subtitle?: string;
}

export default function AgentMyPropertiesHeader({
  title = "My Properties",
  subtitle = "Manage all properties you have listed. You can view details, edit information, or remove properties you no longer represent.",
}: AgentMyPropertiesHeaderType) {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-md py-5 px-4 shadow-sm">
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
