import type { Comments, CommentsSearchInput } from "@/lib/type/comment";
import type { SetStateType } from "@/lib/type/common";

interface MyReviewsContentType {
  myReviews: Comments;
  myReviewSearch: CommentsSearchInput;
  setMyReviewSearch: SetStateType<CommentsSearchInput>;
}

export default function MyReviewsContent({
  myReviewSearch,
  myReviews,
  setMyReviewSearch,
}: MyReviewsContentType) {
  return <div>Reviews content</div>;
}
