import { MapPin, Clock, ArrowRight } from "lucide-react";
import type { NotificationCreation } from "@/lib/type/notification";
import { customLetterCustomise, dateConverter } from "@/lib/utils";
import { defaultUserAvatar, serverAPI } from "@/lib/config";

const STATUS_BG_MAP: Record<string, string> = {
  available: "bg-green-200 text-green-600",
  rejected: "bg-red-200 text-red-600",
  pending: "bg-yellow-200 text-yellow-600",
  paused: "bg-slate-200 text-slate-600",
  payment_waiting: "bg-blue-200 text-blue-600",
};

interface MyNotificationCardType {
  notification: NotificationCreation;
  onReview?: (entityId: string) => void;
}

export default function MyNotificationCard({
  notification,
  onReview,
}: MyNotificationCardType) {
  const {
    notificationOwner: { name, avatar, address, status },
    actionRequired,
    createdAt,
    entityId,
  } = notification;

  const imgUrl = avatar ? `${serverAPI}/${avatar}` : defaultUserAvatar;

  return (
    <div className="flex items-start gap-4 rounded-lg bg-white p-4">
      {/* Avatar */}
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
        <img src={imgUrl} alt={name} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 shrink">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
            {name || "unkown"}
          </h3>

          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {dateConverter(createdAt)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {address || "Address not provided"}
          </span>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${STATUS_BG_MAP[status]}`}
          >
            {customLetterCustomise(status)}
          </span>
        </div>

        {/* Action */}
        {actionRequired && onReview && (
          <button
            onClick={() => {
              onReview(entityId);
            }}
            className={`mt-2 inline-flex w-fit items-center gap-2 rounded-lg  px-3 py-1.5 text-xs font-normal text-white transition-all bg-green-600 hover:bg-green-800  font-jostFont `}
          >
            Review Application
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
