import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import AgentService from "@/app/services/AgentService";
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
  "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 ";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const myallReviewsDispatch = (dispatch: Dispatch) => ({
  setMyallReviews: (data: Comments) => dispatch(setMyallReviews(data)),
});

const myallReviewsRetriever = createSelector(
  retrieveMyallReviews,
  (myallReviews) => ({ myallReviews })
);

// ---------------------------------------- COMPONET -----------------------
export default function AgentDashboardMyBlogs() {
  const { setMyallReviews } = myallReviewsDispatch(useDispatch());
  const { myallReviews } = useSelector(myallReviewsRetriever);

  const [loading, setLoading] = useState<boolean>(false);
  const [myReviewSearch, setMyReviewSearch] = useState<CommentsSearchInput>({
    limit: 6,
    page: 1,
    sort: SortOrder.DESC,
    category: CommentTargetType.AGENT,
  });

  useEffect(() => {
    const agent = new AgentService();
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
    <div className="lg:col-span-9">
      <div className="flex flex-col gap-y-5 h-full">
        <MyReviewsHeader />

        {loading ? (
          <SpinnerGrids columns={myReviewsWrapperClasses} count={3} />
        ) : (
          <MyReviewsContent
            myReviews={myallReviews}
            myReviewSearch={myReviewSearch}
            setMyReviewSearch={setMyReviewSearch}
          />
        )}
      </div>
    </div>
  );
}
