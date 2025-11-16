import { Progress } from "@/components/ui/progress";
import Stars from "../Stars";
import type { Property } from "@/lib/type/property";
import React, { useMemo } from "react";

interface RatingBoxType {
  property: Property;
}

// ------------------------------------------------- COMPONENT ---------------------------------------------------------
const RatingBox: React.FC<RatingBoxType> = React.memo(({ property }) => {
  const ratingValue = useMemo(() => {
    const propertyRating = property.averageRating?.toFixed(1) ?? 0;
    return Number(propertyRating);
  }, [property.averageRating]);

  // ---------------------------------------------------- RENDER -------------------------------------------------------
  return (
    <div className="w-full p-8  bg-white rounded-md  mt-6">
      <div className="grid grid-cols-1 md:grid-cols-6 items-center">
        <div className="md:col-span-2 md:border-e-2 md:border-slate-300 md:pe-7 flex flex-col items-center justify-center gap-1 md:me-5">
          <h1 className="text-darkBlue text-6xl font-bold font-jostFont leading-none">
            {ratingValue}
          </h1>
          <p className="text-slate-400 text-xl font-jostFont">out of 5.0</p>
          <p>
            <Stars size={"large"} rating={ratingValue} />
          </p>
        </div>
        <div className="md:col-span-4 grid grid-cols-1 md:gap-s-7 gap-y-5 p-2  ">
          <div className="flex flex-col gap-y-3 ">
            <h4 className="text-sm md:text-lg capitalize text-darkBlue font-jostFont font-semibold leading-none">
              {!ratingValue ? "No comments yet" : "See rating in progress bar"}
            </h4>
            <span className="flex flex-row  gap-2 items-center">
              <span className="w-full">
                <Progress
                  value={(ratingValue / 5) * 100}
                  className="h-2 md:h-3 bg-slate-100 [&>div]:bg-yellow-400"
                />
              </span>
              <span className="text-sm bg-slate-100 rounded-2xl px-3 py-1">
                {ratingValue}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RatingBox;
