import NoFound from "@/app/components/NoFound";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PropertyDetailReviewType } from "@/lib/type/property";
import { CircleArrowDown } from "lucide-react";
import { useState } from "react";

type PropertyReviewType = {
  allReviews: PropertyDetailReviewType[];
};
export default function PropertyDetailReviews({
  allReviews,
}: PropertyReviewType) {
  const [reviewLimit, setReviewLimit] = useState<number>(2);

  return (
    <>
      <div className="flex flex-col gap-y-5 [&>*:last-child]:border-0">
        {allReviews[0] ? (
          <div className="flex flex-row gap-x-7 pb-6  border-b-2 border-dotted border-slate-200">
            <img
              src={allReviews[0].reviewImage}
              alt=""
              className="max-h-20 max-w-20 rounded-full"
            />
            <div className="flex-1 flex flex-col gap-[19px]">
              <span className="flex flex-col space-y-1">
                <span className="text-xl text-darkBlue font-bold font-jostFont leading-tight capitalize">
                  {allReviews[0].reviewName}
                </span>
                <span className="text-slate-400 font-light text-xs uppercase font-jostFont">
                  {allReviews[0].reviewDate}
                </span>
              </span>
              <p className="text-slate-400 leading-[1.8] font-jostFont">
                {allReviews[0].reviewDescription}
              </p>
            </div>
          </div>
        ) : (
          <NoFound title={"no reviews found"} />
        )}
        {allReviews[1] && (
          <div className="flex flex-row gap-x-7 pb-6 border-b-2 border-dotted border-slate-200">
            <img
              src={allReviews[1].reviewImage}
              alt=""
              className="max-h-20 max-w-20 rounded-full"
            />
            <div className="flex-1 flex flex-col gap-[19px]">
              <span className="flex flex-col space-y-1">
                <span className="text-xl text-darkBlue font-bold font-jostFont leading-tight capitalize">
                  {allReviews[1].reviewName}
                </span>
                <span className="text-slate-400 font-light text-xs uppercase font-jostFont">
                  {allReviews[1].reviewDate}
                </span>
              </span>
              <p className="text-slate-400 leading-[1.8] font-jostFont">
                {allReviews[1].reviewDescription}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* // See more button */}

      {allReviews.length && allReviews.length >= 3 ? (
        <Dialog>
          <DialogTrigger className="flex flex-row  gap-1 mx-auto items-center group">
            <CircleArrowDown className="text-white  fill-blue-400 w-8 h-8 hover:scale-110 transition-transform duration-200 active:scale-90 ease-linear group" />
            <span className="text-blue-800 font-jostFont capitalize font-bold text-sm group-hover:text-blue-600 transition-colors duration-200 ease-linear">
              See more reviews
            </span>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto max-w-[800px] w-full">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle className="text-center mb-5 text-xl capitalize font-jostFont leading-none text-slate-400 rounded-sm py-4 px-8 border-2">
                all the reviews
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-y-5 [&>*:last-child]:border-0">
              {allReviews
                .slice(0, reviewLimit)
                .map((review: PropertyDetailReviewType) => (
                  <div className="flex flex-row gap-x-7 pb-6 border-b-2 border-dotted border-slate-200">
                    <img
                      src={review.reviewImage}
                      alt=""
                      className="max-h-20 max-w-20 rounded-full"
                    />
                    <div className="flex-1 flex flex-col gap-[19px]">
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

            {/* // footer button  */}
            <DialogFooter>
              {reviewLimit === allReviews.length ? null : (
                <button
                  className="flex flex-row  gap-1 mx-auto items-center group"
                  onClick={() => setReviewLimit((prev) => prev + 1)}
                >
                  <CircleArrowDown className="text-white  fill-blue-400 w-8 h-8 hover:scale-110 transition-transform duration-200 active:scale-90 ease-linear group" />
                  <span className="text-blue-800 font-jostFont capitalize font-bold text-sm group-hover:text-blue-600 transition-colors duration-200 ease-linear">
                    See more reviews
                  </span>
                </button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
