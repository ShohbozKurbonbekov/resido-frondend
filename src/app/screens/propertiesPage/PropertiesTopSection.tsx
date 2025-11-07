import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Properties,
  type PropertiesSearchInput,
} from "@/lib/type/property";

import { PropertySortOrder } from "@/lib/enums/property.enum";
import type { SetStateType } from "@/lib/type/common";
import React, { useMemo } from "react";
import { propertiesOrder } from "@/app/data/properties";
import { calculateTotalPages } from "@/lib/utils";

interface PropertiesTopSectionType {
  properties: Properties;
  propertiesSearch: PropertiesSearchInput;
  setPropertiesSearch: SetStateType<PropertiesSearchInput>;
}

const PropertiesTopSection: React.FC<PropertiesTopSectionType> = React.memo(
  ({ properties, propertiesSearch, setPropertiesSearch }) => {
    const { page, limit } = propertiesSearch;
    const totalProperties = properties.totalPropertiesNumber[0]?.total ?? 0;

    // -------------------------- HANDLERS ---------------
    const totalPages = useMemo(
      () => calculateTotalPages(page, limit, totalProperties),
      [page, limit, totalProperties]
    );

    const { start, end } = totalPages;

    console.log(totalPages);
    // SELECT ORDERS ACCORDINGLY
    const handleSelect = (input: string) => {
      const normalizedInput = input.toLowerCase();
      setPropertiesSearch((prev) => {
        let order;

        switch (normalizedInput) {
          case "low price":
            order = PropertySortOrder.LOW_PRICE;
            break;
          case "high price":
            order = PropertySortOrder.HIGH_PRICE;
            break;
          default:
            order = PropertySortOrder.MOST_FAMOUS;
        }
        return { ...prev, order };
      });
    };

    // ARRAY WITH ELEMENTS [1,2,3,4 ...]
    const pageNumbers = useMemo(() => {
      return Array.from(
        {
          length: Math.ceil((totalProperties ?? 0) / limit),
        },
        (_, i) => i + 1
      );
    }, [totalProperties, limit]);

    // ---------------------- RENDERS --------------------
    return (
      <section className="pt-20  bg-sky-100 px-6  pb-8">
        <div className="container grid grid-cols-1 lg:grid-cols-2  border-2 bg-white rounded px-5 py-4 gap-5">
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm text-darkBlue font-jostFont font-semibold capitalize">
              Showing{" "}
              <span>
                {start} - {end} of {totalProperties ?? 0}
              </span>{" "}
              results
            </p>

            {/* PAGE NUMBERS */}
            <div className="flex flex-row gap-2 items-center">
              {pageNumbers.map((pageNumber: number) => (
                <span
                  className={`w-7 h-7 rounded-full text-sm text-white bg-slate grid place-content-center font-bold transition-all duration-300 ease-in ${
                    pageNumber === page ? "bg-blue-600" : "bg-blue-300"
                  }`}
                  key={pageNumber}
                >
                  {pageNumber}
                </span>
              ))}
            </div>
          </div>
          <div className=" border-slate-100 lg:border-l-4 border-b-0  border-t-0 border-r-0 ps-4 flex flex-row justify-between items-center ">
            <p className="text-sm text-darkBlue font-jostFont font-semibold capitalize ">
              Sort By:
            </p>

            <Select onValueChange={(order) => handleSelect(order)}>
              <SelectTrigger className="w-1/2 text-sm text-darkBlue font-jostFont font-semibold capitalize py-5">
                <SelectValue placeholder="Select order" />
              </SelectTrigger>

              {/* ORDERS */}
              <SelectContent>
                <SelectGroup>
                  {propertiesOrder.map((order: string) => (
                    <SelectItem
                      className="text-slate-500 text-sm font-bold"
                      key={order}
                      value={order}
                    >
                      {order}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    );
  }
);

export default PropertiesTopSection;
