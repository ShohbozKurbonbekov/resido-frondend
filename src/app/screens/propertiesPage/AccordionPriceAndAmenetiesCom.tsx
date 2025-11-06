import type React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useCallback, useState } from "react";
import type { T } from "@/lib/type/common";

interface AccordionPriceAndAmenitiesProps {
  type: "price" | "amenities";
  title: string;
  data: T;
  selected: string | T;
  setSelected: (key: string, value: T) => void;
  valueKey: string;
}

// ---------------------------- COMPONENT -------------------------
const AccordionPriceAndAmenitiesCom: React.FC<
  AccordionPriceAndAmenitiesProps
> = ({ type, title, data, selected, setSelected }) => {
  const [openItem, setOpenItem] = useState<string>("");

  // ----------------------------- HANDLERS -----------------------------
  const handlePriceChange = (key: "min" | "max", value: string) => {
    const updated = { ...data, [key]: value };
    setSelected("propertyPriceRange", updated);
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = toCamelCase(e.target.value.trim());

    setSelected(input, {});
  };

  // CONVERTS INTO "camelCase" FROM "camel case"
  const toCamelCase = useCallback(
    (str: string) =>
      str.toLowerCase().replace(/ (.)/g, (_, char) => char.toUpperCase()),
    []
  );

  // ----------------------------- RENDER -----------------------------

  const renderContent = () => {
    if (type === "price") {
      const inputClasses =
        "w-1/2 border border-slate-300 p-2 rounded-md font-jostFont text-slate-600 focus:ring-0 outline-none";

      return (
        <div className="flex items-center gap-2 mt-3">
          <input
            type="number"
            min={0}
            value={data.min}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className={inputClasses}
          />
          <span className="text-slate-400">–</span>
          <input
            type="number"
            min={0}
            value={data.max}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className={inputClasses}
          />
        </div>
      );
    }

    // AMENITIES
    return (
      <ul className="flex flex-col gap-y-2 pt-4">
        {Array.isArray(data) &&
          data.map((el: string, index: number) => (
            <li
              key={index}
              className="flex items-center gap-x-2 py-2 border-b border-dotted border-slate-200 md:py-4"
            >
              <input
                id={`amenity-${index + 1}`}
                type="checkbox"
                value={el}
                onChange={handleAmenityChange}
                className="h-4 w-4 accent-slate-500 focus:ring-0"
                checked={Object.keys(selected).includes(toCamelCase(el))}
              />
              <label
                htmlFor={`amenity-${index + 1}`}
                className="text-sm font-medium text-slate-600 capitalize font-jostFont"
              >
                {el}
              </label>
            </li>
          ))}
      </ul>
    );
  };

  // ----------------------------- RENDER -----------------------------

  return (
    <div
      className={`${
        openItem ? "border-0 pb-0" : "border-b border-slate-200 py-4"
      }`}
    >
      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={(val) => setOpenItem(val)}
      >
        <AccordionItem value="item-1" className="border-none">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide font-jostFont">
                {title}
              </h3>
              <p className="text-slate-400 text-xs font-medium mt-1 font-jostFont capitalize">
                {typeof selected === "string"
                  ? `${data.min || 0} - ${data.max || 0}`
                  : "Select options"}
              </p>
            </div>

            <AccordionTrigger className="flex justify-between items-center rounded-full  bg-slate-100 hover:bg-slate-300 p-2 transition-all duration-200 ease-linear"></AccordionTrigger>
          </div>

          <AccordionContent>{renderContent()}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionPriceAndAmenitiesCom;
