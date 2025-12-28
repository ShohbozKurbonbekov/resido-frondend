import type { Comments, CommentsSearchInput } from "@/lib/type/comment";
import type { SetStateType } from "@/lib/type/common";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CommentTargetType } from "@/lib/enums/comment.enum";
import { dateConverter, handleRating } from "@/lib/utils";
import { defaultUserAvatar, serverAPI } from "@/lib/config";

import Stars from "../Stars";
import NoFound from "../NoFound";
import { PaginationCom } from "../PaginationCom";
import SpinnerGrids from "../loading/SpinnerGrids";
import { myReviewsWrapperClasses } from "@/app/screens/dashboards/agent/AgentDashboardReviews";

interface MyReviewsContentType {
  loading: boolean;
  myReviews: Comments;
  myReviewSearch: CommentsSearchInput;
  setMyReviewSearch: SetStateType<CommentsSearchInput>;
}

export default function MyReviewsContent({
  myReviewSearch,
  myReviews,
  loading,
  setMyReviewSearch,
}: MyReviewsContentType) {
  return (
    <div className="flex flex-col  h-full gap-y-8">
      {/* ---------- Filter ---------- */}
      <div className="flex justify-end">
        <Select
          value={myReviewSearch.category ?? CommentTargetType.AGENT}
          onValueChange={(value) =>
            setMyReviewSearch((prev) => ({
              ...prev,
              category: value as CommentTargetType,
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-64 bg-white py-5 text-base border-0 shadow-none hover:bg-slate-50 transition-color duration-200 ease-linear focus-visible:ring-emerald-500">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CommentTargetType.AGENT}>Myself</SelectItem>
            <SelectItem value={CommentTargetType.PROPERTY}>Property</SelectItem>
            <SelectItem value={CommentTargetType.BLOG}>Blog</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ---------- Reviews ---------- */}
      {loading ? (
        <SpinnerGrids columns={myReviewsWrapperClasses} count={3} />
      ) : myReviews?.comments?.length ? (
        <div className="flex flex-1  flex-col justify-between">
          <div className={myReviewsWrapperClasses}>
            {myReviews.comments.map((review) => {
              const imgUrl = review.senderData?.avatar
                ? `${serverAPI}/${review.senderData.avatar}`
                : defaultUserAvatar;

              return (
                <Card
                  key={review._id}
                  className="transition hover:shadow-lg max-w-md w-full mx-auto"
                >
                  <CardHeader className="flex flex-col items-center gap-y-3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={imgUrl} />
                      <AvatarFallback>
                        {(review.senderData?.memberName ?? "AN")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex w-full items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {review.targetType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {dateConverter(review.createdAt, "D/MM/YY")}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-base text-muted-foreground line-clamp-4 font-jostFont">
                      {review.content}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="text-blue-600">
                        By {review.senderData?.memberName ?? "Anonymous"}
                      </span>
                      {review.rating ? (
                        <Stars rating={handleRating(review.rating)} />
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ---------- Pagination ---------- */}
          <PaginationCom
            totalPages={Math.ceil(
              (myReviews.metaCounter?.[0]?.total ?? 0) / myReviewSearch.limit
            )}
            styleclasses="flex justify-center mt-6 gap-3"
            currentPage={myReviewSearch.page}
            onPageChange={setMyReviewSearch}
          />
        </div>
      ) : (
        <NoFound title="No reviews found" />
      )}
    </div>
  );
}
