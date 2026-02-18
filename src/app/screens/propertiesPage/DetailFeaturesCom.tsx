import type { Property } from "@/lib/type/property";
import { formatPropertyArea } from "@/lib/utils";
import React, { useMemo } from "react";

interface DetailFeaturesComType {
  property: Property;
}

const DetailFeaturesCom: React.FC<DetailFeaturesComType> = React.memo(
  ({ property }) => {
    const wrapperClasses =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full";

    const itemClasses =
      "flex justify-between items-start gap-3 border-b border-slate-100 pb-2";

    const textClasses =
      "font-semibold text-sm font-jostFont text-blue-800 capitalize";

    const valuesClasses =
      "text-slate-500 text-sm capitalize break-words text-right";

    // --------------------------- COLUMN 1 -------------------
    const column1 = useMemo(() => {
      const { bedrooms, garageSpace, status, kitchen, floors, mood } = property;
      return [
        { title: "bedrooms", subtitle: "beds", value: bedrooms },
        { title: "Garage", subtitle: "", value: garageSpace },
        { title: "status", subtitle: "", value: status },
        { title: "kitchen", subtitle: "", value: kitchen },
        { title: "floors", subtitle: "", value: floors },
        { title: "mood", subtitle: "", value: mood },
      ];
    }, [property]);

    const column2 = useMemo(() => {
      const { bathrooms, propertyType, cooling, hall, firePlace } = property;

      return [
        { title: "Bathrooms", subtitle: "Baths", value: bathrooms },
        { title: "Property Type", subtitle: "", value: propertyType },
        { title: "Cooling", subtitle: "", value: cooling },
        { title: "Hall", subtitle: "", value: hall },
        {
          title: "Fireplace",
          subtitle: "",
          value: firePlace ? "Yes" : "No",
        },
      ];
    }, [property]);

    const column3 = useMemo(() => {
      const { area, yearBuilt, heating, furnished, security } = property;

      return [
        { title: "Areas", value: formatPropertyArea(area) },
        { title: "Year", value: yearBuilt },
        { title: "Heating Type", value: heating },
        { title: "Furnitured", value: furnished },
        { title: "Security", value: security },
      ];
    }, [property]);
    const allFeatures = [...column1, ...column2, ...column3];

    return (
      <ul className={wrapperClasses}>
        {allFeatures.map((el, index) => (
          <li key={index} className={itemClasses}>
            <span className={textClasses}>{el.title}:</span>
            <span className={valuesClasses}>{el.value ?? "N/A"}</span>
          </li>
        ))}
      </ul>
    );
  },
);

export default DetailFeaturesCom;
