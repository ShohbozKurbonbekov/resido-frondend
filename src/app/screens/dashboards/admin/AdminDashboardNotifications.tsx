import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import MyNotificationHeader from "@/app/components/notification/MyNotificationHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { Bell } from "lucide-react";
import type {
  NotificationCreation,
  NotificationsType,
} from "@/lib/type/notification";
import { setAdminNotifications } from "./slice";
import { retrieveAdminNotifications } from "./selector";
import type { Agency } from "@/lib/type/agency";
import AdminService from "@/app/services/Admin.service";
import MyNotificationsContent from "@/app/components/notification/MyNotificationsContent";

// ----------------------------------------- REUSABLE CLASSES  AND OTHERS --------------------------
export const myNotificationsWrapperClasses = "grid grid-cols-1 gap-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const adminNotificationsDispatch = (dispatch: Dispatch) => ({
  setAdminNotifications: (data: NotificationsType<NotificationCreation>) =>
    dispatch(setAdminNotifications(data)),
});

const adminNotificationRetriever = createSelector(
  retrieveAdminNotifications,
  (adminNotifications) => ({ adminNotifications }),
);

// ----------------------------------------- COMPONENT --------------------------
export default function AdminDashboardNotifications() {
  const { setAdminNotifications } = adminNotificationsDispatch(useDispatch());
  const { adminNotifications } = useSelector(adminNotificationRetriever);

  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [agency, setAgency] = useState<Agency | undefined>(undefined);
  const [notificationEntityId, setEntityId] = useState<null | string>(null);
  const [notificationsInput, setNotificationsInput] = useState<CommonInput>({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    const admin = new AdminService();
    (async () => {
      setLoading(true);
      try {
        const result = await admin.myNotifications(notificationsInput);
        setAdminNotifications(result);
      } catch (error) {
        console.log(
          "Error in myNotifications of AdminDashboardNotifications : ",
          error,
        );
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [notificationsInput]);

  // When  application is reviewed
  const onReview = useCallback(
    async (entityId: string) => {
      const prevNotifications = adminNotifications;
      const updatedNotifications = prevNotifications.notifications.map(
        (notification) =>
          notification.entityId === entityId
            ? {
                ...notification,
                actionRequired: false,
              }
            : notification,
      );

      setAdminNotifications({
        metaCounter: prevNotifications.metaCounter,
        notifications: updatedNotifications,
      });

      setEntityId(entityId);
      try {
        const admin = new AdminService();
        const result = await admin.reviewNotification(entityId);
        setAgency(result.member);
        setModalOpen(true);
      } catch (error) {
        setAdminNotifications(prevNotifications);
        console.log(
          "Error in onReview of AdminnDashboardNotifications: ",
          error,
        );
        await sweetErrorHandling(error!);
      }
    },
    [setAgency, adminNotifications, setAdminNotifications],
  );

  // When application is rejected
  const onReject = useCallback(
    async (agencyId: string) => {
      const prevNotifications = adminNotifications;
      const updatedNotifications = prevNotifications.notifications.map(
        (notification) =>
          notification.entityId === notificationEntityId
            ? {
                ...notification,
                actionRequired: false,
                resolvedAt: new Date().toISOString(),
              }
            : notification,
      );

      setAdminNotifications({
        notifications: updatedNotifications,
        metaCounter: prevNotifications.metaCounter,
      });

      try {
        const admin = new AdminService();
        await admin.adminRejectApplication(agencyId);
        sweetTopSmallSuccessAlert("application rejected!");
      } catch (error) {
        console.log(
          "Error in onReject of AdminDashboardNotifications: ",
          error,
        );
        setAdminNotifications(prevNotifications);
        await sweetErrorHandling(error!);
      } finally {
        setModalOpen(false);
        setAgency(undefined);
        setEntityId(null);
      }
    },
    [adminNotifications, notificationEntityId, setAdminNotifications],
  );

  // When application is approved
  const onApprove = useCallback(
    async (agencyId: string) => {
      const prevNotifications = adminNotifications;
      const updatedNotifications = prevNotifications.notifications.map(
        (notification) =>
          notification.entityId === notificationEntityId
            ? {
                ...notification,
                actionRequired: false,
                resolvedAt: new Date().toISOString(),
              }
            : notification,
      );

      setAdminNotifications({
        notifications: updatedNotifications,
        metaCounter: prevNotifications.metaCounter,
      });

      try {
        const admin = new AdminService();
        await admin.adminApproveApplication(agencyId);
        sweetTopSmallSuccessAlert("application approved!");
      } catch (error) {
        console.log(
          "Error in onApprove of AdminDashboardNotifications: ",
          error,
        );
        setAdminNotifications(prevNotifications);
        await sweetErrorHandling(error!);
      } finally {
        setModalOpen(false);
        setAgency(undefined);
        setEntityId(null);
      }
    },
    [adminNotifications, notificationEntityId, setAdminNotifications],
  );
  // ----------------------------------------- RENDER --------------------------
  return (
    <div className="flex flex-col gap-y-5 h-full">
      <MyNotificationHeader
        title={"Admin Management for applications"}
        subtitle={
          "Review and manage requests from users for applying agency postions"
        }
        icon={Bell}
      />

      {loading ? (
        <SpinnerGrids columns={myNotificationsWrapperClasses} count={3} />
      ) : (
        <MyNotificationsContent
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          myNotifications={adminNotifications}
          myNotificationInput={notificationsInput}
          setMyNotificationsInput={setNotificationsInput}
          onReview={onReview}
          agency={agency}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </div>
  );
}
