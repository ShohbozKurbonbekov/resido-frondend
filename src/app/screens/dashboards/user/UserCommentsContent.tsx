import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import React from "react";
import type { Comment, Comments } from "@/lib/type/comment";
import UserCommentsCard from "./UserCommentsCard";
import { UserCardWrapperClasses } from "./Reviews";

interface UserCommentsContentType {
  getUserComments: Comments;
  getUserCommentsInput: CommonInput;
  setGetUserCommentsInput: SetStateType<CommonInput>;
  setMainPageLoading: SetStateType<boolean>;
}
const UserCommentsContent: React.FC<UserCommentsContentType> = React.memo(
  ({
    getUserComments,
    getUserCommentsInput,
    setGetUserCommentsInput,
    setMainPageLoading,
  }) => {
    return (
      <>
        {getUserComments?.comments.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className={UserCardWrapperClasses}>
              {getUserComments?.comments.map((comment: Comment) => (
                <UserCommentsCard
                  comment={comment}
                  key={comment?._id}
                  setMainPageLoading={setMainPageLoading}
                />
              ))}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (getUserComments.metaCounter[0]?.total ?? 0) /
                  getUserCommentsInput.limit
              )}
              styleclasses="flex flex-row items-center justify-center mt-6 gap-3"
              currentPage={getUserCommentsInput.page}
              onPageChange={setGetUserCommentsInput}
            />
          </div>
        ) : (
          <NoFound title="No user comments found" />
        )}
      </>
    );
  }
);

export default UserCommentsContent;
