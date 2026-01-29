import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import type { UserNotifications } from "@/lib/type/notification";
import { setUserNotifications } from "./slice";
import { retrieveUserNotifications } from "./selector";
import type { CommonInput } from "@/lib/type/common";
import MemberService from "@/app/services/Member.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import MyNotificationHeader from "@/app/components/notification/MyNotificationHeader";
import { Bell } from "lucide-react";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import UserNotificationsContent from "./UserNotificationsContent";
import { useGlobals } from "@/app/hooks/useGlobals";

// -------------------------------------  REUSABLE CLASSES --------------------------
export const myNotificationsWrapperClasses = "grid grid-cols-1 gap-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const userNotificationsDispatch = (dispatch: Dispatch) => ({
  setUserNotifications: (data: UserNotifications) =>
    dispatch(setUserNotifications(data)),
});

const userNotificationRetriever = createSelector(
  retrieveUserNotifications,
  (userNotifications) => ({ userNotifications }),
);

// ----------------------------------------- COMPONENT --------------------------
export default function UserNotifications() {
  const { setUserNotifications } = userNotificationsDispatch(useDispatch());

  const { userNotifications } = useSelector(userNotificationRetriever);
  const [currentNotId, setCurrentNotId] = useState<null | string>(null);
  const [dialogOpen, setDialog] = useState<boolean>(false);
  const { logout } = useGlobals();

  const [loading, setLoading] = useState<boolean>(true);
  const [notificationsInput, setNotificationsInput] = useState<CommonInput>({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    const member = new MemberService();
    (async () => {
      try {
        const result = await member.myNotifications(notificationsInput);
        setUserNotifications(result);
      } catch (error) {
        console.log("Error in myNotifications of UserNotifications: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [notificationsInput]);

  // When application is rejected
  const onReject = useCallback(
    async (notificationId: string) => {
      const prevNotifications = userNotifications;
      const updatedNotifications = prevNotifications.notifications.map(
        (notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                resolvedAt: new Date().toISOString(),
                actionRequired: false,
              }
            : notification,
      );

      setUserNotifications({
        metaCounter: prevNotifications.metaCounter,
        notifications: updatedNotifications,
      });
      try {
        const member = new MemberService();
        await member.approveAgentRejection(notificationId);
      } catch (error) {
        console.log("Error in onReject of UserNotifications: ", error);
        setUserNotifications(prevNotifications);
        await sweetErrorHandling(error!);
      }
    },
    [setUserNotifications, userNotifications],
  );

  // When application is approved
  const onApprove = useCallback(
    async (notificationId: string) => {
      const prevNotifications = userNotifications;
      const updatedNotifications = prevNotifications.notifications.map(
        (notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                resolvedAt: new Date().toISOString(),
                actionRequired: false,
              }
            : notification,
      );
      setUserNotifications({
        notifications: updatedNotifications,
        metaCounter: prevNotifications.metaCounter,
      });

      try {
        const member = new MemberService();
        await member.authorizeAgentAccount(notificationId);
        logout();
      } catch (error) {
        console.log("Error in onApprove of UserNotifications: ", error);
        await sweetErrorHandling(error!);
        setUserNotifications(prevNotifications);
      } finally {
        setCurrentNotId(null);
        setDialog(false);
      }
    },
    [setUserNotifications, userNotifications, logout],
  );
  // ----------------------------------------- RENDER --------------------------
  return (
    <div className="lg:col-span-9  flex flex-col gap-7 h-full">
      <MyNotificationHeader
        title={"User Applications"}
        subtitle={"You  got notifications"}
        icon={Bell}
      />

      {loading ? (
        <SpinnerGrids columns={myNotificationsWrapperClasses} count={2} />
      ) : (
        <UserNotificationsContent
          dialogOpen={dialogOpen}
          setDialog={setDialog}
          currentNotId={currentNotId}
          setCurrentNotId={setCurrentNotId}
          onApprove={onApprove}
          onReject={onReject}
          userNotifications={userNotifications}
          notificationsInput={notificationsInput}
          setNotificationsInput={setNotificationsInput}
        />
      )}
    </div>
  );
}
