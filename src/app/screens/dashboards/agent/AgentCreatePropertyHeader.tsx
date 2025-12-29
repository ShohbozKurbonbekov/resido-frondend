import { Home, ShieldCheck } from "lucide-react";

interface AgentCreatePropertyHeaderType {
  title?: string;
  subtitle?: string;
}

export default function AgentCreatePropertyHeader({
  title = "Create Property Listing",
  subtitle = "Add detailed information to publish your property and attract potential buyers or renters.",
}: AgentCreatePropertyHeaderType) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-5 py-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-darkBlue/10">
          <Home className="h-5 w-5 text-darkBlue" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-darkBlue sm:text-xl">
            {title}
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="h-4 w-4" />
        <span>Listings will be reviewed before becoming visible to users</span>
      </div>
    </div>
  );
}
