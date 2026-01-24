import type { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import type { MyNotifications } from "@/lib/type/notification";
import { setAgencyNotifications } from "./slice";
import { retrieveAgencyNotifications } from "./selector";
import type { CommonInput } from "@/lib/type/common";
import AgencyService from "@/app/services/Agency.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import MyNotificationHeader from "@/app/components/notification/MyNotificationHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import MyNotificationsContent from "@/app/components/notification/MyNotificationsContent";

// ----------------------------------------- REUSABLE CLASSES --------------------------
export const myNotificationsWrapperClasses = "grid grid-cols-1 gap-4 py-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencyNotificationsDispatch = (dispatch: Dispatch) => ({
  setAgencyNotifications: (data: MyNotifications) =>
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

  // ----------------------------------------- RENDER --------------------------
  return (
    <div className="flex flex-col gap-y-5 h-full">
      <MyNotificationHeader />

      {loading ? (
        <SpinnerGrids columns={myNotificationsWrapperClasses} count={3} />
      ) : (
        <MyNotificationsContent
          myNotifications={agencyNotifications}
          myNotificationInput={notificationsInput}
          setMyNotificationsInput={setNotificationsInput}
        />
      )}
    </div>
  );
}
