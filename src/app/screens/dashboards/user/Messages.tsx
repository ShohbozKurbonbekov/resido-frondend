import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setGetMemberMessages } from "./slice";
import { retrieveGetMemberMessages } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { MemberMessages, Message, MessageInput } from "@/lib/type/message";
import MemberService from "@/app/services/MemberService";
import MemberMessagesHeader from "../../../components/message/MemberMessagesHeader";
import MemberMessagesContent from "../../../components/message/MemberMessagesContent";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { User } from "@/lib/type/dashboard/user";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const getMemberMessagesDispatch = (dispatch: Dispatch) => ({
  setGetMemberMessages: (data: MemberMessages) =>
    dispatch(setGetMemberMessages(data)),
});

const getMemberMessagesRetriever = createSelector(
  retrieveGetMemberMessages,
  (getMemberMessages) => ({ getMemberMessages }),
);

export const MemberMessageCardWrapperClasses =
  "w-full grid gap-y-4 md:gap-y-2 grid-cols-1";
// --------------------------------------- COMPONENT --------------------
export default function Messages() {
  const { authmember } = useGlobals();
  const member = authmember as User;
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
  // --------------------------------------- HANDLERS --------------------
  const handleDeleteMessage = useCallback(
    async (id: string) => {
      const oldMessages = getMemberMessages;
      const updatedMessages = oldMessages.messages.filter(
        (message) => message._id !== id,
      );
      setGetMemberMessages({
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
        setGetMemberMessages(oldMessages);
      }
    },
    [getMemberMessages, setGetMemberMessages],
  );

  const handleSavebtn = useCallback(
    async (content: string, id: string) => {
      const oldMessages = getMemberMessages;
      const updatedMessages = oldMessages.messages.map((message) => {
        if (message._id === id) {
          return { ...message, content: content, isEdited: true };
        } else {
          return message;
        }
      });
      setGetMemberMessages({
        messages: updatedMessages,
        metaCounter: oldMessages.metaCounter,
      });
      try {
        const member = new MemberService();
        await member.messageEdit(id, content);
      } catch (error) {
        console.log("Error in handleSavebtn: ", error);
        await sweetErrorHandling(error!);
        setGetMemberMessages(oldMessages);
      }
    },
    [getMemberMessages, setGetMemberMessages],
  );

  const handleReply = useCallback(
    async (oldMsg: Message, content: string) => {
      if (!member) return;
      const prevMsgs = getMemberMessages;
      const target = new MemberService();
      const receiverId =
        member?._id === oldMsg.senderId ? oldMsg.receiverId : oldMsg.senderId;
      const receiverType =
        member._id === oldMsg.senderId
          ? oldMsg.receiverType
          : oldMsg.senderType;
      const input: MessageInput = {
        content,
        email: member.memberEmail,
        phone: member.memberPhone,
        senderType: member.role,
        subject: oldMsg?.subject,
        receiverId,
        receiverType,
      };
      try {
        const result = await target.writeMessageMember(input);
        setGetMemberMessages({
          messages: [result, ...prevMsgs.messages],
          metaCounter: [{ total: (prevMsgs.metaCounter[0]?.total ?? 0) + 1 }],
        });
      } catch (error) {
        console.log("Error in handleReply: ", error);
        await sweetErrorHandling(error!);
        setGetMemberMessages(prevMsgs);
      }
    },
    [getMemberMessages, setGetMemberMessages, member],
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
            getMemberMessages={getMemberMessages}
            getMemberMessagesInput={getMemberMessagesInput}
            setGetMemberMessagesInput={setGetMemberMessagesInput}
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
