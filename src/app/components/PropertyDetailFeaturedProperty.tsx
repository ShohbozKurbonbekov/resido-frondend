import { MapPin } from "lucide-react";
import type { PropertyDetailFeaturedPropertyType } from "@/lib/type/property";

interface PropertyDetailFeaturedPropertyProp {
  featuredProperty: PropertyDetailFeaturedPropertyType[];
}

export default function PropertyDetailFeaturedProperty({
  featuredProperty,
}: PropertyDetailFeaturedPropertyProp) {
  return (
    <div className="flex flex-col gap-y-2">
      <h4 className="text-darkBlue text-xl leading-tight capitalize font-jostFont font-bold ">
        Featured Property
      </h4>
      <ul className="flex flex-col bg-slate-100 gap-y-[15px] items-start">
        {featuredProperty.map(
          (property: PropertyDetailFeaturedPropertyType, index: number) => (
            <li
              key={index}
              className="p-4 grid grid-cols-[minmax(83px,104px)_1fr] w-full gap-x-3 content-start justify-items-stretch bg-white rounded-md"
            >
              <div className="">
                <img
                  src={property.featuredPropertyImage}
                  className="w-full h-full rounded-sm"
                  alt=""
                />
              </div>
              <div className="flex flex-col  gap-y-[2px] items-start">
                <h5 className="leading-none text-base text-darkBlue font-bold font-jostFont capitalize">
                  {property.featuredPropertyName}
                </h5>
                <p className="text-[13px] font-light  font-jostFont capitalize box-border text-slate-400 mt-1 flex flex-row items-center  ">
                  <MapPin className="h-[13px] -ml-[6px]" />
                  {property.featuredPropertyLocation}
                </p>
                <div className="my-1 flex flex-row justify-between items-center w-full">
                  {property?.featuredPropertyState ? (
                    <span className="px-3 py-1 flex items-center bg-red-100 text-red-400 rounded-xl text-xs">
                      {property.featuredPropertyState}
                    </span>
                  ) : null}
                  <span className="text-darkBlue text-base font-bold ms-auto">
                    {property.featuredPropertyPrice}
                  </span>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
