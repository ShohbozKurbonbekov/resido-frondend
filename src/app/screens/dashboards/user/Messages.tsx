import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setGetMemberMessages } from "./slice";
import { retrieveGetMemberMessages } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { MemberMessages } from "@/lib/type/message";
import MemberService from "@/app/services/MemberService";
import MemberMessagesHeader from "./MemberMessagesHeader";
import MemberMessagesContent from "./MemberMessagesContent";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const getMemberMessagesDispatch = (dispatch: Dispatch) => ({
  setGetMemberMessages: (data: MemberMessages) =>
    dispatch(setGetMemberMessages(data)),
});

const getMemberMessagesRetriever = createSelector(
  retrieveGetMemberMessages,
  (getMemberMessages) => ({ getMemberMessages })
);

export const MemberMessageCardWrapperClasses =
  "w-full grid gap-y-4 md:gap-y-5 grid-cols-1";
// --------------------------------------- COMPONENT --------------------
export default function Messages() {
  const { setGetMemberMessages } = getMemberMessagesDispatch(useDispatch());
  const { getMemberMessages } = useSelector(getMemberMessagesRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
  const [getMemberMessagesInput, setGetMemberMessagesInput] =
    useState<CommonInput>({
      page: 1,
      limit: 4,
    });

  useEffect(() => {
    const member = new MemberService();
    const fetchGetMemberMessages = async () => {
      try {
        const result = await member.getMemberMessages(getMemberMessagesInput);
        setGetMemberMessages(result);
      } catch (error) {
        console.log("Error in fetching getMemberMessages: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };

    fetchGetMemberMessages();
  }, [getMemberMessagesInput, mainPageLoading]);
  // --------------------------------------- COMPONENT --------------------
  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      {loading ? (
        <SpinnerGrids columns={MemberMessageCardWrapperClasses} count={2} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <MemberMessagesHeader />
          <MemberMessagesContent
            getMemberMessages={getMemberMessages}
            getMemberMessagesInput={getMemberMessagesInput}
            setGetMemberMessagesInput={setGetMemberMessagesInput}
            setMainPageLoading={setMainPageLoading}
          />
        </div>
      )}
    </div>
  );
}
