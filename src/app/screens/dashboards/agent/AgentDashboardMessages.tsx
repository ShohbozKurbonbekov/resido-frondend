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
import type { AgentData } from "@/lib/type/agent";
import MemberMessagesHeader from "../../../components/message/MemberMessagesHeader";
import MemberMessagesContent from "@/app/components/message/MemberMessagesContent";
import { setGetAgentMessages } from "./slice";
import { retrieveGetAgentMessages } from "./selector";
import { MemberMessageCardWrapperClasses } from "@/lib/config";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const getAgentMessagesDispatch = (dispatch: Dispatch) => ({
  setGetAgentMessages: (data: MemberMessages) =>
    dispatch(setGetAgentMessages(data)),
});

const getAgentMessagesRetriever = createSelector(
  retrieveGetAgentMessages,
  (getAgentMessages) => ({ getAgentMessages }),
);

// --------------------------------------- COMPONENT --------------------
export default function AgentDashboardMessages() {
  const { authmember } = useGlobals();
  const member = authmember as AgentData;
  const { setGetAgentMessages } = getAgentMessagesDispatch(useDispatch());
  const { getAgentMessages } = useSelector(getAgentMessagesRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [getAgentMessagesInput, setGetAgentMessagesInput] =
    useState<CommonInput>({
      page: 1,
      limit: 4,
    });

  useEffect(() => {
    const member = new MemberService();
    const fetchGetAgentMessages = async () => {
      try {
        const result = await member.getMemberMessages(getAgentMessagesInput);
        setGetAgentMessages(result);
      } catch (error) {
        console.log("Error in fetchGetAgentMessages: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };

    fetchGetAgentMessages();
  }, [getAgentMessagesInput]);
  // --------------------------------------- HANDLERS --------------------
  const handleDeleteMessage = useCallback(
    async (id: string) => {
      const oldMessages = getAgentMessages;
      const updatedMessages = oldMessages.messages.filter(
        (message) => message._id !== id,
      );
      setGetAgentMessages({
        messages: updatedMessages,
        metaCounter: [
          { total: Math.max(0, (oldMessages.metaCounter[0]?.total || 1) - 1) },
        ],
      });

      const member = new MemberService();
      try {
        await member.deleteMessage(id);
      } catch (error) {
        console.log("Error in handleDeleteMessage: ", error);
        await sweetErrorHandling(error!);
        setGetAgentMessages(oldMessages);
      }
    },
    [getAgentMessages, setGetAgentMessages],
  );

  const handleSavebtn = useCallback(
    async (content: string, id: string) => {
      const oldMessages = getAgentMessages;
      const updatedMessages = oldMessages.messages.map((message) => {
        if (message._id === id) {
          return { ...message, content: content, isEdited: true };
        } else {
          return message;
        }
      });
      setGetAgentMessages({
        messages: updatedMessages,
        metaCounter: oldMessages.metaCounter,
      });
      try {
        const member = new MemberService();
        await member.messageEdit(id, content);
      } catch (error) {
        console.log("Error in handleSavebtn: ", error);
        await sweetErrorHandling(error!);
        setGetAgentMessages(oldMessages);
      }
    },
    [getAgentMessages, setGetAgentMessages],
  );

  const handleReply = useCallback(
    async (oldMsg: Message, content: string) => {
      if (!member) return;
      const prevMsgs = getAgentMessages;
      const target = new MemberService();
      const receiverId =
        member?._id === oldMsg.senderId ? oldMsg.receiverId : oldMsg.senderId;
      const receiverType =
        member._id === oldMsg.senderId
          ? oldMsg.receiverType
          : oldMsg.senderType;
      const input: MessageInput = {
        content,
        email: member?.socialLinks?.email ?? "",
        phone: member.phone,
        senderType: member.role,
        subject: oldMsg?.subject,
        receiverId,
        receiverType,
      };
      try {
        const result = await target.writeMessageMember(input);
        setGetAgentMessages({
          messages: [result, ...prevMsgs.messages],
          metaCounter: [{ total: (prevMsgs.metaCounter[0]?.total ?? 0) + 1 }],
        });
      } catch (error) {
        console.log("Error in handleReply: ", error);
        await sweetErrorHandling(error!);
        setGetAgentMessages(prevMsgs);
      }
    },
    [getAgentMessages, setGetAgentMessages, member],
  );

  const handleMarkRead = useCallback(
    async (id: string) => {
      const prevMsgs = getAgentMessages;
      const updatedMsg = prevMsgs.messages.map((msg) =>
        msg._id === id
          ? { ...msg, isRead: true, whenIsRead: new Date().toISOString() }
          : msg,
      );
      setGetAgentMessages({
        messages: updatedMsg,
        metaCounter: prevMsgs.metaCounter,
      });

      try {
        const member = new MemberService();
        await member.messageRead(id);
      } catch (error) {
        console.log("Error in handleMarkRead: ", error);
        await sweetErrorHandling(error!);
        setGetAgentMessages(prevMsgs);
      }
    },
    [getAgentMessages, setGetAgentMessages],
  );

  console.log(getAgentMessages);
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
            getMemberMessages={getAgentMessages}
            getMemberMessagesInput={getAgentMessagesInput}
            setGetMemberMessagesInput={setGetAgentMessagesInput}
            handleDeleteMessage={handleDeleteMessage}
            handleSavebtn={handleSavebtn}
            handleReply={handleReply}
          />
        </div>
      )}
    </div>
  );
}
