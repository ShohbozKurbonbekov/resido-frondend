import type {
  NotificationCreation,
  UserNotifications,
} from "@/lib/type/notification";
import React from "react";
import { myNotificationsWrapperClasses } from "./UserNotifications";
import UserNotificationCard from "./UserNotificationCard";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import NoFound from "@/app/components/NoFound";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface UserNotificationsContentType {
  setCurrentNotId: SetStateType<string | null>;
  currentNotId: string | null;
  onApprove?: (notificationId: string) => Promise<void>;
  onReject?: (notificationId: string) => Promise<void>;
  userNotifications: UserNotifications;
  notificationsInput: CommonInput;
  setNotificationsInput: SetStateType<CommonInput>;
  setDialog: SetStateType<boolean>;
  dialogOpen: boolean;
}

const UserNotificationsContent: React.FC<UserNotificationsContentType> =
  React.memo(
    ({
      userNotifications,
      notificationsInput,
      setNotificationsInput,
      onApprove,
      onReject,
      currentNotId,
      setCurrentNotId,
      dialogOpen,
      setDialog,
    }) => {
      return (
        <>
          {userNotifications.notifications?.length ? (
            <div className="flex-1 flex flex-col justify-between gap-y-6">
              <div className={myNotificationsWrapperClasses}>
                {userNotifications.notifications.map(
                  (
                    notification: Omit<
                      NotificationCreation,
                      "notificationOwner"
                    >,
                  ) => (
                    <UserNotificationCard
                      setCurrentNotificationId={setCurrentNotId}
                      notification={notification}
                      key={notification._id}
                      setDialog={setDialog}
                      onReject={onReject}
                    />
                  ),
                )}
              </div>
              <PaginationCom
                totalPages={Math.ceil(
                  (userNotifications.metaCounter[0]?.total ?? 0) /
                    notificationsInput.limit,
                )}
                styleclasses="flex flex-row items-center justify-center  gap-3"
                currentPage={notificationsInput.page}
                onPageChange={setNotificationsInput}
              />
            </div>
          ) : (
            <NoFound title="No blogs found" />
          )}

          <Dialog open={dialogOpen} onOpenChange={setDialog}>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-jostFont text-yellow-500 tracking-wider  inline-flex items-center gap-2 text-lg">
                  <Info className="w-6 h-6 " /> Activate Agent Account
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm font-jostFont">
                  You will be logged out and asked to sign in again to activate
                  your agent account. Do you want to continue?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setDialog(false)}>
                  Cancel
                </Button>
                {onApprove && currentNotId && (
                  <Button
                    className="bg-green-500 hover:bg-green-700 transition-colors duration-150 ease-linear"
                    onClick={() => onApprove(currentNotId)}
                  >
                    OK
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  );
export default UserNotificationsContent;
