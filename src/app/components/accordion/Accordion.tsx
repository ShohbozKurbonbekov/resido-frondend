import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionType = {
  triggerTitle: string | number;
  content: React.ReactNode;
  classes?: string;
};
export default function CommonAccordion({
  triggerTitle,
  content,
  classes,
}: AccordionType) {
  return (
    <Accordion
      type={"single"}
      collapsible
      className="w-full px-4 bg-white rounded-md  mt-6"
      defaultValue="item-1 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="hover:no-underline font-bold font-jostFont text-[15px] text-darkBlue capitalize">
          {triggerTitle}
        </AccordionTrigger>
        <AccordionContent
          className={`data-[state=open]:no-underline ${classes}`}
        >
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
