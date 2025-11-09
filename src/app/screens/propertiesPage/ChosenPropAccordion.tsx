import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState } from "react";

type ChosenPropAccordionType = {
  triggerTitle: string | number;
  content: React.ReactNode;
  classes?: string;
  open?: boolean;
};
const ChosenPropAccordion: React.FC<ChosenPropAccordionType> = ({
  triggerTitle,
  content,
  classes,
  open = false,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(open);
  return (
    <Accordion
      type={"single"}
      collapsible
      value={accordionOpen ? "item-1" : ""}
      className="w-full p-6  bg-white rounded-md  mt-6"
      onValueChange={() => setAccordionOpen((prev) => !prev)}
    >
      <AccordionItem value="item-1" className="border-none">
        <div className="flex flex-row justify-between items-center">
          <span className="font-bold font-jostFont text-[15px] text-darkBlue capitalize">
            {triggerTitle}
          </span>
          <AccordionTrigger className="p-2 rounded-full bg-slate-200 hover:bg-slate-400 transition-all duration-200 ease-linear"></AccordionTrigger>
        </div>
        <AccordionContent
          className={`data-[state=open]:no-underline ${classes}`}
        >
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ChosenPropAccordion;
