import { Progress } from "@/components/ui/progress";
import Stars from "../Stars";

export default function RatingBox() {
  const min = 1;
  const max = 5;
  const serviceValue: number = 4.7; // logical value
  const moneyValue: number = 3.9;
  const locationValue: number = 3.2;
  const cleanlinessValue: number = 2.0;

  // Scale the logical value into 0–100%
  const servicePercent = ((serviceValue - min) / (max - min)) * 100;
  const moneyPercent = ((moneyValue - min) / (max - min)) * 100;
  const locationPercent = ((locationValue - min) / (max - min)) * 100;
  const cleaninessPercent = ((cleanlinessValue - min) / (max - min)) * 100;

  return (
    <div className="w-full p-8  bg-white rounded-md  mt-6">
      <div className="grid grid-cols-1 md:grid-cols-6 items-center">
        <div className="md:col-span-2 md:border-e-2 md:border-slate-300 md:pe-7 flex flex-col items-center justify-center gap-1 md:me-5">
          <h1 className="text-darkBlue text-[58px] font-bold font-jostFont leading-none">
            4.2
          </h1>
          <p className="text-slate-400 text-xl font-jostFont">out of 5.0</p>
          <p className="">
            <Stars size={"100px"} ratingNum={5} />
          </p>
        </div>
        <div className="md:col-span-4 grid grid-cols-1 md:gap-x-7 gap-y-5 p-2   md:grid-cols-2  md:ms-4 ">
          {/* // progress-bar - 1 */}
          <div className="flex flex-col">
            <h4 className="text-sm capitalize text-darkBlue font-jostFont font-semibold leading-none">
              Service
            </h4>
            <span className="flex flex-row gap-2 items-center">
              <span className="flex-1">
                <Progress
                  value={servicePercent}
                  className="h-2 bg-slate-100 [&>div]:bg-green-500"
                />
              </span>
              <span className="text-sm bg-slate-100 rounded-2xl px-[10px] py-[2px]">
                {serviceValue}
              </span>
            </span>
          </div>
          {/* // progress-bar - 2  */}
          <div className="flex flex-col">
            <h4 className="text-sm capitalize text-darkBlue font-jostFont font-semibold leading-none">
              Value for Money
            </h4>
            <span className="flex flex-row gap-2 items-center">
              <span className="flex-1">
                <Progress
                  value={moneyPercent}
                  className="h-2 bg-slate-100 [&>div]:bg-green-400"
                />
              </span>
              <span className="text-sm bg-slate-100 rounded-2xl px-[10px] py-[2px]">
                {moneyValue}
              </span>
            </span>
          </div>
          {/* // progress bar - 3 */}
          <div className="flex flex-col">
            <h4 className="text-sm capitalize text-darkBlue font-jostFont font-semibold leading-none">
              Location
            </h4>
            <span className="flex flex-row gap-2 items-center ">
              <span className="flex-1">
                <Progress
                  value={locationPercent}
                  className="h-2 bg-slate-100 [&>div]:bg-green-700"
                />
              </span>
              <span className="text-sm bg-slate-100 rounded-2xl px-[10px] py-[2px]">
                {locationValue}
              </span>
            </span>
          </div>

          {/* // progress bar - 4 */}
          <div className="flex flex-col">
            <h4 className="text-sm capitalize text-darkBlue font-jostFont font-semibold leading-none">
              Cleaniness
            </h4>
            <span className="flex flex-row gap-2 items-center">
              <span className="flex-1">
                <Progress
                  value={cleaninessPercent}
                  className="h-2 bg-slate-100 [&>div]:bg-red-600"
                />
              </span>
              <span className="text-sm bg-slate-100 rounded-2xl px-[10px] py-[2px]">
                {cleanlinessValue}
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* <Progress value={percent} className="h-3" />
      <p>
        {value} / {max}
      </p> */}
    </div>
  );
}
