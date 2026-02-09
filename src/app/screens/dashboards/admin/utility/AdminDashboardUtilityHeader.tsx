interface AdminDashboardGeneralHeaderType {
  title: string;
  subtitle: string;
  Icon1: React.ReactNode;
  headerContent?: React.ReactNode;
}

export default function AdminDashboardUtilityHeader({
  title = "Your Profile",
  subtitle = "View and manage your personal information.",
  Icon1,
  headerContent,
}: AdminDashboardGeneralHeaderType) {
  return (
    <div className="w-full  border bg-white p-6 font-jostFont rounded-md">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
          {Icon1}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {headerContent}
    </div>
  );
}
