import AgentService from "@/app/services/Agent.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { setMyallReviews } from "./slice";
import type { Comments, CommentsSearchInput } from "@/lib/type/comment";
import { retrieveMyallReviews } from "./selector";
import { SortOrder } from "@/lib/enums/blog.enum";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import MyReviewsHeader from "@/app/components/reviews/MyReviewsHeader";
import MyReviewsContent from "@/app/components/reviews/MyReviewsContent";

export const myReviewsWrapperClasses =
  "grid gap-5 sm:grid-cols-2 lg:grid-cols-3";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const myallReviewsDispatch = (dispatch: Dispatch) => ({
  setMyallReviews: (data: Comments) => dispatch(setMyallReviews(data)),
});

const myallReviewsRetriever = createSelector(
  retrieveMyallReviews,
  (myallReviews) => ({ myallReviews }),
);

// ---------------------------------------- COMPONET -----------------------
export default function AgentDashboardMyReviews() {
  const { setMyallReviews } = myallReviewsDispatch(useDispatch());
  const { myallReviews } = useSelector(myallReviewsRetriever);

  const [loading, setLoading] = useState<boolean>(true);
  const [myReviewSearch, setMyReviewSearch] = useState<CommentsSearchInput>({
    limit: 6,
    page: 1,
    sort: SortOrder.DESC,
    category: CommentTargetType.AGENT,
  });

  console.log(myReviewSearch);
  useEffect(() => {
    const agent = new AgentService();
    setLoading(true);
    (async () => {
      try {
        const result = await agent.getMyReviews(myReviewSearch);
        setMyallReviews(result);
      } catch (error) {
        console.log("Error in myallReviews in agent: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [myReviewSearch]);

  // ---------------------------------------------- HANDLERS --------------------------------------------

  // ---------------------------------------------- RENDER --------------------------------------------
  return (
    <div className="flex flex-col gap-y-5 h-full">
      <MyReviewsHeader />

      <MyReviewsContent
        loading={loading}
        myReviews={myallReviews}
        myReviewSearch={myReviewSearch}
        setMyReviewSearch={setMyReviewSearch}
      />
    </div>
  );
}
