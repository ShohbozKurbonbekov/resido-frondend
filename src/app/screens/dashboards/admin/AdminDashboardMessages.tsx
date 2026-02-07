import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { MemberMessages, Message, MessageInput } from "@/lib/type/message";
import { setAdminMessages } from "./slice";
import { createSelector } from "reselect";
import { retrieveAdminMessages } from "./selector";
import { useCallback, useEffect, useState } from "react";
import type { CommonInput } from "@/lib/type/common";
import MemberService from "@/app/services/Member.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { User } from "@/lib/type/dashboard/user";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { MemberMessageCardWrapperClasses } from "@/lib/config";
import MemberMessagesHeader from "@/app/components/message/MemberMessagesHeader";
import MemberMessagesContent from "@/app/components/message/MemberMessagesContent";

// ------------------- Redux integration ------------------
const adminMessagesDispatch = (dispatch: Dispatch) => ({
  setAdminMessages: (data: MemberMessages) => dispatch(setAdminMessages(data)),
});

const adminMessagesRetriever = createSelector(
  retrieveAdminMessages,
  (adminMessages) => ({ adminMessages }),
);

// ------------------- Component ------------------
export default function AdminDashboardMessages() {
  const { authmember } = useGlobals();
  const admin = authmember as User;

  const { setAdminMessages } = adminMessagesDispatch(useDispatch());
  const { adminMessages } = useSelector(adminMessagesRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminMessagesInput, setAdminMessagesInput] = useState<CommonInput>({
    page: 1,
    limit: 4,
  });

  // Fetch messages
  useEffect(() => {
    const member = new MemberService();
    (async () => {
      try {
        const result = await member.getMemberMessages(adminMessagesInput);
        setAdminMessages(result);
      } catch (error) {
        console.log("Error in AdminDashboardMessages: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [adminMessagesInput]);

  // ------------------- Handlers ------------------
  const handleDeleteMessage = useCallback(
    async (id: string) => {
      const oldMessages = adminMessages;
      const updatedMessages = oldMessages.messages.filter(
        (message) => message._id !== id,
      );
      setAdminMessages({
        messages: updatedMessages,
        metaCounter: [
          { total: Math.max(0, (oldMessages.metaCounter[0]?.total || 1) - 1) },
        ],
      });

      try {
        const member = new MemberService();
        await member.deleteMessage(id);
      } catch (error) {
        console.log(
          "Error in handleDeleteMessage of AgencyDashboardMessages: ",
          error,
        );
        await sweetErrorHandling(error!);
        setAdminMessages(oldMessages);
      }
    },
    [setAdminMessages, adminMessages],
  );

  const handleSavebtn = useCallback(
    async (content: string, id: string) => {
      const oldMessages = adminMessages;
      const updatedMessages = oldMessages.messages.map((message) => {
        if (message._id === id) {
          return { ...message, content: content, isEdited: true };
        } else {
          return message;
        }
      });

      setAdminMessages({
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
        setAdminMessages(oldMessages);
      }
    },
    [setAdminMessages, adminMessages],
  );

  const handleReply = useCallback(
    async (oldMsg: Message, content: string) => {
      if (!admin) return;
      const prevMsgs = adminMessages;
      const target = new MemberService();
      const receiverId =
        admin?._id === oldMsg.senderId ? oldMsg.receiverId : oldMsg.senderId;
      const receiverType =
        admin._id === oldMsg.senderId ? oldMsg.receiverType : oldMsg.senderType;
      const input: MessageInput = {
        content,
        email: admin.memberEmail ?? "",
        phone: admin.memberPhone,
        senderType: admin.role,
        subject: oldMsg?.subject,
        receiverId,
        receiverType,
      };
      try {
        const result = await target.writeMessageMember(input);
        setAdminMessages({
          messages: [result, ...prevMsgs.messages],
          metaCounter: [{ total: (prevMsgs.metaCounter[0]?.total ?? 0) + 1 }],
        });
      } catch (error) {
        console.log("Error in handleReply of AdminDashboardMessages: ", error);
        await sweetErrorHandling(error!);
        setAdminMessages(prevMsgs);
      }
    },
    [adminMessages, setAdminMessages, admin],
  );

  const handleMarkRead = useCallback(
    async (id: string) => {
      const prevMsgs = adminMessages;
      const updatedMsg = prevMsgs.messages.map((msg) =>
        msg._id === id
          ? { ...msg, isRead: true, whenIsRead: new Date().toISOString() }
          : msg,
      );
      setAdminMessages({
        messages: updatedMsg,
        metaCounter: prevMsgs.metaCounter,
      });

      try {
        const member = new MemberService();
        await member.messageRead(id);
      } catch (error) {
        console.log(
          "Error in handleMarkRead of AdminDashboardMessages: ",
          error,
        );
        await sweetErrorHandling(error!);
        setAdminMessages(prevMsgs);
      }
    },
    [adminMessages, setAdminMessages],
  );

  // ------------------- Render ------------------
  if (!admin) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-full">
      {loading ? (
        <SpinnerGrids columns={MemberMessageCardWrapperClasses} count={2} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <MemberMessagesHeader />
          <MemberMessagesContent
            handleMarkRead={handleMarkRead}
            getMemberMessages={adminMessages}
            getMemberMessagesInput={adminMessagesInput}
            setGetMemberMessagesInput={setAdminMessagesInput}
            handleDeleteMessage={handleDeleteMessage}
            handleSavebtn={handleSavebtn}
            handleReply={handleReply}
          />
        </div>
      )}
    </div>
  );
}
