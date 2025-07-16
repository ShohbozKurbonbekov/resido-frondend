import Divider from "@/app/components/Divider";
import Stars from "@/app/components/Stars";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bed, Copy, Hotel } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedCard() {
  return (
    <Card className="w-full flex flex-row  gap-2  p-2 shadow-none bg-slate-50 font-jostFont">
      <CardHeader className="p-0">
        <div className="card-header-img max-h-[250px] max-w-[250px] h-full">
          <img
            src="/img/p-12.jpg"
            className="rounded-md w-full h-full object-cover  lg:min-w-[230px]"
            alt=""
          />
        </div>
      </CardHeader>
      <CardContent className="py-3 px-2 flex flex-col items-stretch w-full ">
        <div className="mb-2">
          <span className="px-4 py-2 bg-rose-200 text-rose-700 text-center text-size_10 rounded-sm font-bold">
            For Sale
          </span>
        </div>
        <div className="mb-2  flex flex-row items-end justify-between w-full font-bold">
          <h6 className="text-darkBlue capitalize leading-[1.2] text-md lg:text-sm ">
            The Green Canton Chrysler
          </h6>
          <span className="text-lg text-indigo-800">$80_000</span>
        </div>
        <div className="stars flex flex-row items-center gap-3">
          <Stars size={"90px"} />
          <span className="text-sm text-gray-300">({"43 Reviews"})</span>
        </div>

        <div className=" w-full flex flex-row justify-between items-center text-stone-400 text-[13.5px] font-jostFont my-3">
          <span className="flex flex-row gap-1 items-center">
            <Hotel
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>3BHK</span>
          </span>
          <span className="flex flex-row gap-1 items-center">
            <Bed
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>3 Beds</span>
          </span>

          <span className="flex flex-row gap-1 items-center">
            <Copy
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span className="">1800 SQFT</span>
          </span>
        </div>
        <Divider
          height="2px"
          width="100%"
          bgColor="#e7e1ddd8"
          marginTop="10px"
        />
        <div className="flex flex-row items-end justify-between mt-5">
          <p className="text-stone-400 flex flex-row  items-center gap-1 mb-2">
            <img src="/img/svg/map-1.svg" alt="" />
            210 Ziral Road, Canada
          </p>
          <Link to="/properties/property-detail">
            <button className="font-bold text-sm py-2 px-5 box-content bg-blue-800 rounded text-slate-50 hover:opacity-70 transition-all ease-in-out duration-75">
              View
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
