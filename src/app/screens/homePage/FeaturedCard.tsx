import Divider from "@/app/components/Divider";
import Stars from "@/app/components/Stars";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serverAPI } from "@/lib/config";
import type { Property } from "@/lib/type/property";
import { formatCurrency, formatPropertyArea } from "@/lib/utils";
import { Bed, Copy, Hotel } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedCardType {
  property: Property;
}
export default function FeaturedCard({ property }: FeaturedCardType) {
  const {
    _id: id,
    images,
    title,
    sellingOption,
    averageRating,
    totalComments,
    bedrooms,
    hall,
    kitchen,
    area,
    address: { city, street, country },
  } = property;
  return (
    <Card
      className="w-full flex flex-col sm:flex-row gap-3 p-3 shadow-none bg-slate-50 font-jostFont max-w-md sm:max-w-max truncate"
      key={id}
      id={id}
    >
      <CardHeader className="p-0 w-full sm:w-auto">
        <div className="w-full sm:max-w-[250px] h-48 sm:h-full">
          <img
            src={`${serverAPI}/${images[0]}`}
            className="rounded-md w-full h-full object-cover"
            alt={title}
          />
        </div>
      </CardHeader>

      <CardContent className="py-3 px-2 flex flex-col items-stretch w-full min-w-0">
        <div className="mb-2">
          <span className="px-4 py-2 bg-rose-200 text-rose-700 text-size_10 rounded-sm font-bold">
            For{" "}
            {sellingOption?.optionRent?.type ?? sellingOption?.optionSell?.type}
          </span>
        </div>

        <div className="mb-2 flex flex-col sm:flex-row sm:items-end sm:justify-between w-full font-bold gap-1">
          <h6 className="text-darkBlue capitalize leading-tight text-md lg:text-lg truncate">
            {title}
          </h6>

          <span className="text-lg text-indigo-800 whitespace-nowrap">
            {formatCurrency(
              (sellingOption?.optionRent?.overalAmount ??
                sellingOption?.optionSell?.overalAmunt)!,
              "USD",
            )}
          </span>
        </div>

        <div className="stars flex flex-wrap items-center gap-2">
          <Stars rating={averageRating ?? 0} />
          <span className="text-sm text-gray-300">
            ({totalComments} comments)
          </span>
        </div>

        <div className="w-full flex flex-wrap justify-between items-center text-stone-400 text-sm my-3 gap-y-2">
          <span className="flex gap-1 items-center">
            <Hotel
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>
              {bedrooms}B{hall}H{kitchen}K
            </span>
          </span>

          <span className="flex gap-1 items-center">
            <Bed
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>{bedrooms} Beds</span>
          </span>

          <span className="flex gap-1 items-center">
            <Copy
              size="20px"
              className="bg-blue-100 box-content p-2 rounded-full border-2"
            />
            <span>{formatPropertyArea(area)}</span>
          </span>
        </div>

        <Divider
          height="2px"
          width="100%"
          bgColor="#e7e1ddd8"
          marginTop="10px"
        />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-5 gap-3">
          <p className="text-stone-400 flex items-center gap-1 truncate min-w-0">
            <img src="/img/svg/map-1.svg" alt="address logo" />
            <span className="truncate">{`${street}, ${city}, ${country}`}</span>
          </p>

          <Link to={`/property/${id}`}>
            <button className="font-bold text-sm py-2 px-5 bg-blue-800 rounded text-slate-50 hover:opacity-70 transition-all duration-150 w-full sm:w-auto ">
              View
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
