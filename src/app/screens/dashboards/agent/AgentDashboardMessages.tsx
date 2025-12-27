import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { MemberMessages, Message, MessageInput } from "@/lib/type/message";
import MemberService from "@/app/services/MemberService";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { AgentData } from "@/lib/type/agent";
import MemberMessagesHeader from "../../../components/message/MemberMessagesHeader";
import MemberMessagesContent from "@/app/components/message/MemberMessagesContent";
import { setGetAgentMessages } from "./slice";
import { retrieveGetAgentMessages } from "./selector";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const getAgentMessagesDispatch = (dispatch: Dispatch) => ({
  setGetAgentMessages: (data: MemberMessages) =>
    dispatch(setGetAgentMessages(data)),
});

const getAgentMessagesRetriever = createSelector(
  retrieveGetAgentMessages,
  (getAgentMessages) => ({ getAgentMessages })
);

export const MemberMessageCardWrapperClasses =
  "w-full grid gap-y-4 md:gap-y-2 grid-cols-1";
// --------------------------------------- COMPONENT --------------------
export default function AgentDashboardMessages() {
  const { authmember } = useGlobals();
  const member = authmember as AgentData;
  const { setGetAgentMessages } = getAgentMessagesDispatch(useDispatch());
  const { getAgentMessages } = useSelector(getAgentMessagesRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
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
  }, [getAgentMessagesInput, mainPageLoading]);
  // --------------------------------------- HANDLERS --------------------
  const handleDeleteMessage = useCallback(
    async (id: string) => {
      const oldMessages = getAgentMessages;
      const updatedMessages = oldMessages.messages.filter(
        (message) => message._id !== id
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
    [getAgentMessages, setGetAgentMessages]
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
    [getAgentMessages, setGetAgentMessages]
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
    [getAgentMessages, setGetAgentMessages, member]
  );
  // --------------------------------------- RENDER --------------------
  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      {loading ? (
        <SpinnerGrids columns={MemberMessageCardWrapperClasses} count={2} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <MemberMessagesHeader />
          <MemberMessagesContent
            getMemberMessages={getAgentMessages}
            getMemberMessagesInput={getAgentMessagesInput}
            setGetMemberMessagesInput={setGetAgentMessagesInput}
            setMainPageLoading={setMainPageLoading}
            handleDeleteMessage={handleDeleteMessage}
            handleSavebtn={handleSavebtn}
            handleReply={handleReply}
          />
        </div>
      )}
    </div>
  );
}
