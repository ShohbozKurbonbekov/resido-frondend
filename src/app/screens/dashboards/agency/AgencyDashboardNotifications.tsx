import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { setAgencyNotifications } from "./slice";
import { retrieveAgencyNotifications } from "./selector";
import type { CommonInput } from "@/lib/type/common";
import AgencyService from "@/app/services/Agency.service";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import MyNotificationHeader from "@/app/components/notification/MyNotificationHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import MyNotificationsContent from "@/app/components/notification/MyNotificationsContent";
import { Bell } from "lucide-react";
import NotificationService from "@/app/services/Notification.service";
import type { AgentData } from "@/lib/type/agent";
import type {
  NotificationCreation,
  NotificationsType,
} from "@/lib/type/notification";

// ----------------------------------------- REUSABLE CLASSES  AND OTHERS --------------------------
export const myNotificationsWrapperClasses = "grid grid-cols-1 gap-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencyNotificationsDispatch = (dispatch: Dispatch) => ({
  setAgencyNotifications: (data: NotificationsType<NotificationCreation>) =>
    dispatch(setAgencyNotifications(data)),
});

const agencyNotificationRetriever = createSelector(
  retrieveAgencyNotifications,
  (agencyNotifications) => ({ agencyNotifications }),
);

// ----------------------------------------- COMPONENT --------------------------
export default function AgencyDashboardNotifications() {
  const { setAgencyNotifications } = agencyNotificationsDispatch(useDispatch());
  const { agencyNotifications } = useSelector(agencyNotificationRetriever);

  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [agent, setAgent] = useState<AgentData | undefined>(undefined);
  const [notificationEntityId, setEntityId] = useState<null | string>(null);
  const [notificationsInput, setNotificationsInput] = useState<CommonInput>({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    const agency = new AgencyService();
    (async () => {
      try {
        const result = await agency.myNotifications(notificationsInput);
        setAgencyNotifications(result);
      } catch (error) {
        console.log(
          "Error in myNotifications of AgencyDashboardNotifications : ",
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
      const prevNotifications = agencyNotifications;
      const updatedNotifications = prevNotifications.notifications.map(
        (notification) =>
          notification.entityId === entityId
            ? {
                ...notification,
                actionRequired: false,
              }
            : notification,
      );

      setAgencyNotifications({
        metaCounter: prevNotifications.metaCounter,
        notifications: updatedNotifications,
      });

      setEntityId(entityId);
      try {
        const notification = new NotificationService();
        const result = await notification.reviewNotification(entityId);
        setAgent(result.agent);
        setModalOpen(true);
      } catch (error) {
        setAgencyNotifications(prevNotifications);
        console.log("Error in onReview: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [setAgent, agencyNotifications, setAgencyNotifications],
  );

  // When application is rejected
  const onReject = useCallback(
    async (agentId: string) => {
      const prevNotifications = agencyNotifications;
      const updatedNotifications = agencyNotifications.notifications.map(
        (notification) =>
          notification.entityId === notificationEntityId
            ? {
                ...notification,
                actionRequired: false,
                resolvedAt: new Date().toISOString(),
              }
            : notification,
      );

      setAgencyNotifications({
        notifications: updatedNotifications,
        metaCounter: prevNotifications.metaCounter,
      });

      try {
        const agency = new AgencyService();
        await agency.agencyRejectApplication(agentId);
        sweetTopSmallSuccessAlert("application rejected!");
      } catch (error) {
        console.log(
          "Error in onReject of AgencyDashboardNotifications: ",
          error,
        );
        setAgencyNotifications(prevNotifications);
        await sweetErrorHandling(error!);
      } finally {
        setModalOpen(false);
        setAgent(undefined);
        setEntityId(null);
      }
    },
    [agencyNotifications, notificationEntityId, setAgencyNotifications],
  );

  // When application is approved
  const onApprove = useCallback(
    async (agentId: string) => {
      const prevNotifications = agencyNotifications;
      const updatedNotifications = agencyNotifications.notifications.map(
        (notification) =>
          notification.entityId === notificationEntityId
            ? {
                ...notification,
                actionRequired: false,
                resolvedAt: new Date().toISOString(),
              }
            : notification,
      );

      setAgencyNotifications({
        notifications: updatedNotifications,
        metaCounter: prevNotifications.metaCounter,
      });

      try {
        const agency = new AgencyService();
        await agency.agencyApproveApplication(agentId);
        sweetTopSmallSuccessAlert("application approved!");
      } catch (error) {
        console.log(
          "Error in onApprove of AgencyDashboardNotifications: ",
          error,
        );
        setAgencyNotifications(prevNotifications);
        await sweetErrorHandling(error!);
      } finally {
        setModalOpen(false);
        setAgent(undefined);
        setEntityId(null);
      }
    },
    [agencyNotifications, notificationEntityId, setAgencyNotifications],
  );
  // ----------------------------------------- RENDER --------------------------
  return (
    <div className="flex flex-col gap-y-5 h-full">
      <MyNotificationHeader
        title={"Agent Applications"}
        subtitle={
          "Review and manage requests from users applying to join your agency"
        }
        icon={Bell}
      />

      {loading ? (
        <SpinnerGrids columns={myNotificationsWrapperClasses} count={3} />
      ) : (
        <MyNotificationsContent
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          myNotifications={agencyNotifications}
          myNotificationInput={notificationsInput}
          setMyNotificationsInput={setNotificationsInput}
          onReview={onReview}
          agent={agent}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </div>
  );
}
