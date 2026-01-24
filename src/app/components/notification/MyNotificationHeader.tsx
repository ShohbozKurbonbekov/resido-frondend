import type { LucideIcon } from "lucide-react";

interface MyNotificationHeaderType {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function MyNotificationHeader({
  title,
  subtitle,
  icon: Icon,
}: MyNotificationHeaderType) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-5 py-6 font-jostFont">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-darkBlue/10">
          <Icon className="h-5 w-5 text-darkBlue" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-darkBlue sm:text-xl">
            {title}
          </h2>

          <p className="text-sm text-gray-600 sm:text-base">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
