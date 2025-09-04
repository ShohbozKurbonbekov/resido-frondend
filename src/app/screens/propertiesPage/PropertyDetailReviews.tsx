import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";

import type { PropertyDetailReviewType } from "@/lib/type/property";
import { useMemo, useState } from "react";

type PropertyReviewType = {
  allReviews: PropertyDetailReviewType[];
};
export default function PropertyDetailReviews({
  allReviews,
}: PropertyReviewType) {
  const [review, setReview] = useState<{ limit: number; page: number }>({
    limit: 2,
    page: 1,
  });

  const chunkingArray = (
    arr: PropertyDetailReviewType[],
    size: number
  ): PropertyDetailReviewType[][] => {
    const result: PropertyDetailReviewType[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      // i => 0 => 4 => 8 => 12 => 16 => 20
      result.push(arr.slice(i, i + size)); // [[],[],[],[],[]]
    }
    return result;
  };

  const chunkingReviews = useMemo(
    () => chunkingArray(allReviews, review.limit),
    [review.limit, allReviews]
  );

  return (
    <>
      <div className="flex flex-col gap-y-5 [&>*:last-child]:border-0">
        {chunkingReviews.length === 0 && <NoFound title={"no reviews found"} />}
        {chunkingReviews.length > 0 &&
          chunkingReviews[review.page - 1].map((review, index) => (
            <div
              key={review.reviewName ?? index}
              className="flex flex-row gap-x-7 pb-6  border-b-2 border-dotted border-slate-200"
            >
              <img
                src={review.reviewImage}
                alt=""
                className="max-h-20 max-w-20 rounded-full"
              />
              <div className="flex-1 flex flex-col gap-5">
                <span className="flex flex-col space-y-1">
                  <span className="text-xl text-darkBlue font-bold font-jostFont leading-tight capitalize">
                    {review.reviewName}
                  </span>
                  <span className="text-slate-400 font-light text-xs uppercase font-jostFont">
                    {review.reviewDate}
                  </span>
                </span>
                <p className="text-slate-400 leading-[1.8] font-jostFont">
                  {review.reviewDescription}
                </p>
              </div>
            </div>
          ))}
      </div>
      {/* // See more button */}

      <PaginationCom
        totalPages={chunkingReviews.length}
        currentPage={review.page}
        onPageChange={setReview}
        styleclasses="flex flex-row items-center justify-center gap-3"
      />
    </>
  );
}
