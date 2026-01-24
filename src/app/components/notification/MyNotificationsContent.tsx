import type { CommonInput, SetStateType } from "@/lib/type/common";
import type { MyNotifications } from "@/lib/type/notification";
import React from "react";

interface MyNotificationsContentType {
  myNotifications: MyNotifications;
  myNotificationInput: CommonInput;
  setMyNotificationsInput: SetStateType<CommonInput>;
}
const MyNotificationsContent: React.FC<MyNotificationsContentType> = React.memo(
  ({ myNotificationInput, myNotifications, setMyNotificationsInput }) => {
    return <div>MyNotificationsContent </div>;
  },
);

export default MyNotificationsContent;
