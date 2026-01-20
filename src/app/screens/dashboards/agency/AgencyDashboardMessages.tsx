import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { MemberMessages, Message, MessageInput } from "@/lib/type/message";
import MemberService from "@/app/services/Member.service";
import { useGlobals } from "@/app/hooks/useGlobals";
import MemberMessagesHeader from "../../../components/message/MemberMessagesHeader";
import MemberMessagesContent from "@/app/components/message/MemberMessagesContent";
import { MemberMessageCardWrapperClasses } from "@/lib/config";
import type { Agency } from "@/lib/type/agency";
import { retrieveGetAgencyMessages } from "./selector";
import { setGetAgencyMessages } from "./slice";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const getAgencyMessagesDispatch = (dispatch: Dispatch) => ({
  setGetAgencyMessages: (data: MemberMessages) =>
    dispatch(setGetAgencyMessages(data)),
});

const getAgencyMessagesRetriever = createSelector(
  retrieveGetAgencyMessages,
  (getAgencyMessages) => ({ getAgencyMessages }),
);

// --------------------------------------- COMPONENT --------------------
export default function AgencyDashboardMessages() {
  const { authmember } = useGlobals();
  const member = authmember as Agency;
  const { setGetAgencyMessages } = getAgencyMessagesDispatch(useDispatch());

  const { getAgencyMessages } = useSelector(getAgencyMessagesRetriever);

  const [loading, setLoading] = useState<boolean>(true);
  const [getAgencyMessagesInput, setGetAgencyMessagesInput] =
    useState<CommonInput>({
      page: 1,
      limit: 4,
    });

  useEffect(() => {
    const member = new MemberService();
    const fetchGetAgencyMessages = async () => {
      try {
        const result = await member.getMemberMessages(getAgencyMessagesInput);
        setGetAgencyMessages(result);
      } catch (error) {
        console.log("Error in fetchGetAgencyMessages: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };

    fetchGetAgencyMessages();
  }, [getAgencyMessagesInput]);
  // --------------------------------------- HANDLERS --------------------
  const handleDeleteMessage = useCallback(
    async (id: string) => {
      const oldMessages = getAgencyMessages;
      const updatedMessages = oldMessages.messages.filter(
        (message) => message._id !== id,
      );
      setGetAgencyMessages({
        messages: updatedMessages,
        metaCounter: [
          { total: Math.max(0, (oldMessages.metaCounter[0]?.total || 1) - 1) },
        ],
      });

      const member = new MemberService();
      try {
        await member.deleteMessage(id);
      } catch (error) {
        console.log(
          "Error in handleDeleteMessage of AgencyDashboardMessages: ",
          error,
        );
        await sweetErrorHandling(error!);
        setGetAgencyMessages(oldMessages);
      }
    },
    [getAgencyMessages, setGetAgencyMessages],
  );

  const handleSavebtn = useCallback(
    async (content: string, id: string) => {
      const oldMessages = getAgencyMessages;
      const updatedMessages = oldMessages.messages.map((message) => {
        if (message._id === id) {
          return { ...message, content: content, isEdited: true };
        } else {
          return message;
        }
      });

      setGetAgencyMessages({
        messages: updatedMessages,
        metaCounter: oldMessages.metaCounter,
      });
      try {
        const member = new MemberService();
        await member.messageEdit(id, content);
      } catch (error) {
        console.log(
          "Error in handleSavebtn of AgencyDashboardMessages: ",
          error,
        );
        await sweetErrorHandling(error!);
        setGetAgencyMessages(oldMessages);
      }
    },
    [getAgencyMessages, setGetAgencyMessages],
  );

  const handleReply = useCallback(
    async (oldMsg: Message, content: string) => {
      if (!member) return;
      const prevMsgs = getAgencyMessages;
      const target = new MemberService();
      const receiverId =
        member?._id === oldMsg.senderId ? oldMsg.receiverId : oldMsg.senderId;
      const receiverType =
        member._id === oldMsg.senderId
          ? oldMsg.receiverType
          : oldMsg.senderType;
      const input: MessageInput = {
        content,
        email: member.memberEmail ?? "",
        phone: member.memberPhone,
        senderType: member.role,
        subject: oldMsg?.subject,
        receiverId,
        receiverType,
      };
      try {
        const result = await target.writeMessageMember(input);
        setGetAgencyMessages({
          messages: [result, ...prevMsgs.messages],
          metaCounter: [{ total: (prevMsgs.metaCounter[0]?.total ?? 0) + 1 }],
        });
      } catch (error) {
        console.log("Error in handleReply of AgencyDashboardMessages: ", error);
        await sweetErrorHandling(error!);
        setGetAgencyMessages(prevMsgs);
      }
    },
    [getAgencyMessages, setGetAgencyMessages, member],
  );

  const handleMarkRead = useCallback(
    async (id: string) => {
      const prevMsgs = getAgencyMessages;
      const updatedMsg = prevMsgs.messages.map((msg) =>
        msg._id === id
          ? { ...msg, isRead: true, whenIsRead: new Date().toISOString() }
          : msg,
      );
      setGetAgencyMessages({
        messages: updatedMsg,
        metaCounter: prevMsgs.metaCounter,
      });

      try {
        const member = new MemberService();
        await member.messageRead(id);
      } catch (error) {
        console.log(
          "Error in handleMarkRead of AgencyDashboardMessages: ",
          error,
        );
        await sweetErrorHandling(error!);
        setGetAgencyMessages(prevMsgs);
      }
    },
    [getAgencyMessages, setGetAgencyMessages],
  );

  // --------------------------------------- RENDER --------------------
  return (
    <div className="h-full">
      {loading ? (
        <SpinnerGrids columns={MemberMessageCardWrapperClasses} count={2} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <MemberMessagesHeader />
          <MemberMessagesContent
            handleMarkRead={handleMarkRead}
            getMemberMessages={getAgencyMessages}
            getMemberMessagesInput={getAgencyMessagesInput}
            setGetMemberMessagesInput={setGetAgencyMessagesInput}
            handleDeleteMessage={handleDeleteMessage}
            handleSavebtn={handleSavebtn}
            handleReply={handleReply}
          />
        </div>
      )}
    </div>
  );
}
