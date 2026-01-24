import { myNotificationsWrapperClasses } from "@/app/screens/dashboards/agency/AgencyDashboardNotifications";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import type {
  AgencyNotifications,
  AgentNotificationCreation,
} from "@/lib/type/notification";
import React from "react";
import MyNotificationCard from "./MyNotificationCard";
import { PaginationCom } from "../PaginationCom";
import NoFound from "../NoFound";

interface MyNotificationsContentType {
  myNotifications: AgencyNotifications;
  myNotificationInput: CommonInput;
  setMyNotificationsInput: SetStateType<CommonInput>;
  onReview?: (entityId: string) => void;
  fetchDataLoading: boolean;
  setFetchDataLoading: SetStateType<boolean>;
}
const MyNotificationsContent: React.FC<MyNotificationsContentType> = React.memo(
  ({
    myNotificationInput,
    myNotifications,
    setMyNotificationsInput,
    onReview,
    fetchDataLoading,
    setFetchDataLoading,
  }) => {
    return (
      <>
        {myNotifications?.notifications?.length ? (
          <div className="flex-1 flex flex-col justify-between gap-y-6">
            <div className={myNotificationsWrapperClasses}>
              {myNotifications.notifications.map(
                (notification: AgentNotificationCreation) => (
                  <MyNotificationCard
                    notification={notification}
                    key={notification._id}
                    onReview={onReview}
                    fetchDataLoading={fetchDataLoading}
                    setFetchDataLoading={setFetchDataLoading}
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
      </>
    );
  },
);

export default MyNotificationsContent;
