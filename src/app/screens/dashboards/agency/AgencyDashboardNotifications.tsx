import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { setAgencyNotifications } from "./slice";
import { retrieveAgencyNotifications } from "./selector";
import type { CommonInput } from "@/lib/type/common";
import AgencyService from "@/app/services/Agency.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import MyNotificationHeader from "@/app/components/notification/MyNotificationHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import MyNotificationsContent from "@/app/components/notification/MyNotificationsContent";
import { Bell } from "lucide-react";
import type { AgencyNotifications } from "@/lib/type/notification";
import NotificationService from "@/app/services/Notification.service";
import type { AgentData } from "@/lib/type/agent";
import { AgentNotificationType } from "@/lib/enums/notification.enum";

// ----------------------------------------- REUSABLE CLASSES  AND OTHERS --------------------------
export const myNotificationsWrapperClasses = "grid grid-cols-1 gap-4 py-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencyNotificationsDispatch = (dispatch: Dispatch) => ({
  setAgencyNotifications: (data: AgencyNotifications) =>
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

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(false);
  const [agent, setAgent] = useState<AgentData | null>(null);
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

  const onReview = useCallback(
    async (entityId: string) => {
      const prevNotifications = agencyNotifications;
      const updatedNotifications = prevNotifications.notifications.map(
        (notification) =>
          notification.entityId === entityId
            ? {
                ...notification,
                actionRequired: false,
                type: AgentNotificationType.AGENT_APPLICATION_CONFIRMED,
              }
            : notification,
      );

      setAgencyNotifications({
        metaCounter: prevNotifications.metaCounter,
        notifications: updatedNotifications,
      });
      try {
        const notification = new NotificationService();
        const result = await notification.reviewNotification(entityId);
        setAgent(result.agent);
      } catch (error) {
        setAgencyNotifications(prevNotifications);
        console.log("Error in onReview: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setFetchDataLoading(false);
      }
    },
    [setAgent, agencyNotifications, setAgencyNotifications],
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
          myNotifications={agencyNotifications}
          myNotificationInput={notificationsInput}
          setMyNotificationsInput={setNotificationsInput}
          onReview={onReview}
          fetchDataLoading={fetchDataLoading}
          setFetchDataLoading={setFetchDataLoading}
        />
      )}
    </div>
  );
}
