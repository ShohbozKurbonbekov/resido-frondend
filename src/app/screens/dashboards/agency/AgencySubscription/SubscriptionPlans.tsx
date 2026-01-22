import type { TarrifOutputType } from "@/lib/type/pricing";
import SubscriptionPlansCard from "./SubscriptionPlansCard";

interface SubscriptionPlansType {
  plans: TarrifOutputType[];
  currentTariff: string;
  onSubscribe: (id: string) => void;
}
export default function SubscriptionPlans({
  plans,
  onSubscribe,
}: SubscriptionPlansType) {
  return (
    <div className="mt-8 rounded-md border border-gray-200 p-6 ">
      <h2 className="text-lg font-semibold text-gray-900 font-jostFont">
        Available plans
      </h2>
      <p className="mt-1 text-sm text-gray-500 font-jostFont">
        Compare plans and choose what fits your agency best
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {plans.map((plan) => (
          <SubscriptionPlansCard
            key={plan._id}
            data={plan}
            onSubscribe={onSubscribe}
          />
        ))}
      </div>
    </div>
  );
}
