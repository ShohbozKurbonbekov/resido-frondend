import NoFound from "@/app/components/NoFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useState } from "react";
import ContactCards from "./ContactCards";
import type { FaqsType } from "@/lib/type/faqs";
import type { TeamMemberType } from "@/lib/type/about-us";
import TabButtons from "./TabButtons";

interface MainContentType {
  faqsQuestions: FaqsType[];
  teamMembers: TeamMemberType[];
  searchInquery: { search: string };
  setSearchInquery: (arg: { search: string }) => void;
}

export default function MainContent({
  faqsQuestions,
  teamMembers,
  searchInquery,
  setSearchInquery,
}: MainContentType) {
  const [activeButton, setActiveButton] = useState<string>(
    searchInquery.search
  );

  return (
    <section className="py-20 bg-sky-100">
      <ContactCards teamMembers={teamMembers} />
      <div className="container mt-[30px]">
        <TabButtons
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          setSearchInquery={setSearchInquery}
        />

        {!faqsQuestions.length && <NoFound title={"No FAQs yet"} />}
        {faqsQuestions && (
          <Accordion
            className="w-full max-w-[1076px] flex flex-col items-start justify-center gap-y-2 bg-transparent mt-7"
            type="multiple"
            defaultValue={["item-1"]}
          >
            {faqsQuestions.map((accordion, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                className="border-0 w-full bg-white py-4 px-6 rounded-md "
              >
                <AccordionTrigger className="p-1 text-xl font-jostFont font-semibold hover:no-underline [&_svg]:hidden ">
                  {accordion.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-lg font-jostFont leading-tight mt-5">
                  {accordion.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
