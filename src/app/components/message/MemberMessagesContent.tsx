import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import React from "react";
import type { MemberMessages, Message } from "@/lib/type/message";
import MemberMessageCard from "./MemberMessageCard";
import { MemberMessageCardWrapperClasses } from "../../screens/dashboards/user/Messages";

interface MemberMessagesContentType {
  getMemberMessages: MemberMessages;
  getMemberMessagesInput: CommonInput;
  setGetMemberMessagesInput: SetStateType<CommonInput>;
  handleDeleteMessage: (id: string) => Promise<void>;
  handleSavebtn: (content: string, id: string) => Promise<void>;
  handleMarkRead: (id: string) => Promise<void>;
  handleReply: (oldMsg: Message, content: string) => Promise<void>;
}
const MemberMessagesContent: React.FC<MemberMessagesContentType> = React.memo(
  ({
    getMemberMessages,
    getMemberMessagesInput,
    setGetMemberMessagesInput,
    handleDeleteMessage,
    handleSavebtn,
    handleReply,
    handleMarkRead,
  }) => {
    return (
      <>
        {getMemberMessages?.messages?.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className={`${MemberMessageCardWrapperClasses}`}>
              {getMemberMessages?.messages.map((message: Message) => (
                <MemberMessageCard
                  handleMarkRead={handleMarkRead}
                  handleDeleteMessage={handleDeleteMessage}
                  message={message}
                  key={message?._id}
                  handleSavebtn={handleSavebtn}
                  handleReply={handleReply}
                />
              ))}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (getMemberMessages.metaCounter[0]?.total ?? 0) /
                  getMemberMessagesInput.limit,
              )}
              styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
              currentPage={getMemberMessagesInput.page}
              onPageChange={setGetMemberMessagesInput}
            />
          </div>
        ) : (
          <NoFound title="No user messages found" />
        )}
      </>
    );
  },
);

export default MemberMessagesContent;
