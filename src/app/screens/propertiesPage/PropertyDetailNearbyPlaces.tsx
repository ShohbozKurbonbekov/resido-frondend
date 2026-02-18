import type { Property } from "@/lib/type/property";
import React from "react";

interface ChosenPropertyNearbyPlacesType {
  property: Property;
}

const ChosenPropertyNearbyPlaces: React.FC<ChosenPropertyNearbyPlacesType> =
  React.memo(({ property }) => {
    const { nearBySchools, nearByTransports } = property;

    const transport_school = [
      { label: "Nearby School", value: nearBySchools },
      { label: "Nearby Transport", value: nearByTransports },
    ];

    return (
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-lg font-semibold font-jostFont text-slate-800 mb-4">
          Nearby Facilities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transport_school.map((el, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-100"
            >
              <span className="text-sm md:text-base font-medium text-slate-700 capitalize">
                {el.label}
              </span>

              <span
                className={`
                  text-xs md:text-sm font-semibold px-3 py-1 rounded-full
                  ${
                    el.value
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-600"
                  }
                `}
              >
                {el.value ? "Available" : "Not Available"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  });

export default ChosenPropertyNearbyPlaces;
