import type { Property } from "@/lib/type/property";
import React from "react";

// ------------------------------- COMPONENT ------------------------------
interface ChosenPropertyNearbyPlacesType {
  property: Property;
}
const ChosenPropertyNearbyPlaces: React.FC<ChosenPropertyNearbyPlacesType> =
  React.memo(({ property }) => {
    const { nearBySchools, nearByTransports } = property;
    const transport_school = [
      { text: "a school nearby", value: nearBySchools },
      { text: "a transport nearby", value: nearByTransports },
    ];
    // ---------------------------- HANDLERS -----------------------------
    // ---------------------------- RENDERS ------------------------------
    return (
      <div className="flex flex-col gap-y-3 mt-3 ">
        {transport_school.map((el) => (
          <div className="grid grid-cols-6 text-base md:text-lg font-jostFont text-slate-500 items-center capitalize">
            <p className="col-span-2">{el.text}</p>
            <span className="col-span-3 h-0.5 bg-slate-400"></span>
            <p className="underline text-end col-span-1">
              {el.value ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    );
  });
export default ChosenPropertyNearbyPlaces;
