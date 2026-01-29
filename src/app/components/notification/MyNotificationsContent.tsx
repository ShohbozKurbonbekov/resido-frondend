import { myNotificationsWrapperClasses } from "@/app/screens/dashboards/agency/AgencyDashboardNotifications";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import type {
  AgencyNotifications,
  NotificationCreation,
} from "@/lib/type/notification";
import React from "react";
import MyNotificationCard from "./MyNotificationCard";
import { PaginationCom } from "../PaginationCom";
import NoFound from "../NoFound";
import type { AgentData } from "@/lib/type/agent";
import type { Agency } from "@/lib/type/agency";
import ReviewApplicationModal from "./ReviewApplicationModal";
import AgentReviewContent from "@/app/screens/dashboards/agent/AgentReviewContent";
import AgencyReviewContent from "@/app/screens/dashboards/agency/AgencyReviewContent";

interface MyNotificationsContentType {
  myNotifications: AgencyNotifications;
  myNotificationInput: CommonInput;
  setMyNotificationsInput: SetStateType<CommonInput>;
  onReview?: (entityId: string) => void;
  modalOpen: boolean;
  setModalOpen: SetStateType<boolean>;
  agent?: AgentData;
  agency?: Agency;
  onApprove?: (agentId: string) => Promise<void>;
  onReject?: (agentId: string) => Promise<void>;
}
const MyNotificationsContent: React.FC<MyNotificationsContentType> = React.memo(
  ({
    myNotificationInput,
    myNotifications,
    setMyNotificationsInput,
    onReview,
    agency,
    agent,
    modalOpen,
    setModalOpen,
    onApprove,
    onReject,
  }) => {
    return (
      <>
        {myNotifications?.notifications?.length ? (
          <div className="flex-1 flex flex-col justify-between gap-y-6">
            <div className={myNotificationsWrapperClasses}>
              {myNotifications.notifications.map(
                (notification: NotificationCreation) =>
                  notification.resolvedAt ? null : (
                    <MyNotificationCard
                      notification={notification}
                      key={notification._id}
                      onReview={onReview}
                    />
                  ),
              )}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (myNotifications.metaCounter[0]?.total ?? 0) /
                  myNotificationInput.limit,
              )}
              styleclasses="flex flex-row items-center justify-center  gap-3"
              currentPage={myNotificationInput.page}
              onPageChange={setMyNotificationsInput}
            />
          </div>
        ) : (
          <NoFound title="No blogs found" />
        )}
        {agent && (
          <ReviewApplicationModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <AgentReviewContent
              agent={agent}
              onApprove={onApprove}
              onReject={onReject}
            />
          </ReviewApplicationModal>
        )}

        {agency && (
          <ReviewApplicationModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <AgencyReviewContent agency={agency} />
          </ReviewApplicationModal>
        )}
      </>
    );
  },
);

export default MyNotificationsContent;
