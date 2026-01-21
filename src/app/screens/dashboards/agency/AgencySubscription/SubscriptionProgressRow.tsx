import { useCallback, useMemo } from "react";

interface SubscriptionProgressRowType {
  label: string;
  used: number;
  limit: number;
}
export default function SubscriptionProgressRow({
  label,
  used,
  limit,
}: SubscriptionProgressRowType) {
  const percentage = useMemo(() => {
    return Math.min((used / limit) * 100, 100);
  }, [limit, used]);

  const getProgressColor = useCallback((percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-gray-900";
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-jostFont">
        <span className="font-medium text-gray-900">{label}</span>
        <span className="text-gray-600">
          {used} / {limit}
        </span>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-gray-100 font-jostFont">
        <div
          className={`h-2 rounded-full transition-all ${getProgressColor(
            percentage,
          )}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
