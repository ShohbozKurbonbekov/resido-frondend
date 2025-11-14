import { CommentsCom } from "@/app/components/dialog/Index";
import Stars from "@/app/components/Stars";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import type { Comments } from "@/lib/type/comment";
import { customiseTime } from "@/lib/utils";
import { MessageCircleMore, MessageSquareOff } from "lucide-react";
import React, { useCallback, useContext, useMemo } from "react";
import type { Comment } from "@/lib/type/comment";
import { ChosenPropCommentsContext } from "@/app/context/PropertyCommentsContex";

// ---------------------------------------------- COMPONENT ----------------------------------
interface ChosenPropertyReviewsType {
  chosenPropComments: Comments;
}

const ChosenPropertyReviews: React.FC<ChosenPropertyReviewsType> = React.memo(
  ({ chosenPropComments: { comments, metaCounter } }) => {
    const { setPropertyComments, propertyComments } = useContext(
      ChosenPropCommentsContext
    );
    const firstFourComments = useMemo(() => comments.slice(0, 4), [comments]);
    // ------------------------------------------ HANDLERS -----------------------------------------
    const commentedDate = useCallback(
      (time: string) => customiseTime(time),
      []
    );

    // ------------------------------------------- DIALOG COMMENTS -------------------------------
    const triggerBtn = useMemo(
      () => (
        <button className="bg-transparent border-green-700 border-2 py-3 px-5 rounded-md font-jostFont text-base capitalize hover:bg-green-500 hover:text-white transition-all duration-200 hover:border-transparent ease-linear active:scale-95 text-slate-500 mt-4">
          See other comments
        </button>
      ),
      []
    );
    const dialogDescription = useMemo(
      () => (
        <p className="text-lg py-3 font-jostFont text-slate-500 border-b-2 flex flex-row justify-between">
          {metaCounter[0]?.total ?? 0} Comments all
          <MessageCircleMore className="w-8 h-8 text-slate-500" />
        </p>
      ),
      [metaCounter]
    );

    const submitButton = useMemo(() => {
      return comments.length === metaCounter[0].total ? null : (
        <button
          className="w-full py-2 border-green-700 border-2 text-base  font-jostFont mt-3 capitalize  text-slate-500 hover:bg-green-700 hover:text-white transition-all duration-200 ease-linear active:scale-95"
          onClick={() =>
            setPropertyComments(() => ({
              ...propertyComments,
              page: propertyComments.page + 1,
            }))
          }
        >
          show more comments
        </button>
      );
    }, [propertyComments]);

    const dialogContent = useCallback(
      (comments: Comment[]) => (
        <div className="content-wraper">
          {comments.map((comment) => {
            const { memberName, avatar } = comment.authorData!;
            const avatarUrl = `${serverAPI}/${avatar}`;

            return (
              <div
                key={comment._id}
                className="flex flex-row gap-x-7 py-4  border-b-2 border-dotted border-slate-200 "
              >
                <img
                  src={avatar ? avatarUrl : defaultUserAvatar}
                  alt={memberName || "user name"}
                  className="max-h-20 max-w-20 rounded-full"
                />
                <div className="flex-1 flex flex-col gap-5">
                  <div className="flex flex-col  md:flex-row md:items-start md:justify-between">
                    <span className="flex flex-col space-y-1">
                      <span className="text-xl text-darkBlue font-bold font-jostFont leading-tight capitalize">
                        {memberName}
                      </span>
                      <span className="text-slate-400 font-light text-xs capitalize font-jostFont">
                        {commentedDate(comment.createdAt.toString())}
                      </span>
                    </span>
                    <span className="mt-1 md:mt-0">
                      <Stars rating={comment.rating ?? 0} />
                    </span>
                  </div>
                  <p className="text-slate-400 leading-onePointEight font-jostFont">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ),
      [commentedDate]
    );

    // ------------------------------------------- RENDERS -------------------------------------------
    return (
      <>
        <div className="flex flex-col gap-y-5 [&>*:last-child]:border-0 mt-3">
          {(metaCounter[0]?.total ?? 0) > 0 ? (
            dialogContent(firstFourComments)
          ) : (
            <p className="py-4 text-lg text-slate-400 flex flex-row gap-2">
              <span>
                <MessageSquareOff className="h-6 w-6" />
              </span>
              No comments yet...
            </p>
          )}
        </div>
        <CommentsCom
          triggerBtn={triggerBtn}
          description={dialogDescription}
          content={dialogContent(comments)}
          submitBtn={submitButton}
        />
      </>
    );
  }
);

export default ChosenPropertyReviews;
