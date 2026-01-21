interface SubscriptionHistoryRowType {
  label: string;
  value: React.ReactNode;
}
export default function SubscriptionHistoryRow({
  label,
  value,
}: SubscriptionHistoryRowType) {
  return (
    <div className="flex items-center border border-b-slate-200/80 border-l-0 border-r-0 border-t-0 p-2  justify-between gap-y-1 font-jostFont">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-900 text-right">{value}</span>
    </div>
  );
}
