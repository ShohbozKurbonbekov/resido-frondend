import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setGetUserComments } from "./slice";
import { retrieveGetUserComments } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { Comments } from "@/lib/type/comment";
import CommentService from "@/app/services/CommentService";
import UserCommentsHeader from "./UserCommentsHeader";
import UserCommentsContent from "./UserCommentsContent";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const getUserCommentsDispatch = (dispatch: Dispatch) => ({
  setGetUserComments: (data: Comments) => dispatch(setGetUserComments(data)),
});

const getUserCommentsRetriever = createSelector(
  retrieveGetUserComments,
  (getUserComments) => ({ getUserComments })
);

export const UserCardWrapperClasses = "w-full grid gap-4 lg:gap-5 grid-cols-1 ";
// --------------------------------------- COMPONENT --------------------
export default function Reviews() {
  const { setGetUserComments } = getUserCommentsDispatch(useDispatch());
  const { getUserComments } = useSelector(getUserCommentsRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
  const [getUserCommentsInput, setGetUserCommentsInput] = useState<CommonInput>(
    {
      page: 1,
      limit: 4,
    }
  );

  useEffect(() => {
    const comment = new CommentService();
    const fetchGetUserComments = async () => {
      try {
        const result = await comment.getUserComments(getUserCommentsInput);
        setGetUserComments(result);
      } catch (error) {
        console.log("Error in fetching getUserComments: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };

    fetchGetUserComments();
  }, [getUserCommentsInput, mainPageLoading]);
  // --------------------------------------- COMPONENT --------------------
  return (
    <div className="lg:col-span-9">
      {loading ? (
        <SpinnerGrids columns={UserCardWrapperClasses} count={2} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <UserCommentsHeader />
          <UserCommentsContent
            getUserComments={getUserComments}
            getUserCommentsInput={getUserCommentsInput}
            setGetUserCommentsInput={setGetUserCommentsInput}
            setMainPageLoading={setMainPageLoading}
          />
        </div>
      )}
    </div>
  );
}
