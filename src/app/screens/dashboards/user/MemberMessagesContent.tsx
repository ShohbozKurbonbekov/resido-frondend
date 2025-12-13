import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import React from "react";
import type { MemberMessages, Message } from "@/lib/type/message";
import MemberMessageCard from "./MemberMessageCard";
import { MemberMessageCardWrapperClasses } from "./Messages";

interface MemberMessagesContentType {
  getMemberMessages: MemberMessages;
  getMemberMessagesInput: CommonInput;
  setGetMemberMessagesInput: SetStateType<CommonInput>;
  setMainPageLoading: SetStateType<boolean>;
}
const MemberMessagesContent: React.FC<MemberMessagesContentType> = React.memo(
  ({
    getMemberMessages,
    getMemberMessagesInput,
    setGetMemberMessagesInput,
    setMainPageLoading,
  }) => {
    return (
      <>
        {getMemberMessages?.messages?.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className={MemberMessageCardWrapperClasses}>
              {getMemberMessages?.messages.map((message: Message) => (
                <MemberMessageCard
                  message={message}
                  key={message?._id}
                  setMainPageLoading={setMainPageLoading}
                />
              ))}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (getMemberMessages.metaCounter[0]?.total ?? 0) /
                  getMemberMessagesInput.limit
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
  }
);

export default MemberMessagesContent;
