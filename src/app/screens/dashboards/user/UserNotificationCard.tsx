import type { NotificationCreation } from "@/lib/type/notification";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { dateConverter } from "@/lib/utils";
import type { SetStateType } from "@/lib/type/common";
import { AgentNotificationType } from "@/lib/enums/notification.enum";

const actionBtnClasses =
  "bg-gray-500 text-white hover:bg-gray-700 hover:text-white transition-colors duration-150 ease-linear  border";

interface UserNotificationCardType {
  notification: Omit<NotificationCreation, "notificationOwner">;
  setDialog: SetStateType<boolean>;
  onReject?: (notificationId: string) => Promise<void>;
  setCurrentNotificationId: SetStateType<string | null>;
}

export default function UserNotificationCard({
  notification,
  setDialog,
  onReject,
  setCurrentNotificationId,
}: UserNotificationCardType) {
  const isApproved =
    notification.type === AgentNotificationType.AGENT_APPLICATION_APPROVED;
  const isRejected =
    notification.type === AgentNotificationType.AGENT_APPLICATION_REJECTED;

  return (
    <Card className="rounded-xl border bg-white  transition-shadow hover:shadow-md">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3 ">
            {isApproved ? (
              <CheckCircle2 className="text-green-600 mt-0.5" size={20} />
            ) : (
              <XCircle className="text-red-500 mt-0.5" size={20} />
            )}

            <div>
              <h3 className="text-sm font-semibold font-jostFont text-gray-800">
                Agent Application {isApproved ? "Approved" : "Rejected"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {notification.payload?.agencyName || "Uknown"}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground font-jostFont">
            <Clock className="h-4 w-4" />
            {dateConverter(notification.createdAt)}
          </span>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed font-jostFont">
          {notification.payload?.reason || "No reason"}
        </p>

        <div className="pt-2 font-jostFont">
          {isApproved && notification.actionRequired && (
            <Button
              size="sm"
              className={actionBtnClasses}
              onClick={() => {
                setDialog(true);
                setCurrentNotificationId(notification._id);
              }}
            >
              Activate Agent Account
            </Button>
          )}

          {isRejected && onReject && !notification.resolvedAt && (
            <Button
              size="sm"
              variant="outline"
              className={actionBtnClasses}
              onClick={() => onReject(notification._id)}
            >
              I got it
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
