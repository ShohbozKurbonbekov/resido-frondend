import type { Property } from "@/lib/type/property";
import { formatPropertyArea } from "@/lib/utils";
import React, { useMemo } from "react";

interface DetailFeaturesComType {
  property: Property;
}

const DetailFeaturesCom: React.FC<DetailFeaturesComType> = React.memo(
  ({ property }) => {
    const rowColumnClasses = "flex flex-col gap-4";
    const textClasses =
      "font-bold text-sm font-jostFont text-blue-800 capitalize";
    const valuesClasses = "text-slate-400 text-sm capitalize";

    // --------------------------- COLUMN 1 -------------------
    const column1 = useMemo(() => {
      const { bedrooms, garageSpace, status, kitchen, floors, mood } = property;
      const updated = [
        { title: "bedrooms", subtitle: "beds", value: bedrooms },
        { title: "Garage", subtitle: "", value: garageSpace },
        { title: "status", subtitle: "", value: status },
        { title: "kitchen", subtitle: "", value: kitchen },
        { title: "floors", subtitle: "", value: floors },
        { title: "mood", subtitle: "", value: mood },
      ];
      return updated;
    }, [property]);

    const column2 = useMemo(() => {
      const { bathrooms, propertyType, cooling, hall, firePlace } = property;

      const updated = [
        { title: "Bathrooms", subtitle: "Baths", value: bathrooms },
        { title: "Property Type", subtitle: "", value: propertyType },
        { title: "Cooling", subtitle: "", value: cooling },
        { title: "Hall", subtitle: "", value: hall },
        {
          title: "Fireplace",
          subtitle: "",
          value: firePlace ? "Yes" : "N/A",
        },
      ];
      return updated;
    }, [property]);

    const column3 = useMemo(() => {
      const { area, yearBuilt, heating, furnished, security } = property;

      const updated = [
        { title: "Areas", value: formatPropertyArea(area) },
        { title: "Year", value: yearBuilt },
        { title: "Heating Type", value: heating },
        { title: "Furnitured", value: furnished },
        { title: "Security", value: security },
      ];
      return updated;
    }, [property]);

    return (
      <>
        {[column1, column2, column3].map((col, index) => (
          <ul className={rowColumnClasses} key={index}>
            {col.map((el, index) => (
              <li key={index}>
                <span className={textClasses}>{el.title}:</span>
                <span className={valuesClasses}>
                  {" "}
                  {el.value ? el.value : "N/A"}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </>
    );
  }
);

export default DetailFeaturesCom;
