import {
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";

type AccordionItemType = {
  accordionNumber: string;
  accordionTitle: string;
  accordionSubtitle: string;
  accordionData: string[];
  accordionNameAttribute: string;
};

export default function AccordionItemCom({
  accordionData,
  accordionNumber,
  accordionSubtitle,
  accordionTitle,
  accordionNameAttribute,
}: AccordionItemType) {
  return (
    <AccordionItem value={accordionNumber}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex flex-col space-y-1">
          <h4 className="tracking-wide font-semibold text-darkBlue text-sm uppercase">
            {accordionTitle}
          </h4>
          <p className="text-sm text-slate-300">{accordionSubtitle}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="flex flex-col space-y-1">
          {accordionData.map((el: string, index: number) => (
            <li
              className="flex flex-row  space-x-2 items-center py-2 border-dotted border-b-2 md:py-4"
              key={index}
            >
              <input
                type="radio"
                className="h-4 w-4 "
                id={`r${index + 1}`}
                name={accordionNameAttribute}
              />
              <label
                htmlFor={`r${index + 1}`}
                className="text-xs font-bold font-jostFont text-slate-400"
              >
                {el}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
