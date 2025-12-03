import NoFound from "@/app/components/NoFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactCards from "./ContactCards";
import TabButtons from "./TabButtons";
import { useState } from "react";
import {
  GENERAL_QUESTIONS,
  PAYMENT_QUESTIONS,
  UPDATE_QUESTIONS,
} from "@/app/data/faq";
import { Question_Taps } from "@/lib/enums/faq.enum";

export default function MainContent() {
  const [activeButton, setActiveButton] = useState<Question_Taps>(
    Question_Taps.general
  );

  const setQuestionTabs = (button: Question_Taps) => {
    if (button === Question_Taps.general) {
      return GENERAL_QUESTIONS;
    } else if (button === Question_Taps.payment) {
      return PAYMENT_QUESTIONS;
    } else if (button === Question_Taps.update) return UPDATE_QUESTIONS;
    return [];
  };
  const faqsQuestions = setQuestionTabs(activeButton);

  return (
    <section className="py-20 bg-sky-100">
      <ContactCards />
      <div className="container mt-7">
        <TabButtons
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        {!faqsQuestions.length ? (
          <NoFound title={"No FAQs yet"} />
        ) : (
          <Accordion
            className="w-full max-w-screen-lg flex flex-col items-start justify-center gap-y-2 bg-transparent mt-7"
            type="multiple"
            defaultValue={["item-1"]}
          >
            {faqsQuestions.map((accordion, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border-0 w-full bg-white py-4 px-6 rounded-md "
              >
                <AccordionTrigger className="p-1 text-xl font-jostFont font-semibold hover:no-underline ">
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
