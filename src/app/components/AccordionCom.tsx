import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

// ------------------------- COMPONENT ------------------
type AccordionComType = {
  valueKey: string;
  title?: string;
  data: string[];
  selected: string | undefined;
  setSelected: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
};

const AccordionCom: React.FC<AccordionComType> = ({
  title = "Where",
  valueKey,
  data,
  selected,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ------------------------ RENDERS -----------------------
  return (
    <div
      className={`${
        isOpen ? "border-0 pb-0" : "border-b border-slate-200  py-4"
      }`}
    >
      <Accordion
        type="single"
        collapsible
        value={isOpen ? "item-1" : ""}
        onValueChange={(val) => setIsOpen(val === "item-1")}
      >
        <AccordionItem value="item-1" className="border-none">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide  font-jostFont ">
                {title}
              </h3>
              <p className="text-slate-400 text-xs font-medium mt-1 font-jostFont capitalize">
                {selected}
              </p>
            </div>

            <AccordionTrigger className="flex justify-center items-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-300 transition-all duration-150 ease-linear"></AccordionTrigger>
          </div>

          <AccordionContent>
            <ul className="flex flex-col gap-y-1 pt-4">
              {data.map((el: string) => (
                <li
                  className="flex flex-row  gap-x-2 items-center py-2 border-dotted border-b md:py-4"
                  key={el}
                >
                  <input
                    type="radio"
                    className="h-4 w-4 accent-slate-500"
                    id={`r-${el}`}
                    name={valueKey}
                    value={el}
                    onChange={(e) => {
                      setSelected(e, valueKey);
                    }}
                    checked={el === selected}
                  />
                  <label
                    htmlFor={`r-${el}`}
                    className="text-xs font-bold font-jostFont text-slate-500 capitalize"
                  >
                    {el}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionCom;
