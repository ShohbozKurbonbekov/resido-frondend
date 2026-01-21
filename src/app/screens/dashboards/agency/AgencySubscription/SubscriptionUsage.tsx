import SubscriptionProgressRow from "./SubscriptionProgressRow";

interface SubscriptionUsageType {
  agentsUsed: number;
  agentsLimit: number;
  propertiesUsed: number;
  propertiesLimit: number;
}

export default function SubscriptionUsage({
  agentsLimit,
  agentsUsed,
  propertiesLimit,
  propertiesUsed,
}: SubscriptionUsageType) {
  return (
    <div className="mt-8 border border-gray-200  p-6 rounded-md">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 font-jostFont">
          Usage & Limits
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Track how much of your plan you are currently using
        </p>
      </div>

      {/* Usage rows */}
      <div className="mt-6 space-y-6">
        <SubscriptionProgressRow
          label="Agents"
          used={agentsUsed}
          limit={agentsLimit}
        />
        <SubscriptionProgressRow
          label="Properties"
          used={propertiesUsed}
          limit={propertiesLimit}
        />
      </div>
    </div>
  );
}
