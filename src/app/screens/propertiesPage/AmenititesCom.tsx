import type { PropertyAmenities } from "@/lib/type/property";
import { Check } from "lucide-react";
import React, { useMemo } from "react";

interface AmenitiesComType {
  amenitites: PropertyAmenities;
}

const AmenitiesCom: React.FC<AmenitiesComType> = React.memo(
  ({ amenitites }) => {
    const totalAmenities = useMemo(() => {
      const amenitiesKeys = Object.entries(amenitites)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.split(/(?=[A-Z])/).join(" "));

      return amenitiesKeys;
    }, [amenitites]);

    return (
      <ul className={"grid  grid-cols-3 gap-5"}>
        {!totalAmenities.length ? (
          <p className="w-full  py-2 text-slate-400 text-lg font-jostFont ">
            No amenities available
          </p>
        ) : (
          totalAmenities.map((el) => (
            <li
              className={"flex flex-row items-center gap-1  items-cent"}
              key={el}
            >
              <span className={"relative p-1.5 rounded-full bg-green-100"}>
                <Check
                  className={
                    "w-2 h-2  p-[2px] border-2 border-green-400 box-content rounded-full text-green-600"
                  }
                />
              </span>
              <span className={"text-slate-500 text-sm  capitalize"}>{el}</span>
            </li>
          ))
        )}
      </ul>
    );
  }
);

export default AmenitiesCom;
