import { MapPin } from "lucide-react";
import type { Property } from "@/lib/type/property";
import React from "react";
import NoFound from "./NoFound";
import { customTruncate, serverAPI } from "@/lib/config";
import { customiseAddress, formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
interface PropertyDetailFeaturedPropertyProp {
  featuredProperty: Property[];
}

const PropertyDetailFeaturedProperty: React.FC<PropertyDetailFeaturedPropertyProp> =
  React.memo(({ featuredProperty }) => {
    const navigation = useNavigate();

    // ------------------------------------------ HANDLERS ------------------------------------------
    const handleClick = (propertyId: string) => {
      navigation(`/property/${propertyId}`);
    };
    return (
      <div className="flex flex-col gap-y-2">
        <h4
          className={`text-darkBlue text-xl leading-tight capitalize font-jostFont font-bold ${
            !featuredProperty.length ? "text-center mt-5" : "text-start"
          }`}
        >
          Featured Properties
        </h4>
        <ul
          className={`flex flex-col ${
            !featuredProperty.length ? "items-center" : "items-start"
          } gap-y-4 `}
        >
          {featuredProperty.length ? (
            featuredProperty.map((property: Property) => {
              const {
                images,
                title,
                address,
                sellingOption: { optionRent, optionSell },
              } = property;

              const sellingType = (
                (optionRent?.type ?? optionSell?.type) ||
                "N/A"
              ).toLowerCase();
              const price =
                (optionRent?.overalAmount ?? optionSell?.overalAmunt) || 0;
              const imageUrl = images?.length
                ? `${serverAPI}/${images[0]}`
                : "/img/ag-2.png";
              return (
                <li
                  key={property._id}
                  className="p-4 grid grid-cols-[minmax(83px,104px)_1fr]  gap-x-3 content-start justify-items-stretch bg-white rounded-md w-full cursor-pointer"
                  onClick={() => handleClick(property._id)}
                >
                  <div>
                    <img
                      src={imageUrl}
                      className="w-full h-full rounded-sm"
                      alt={title || "property image"}
                    />
                  </div>
                  <div className="flex flex-col  gap-y-0.5 items-start">
                    <h5 className="leading-none text-base text-darkBlue font-bold font-jostFont capitalize ">
                      {customTruncate(title, 20)}
                    </h5>
                    <p className="text-3 font-light  font-jostFont capitalize box-border text-slate-400 mt-1 flex flex-row items-center  ">
                      <MapPin className="h-3 -ml-1.5" />
                      {customiseAddress(address)}
                    </p>
                    <div className="my-1 flex flex-row justify-between items-center w-full">
                      <div>
                        {sellingType === "rent" ? (
                          <span className="px-3 py-1 flex items-center bg-red-100 text-red-400 rounded-xl text-xs capitalize">
                            For {sellingType}
                          </span>
                        ) : (
                          <span className="text-green-700 text-xs  ms-auto capitalize bg-green-100 px-3 py-1 rounded-xl">
                            For {sellingType}
                          </span>
                        )}
                      </div>
                      <div className="text-lg text-darkBlue font-jostFont font-semibold">
                        {formatCurrency(price, "USD")}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <NoFound />
          )}
        </ul>
      </div>
    );
  });

export default PropertyDetailFeaturedProperty;
