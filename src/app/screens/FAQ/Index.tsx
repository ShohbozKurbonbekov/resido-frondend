import { useEffect, useState } from "react";
import Hero from "./Hero";
import type { FaqsType } from "@/lib/type/faqs";
import MainContent from "./MainContent";
import type { TeamMemberType } from "@/lib/type/about-us";

// payment
const paymentFaqs: FaqsType[] = [
  {
    id: 1,
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, and bank transfers.",
  },
  {
    id: 2,
    question: "Is my payment information secure?",
    answer: "Yes, all transactions are encrypted and processed securely.",
  },
  {
    id: 3,
    question: "Can I get a refund after payment?",
    answer:
      "Refunds depend on our refund policy. Please check the terms or contact support.",
  },
  {
    id: 4,
    question: "Will I be charged automatically every month?",
    answer:
      "Yes, subscriptions renew automatically unless you cancel before the billing date.",
  },
];
// general
const generalFaqs: FaqsType[] = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' at login and follow the instructions.",
  },
  {
    id: 2,
    question: "How do I contact support?",
    answer: "You can reach us by email at support@example.com.",
  },
  {
    id: 3,
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime from your account settings.",
  },
];

// update
const updateFaqs: FaqsType[] = [
  {
    id: 1,
    question: "How do I update my profile information?",
    answer:
      "Go to account settings and click 'Edit Profile' to update your details.",
  },
  {
    id: 2,
    question: "Can I update my email address?",
    answer:
      "Yes, you can change your email in account settings. Verification is required.",
  },
  {
    id: 3,
    question: "How do I update my payment method?",
    answer:
      "Navigate to billing settings and add or update your payment details.",
  },
  {
    id: 4,
    question: "Do updates affect my subscription?",
    answer:
      "No, updating your information does not interrupt your active subscription.",
  },
];

const teamMembers: TeamMemberType[] = [
  {
    id: `${Date.now()}`,
    memberName: "Adam Valcorn",
    memberRole: "Sales agent",
    photoUrl: "/img/user-3.jpg",
    socialLinks: {
      linkedin: "myLinkedIn!daniel@.com",
    },
    phone: "+82101234567",
  },
  {
    id: `${Date.now()}`,
    memberName: "Jack Wildson",
    memberRole: "Support agent",
    photoUrl: "/img/user-2.jpg",
    socialLinks: {
      linkedin: "myLinkedIn4@.com",
    },
    phone: "+821056383847",
  },
  {
    id: `${Date.now()}`,
    memberName: "Micahel Johson",
    memberRole: "Community agent",
    photoUrl: "/img/user-1.jpg",
    socialLinks: {
      linkedin: "myLinkedIn432@.com",
    },
    phone: "+8210237509273508",
  },
  {
    id: `${Date.now()}`,
    memberName: "Hasan Uyyubidin",
    memberRole: "Staff Leader",
    photoUrl: "/img/user-4.jpg",
    socialLinks: {
      linkedin: "myLinkedinsdgnk@.com",
    },
    phone: "+8210123456729",
  },
  {
    id: `${Date.now()}`,
    memberName: "Hiltonson Madicior",
    memberRole: "CEO",
    photoUrl: "/img/user-5.jpg",
    socialLinks: {
      linkedin: "myLinkedins252k@.com",
    },
    phone: "+82101234567",
  },
];

export default function FaqPage() {
  const [searchInquery, setSearchInquery] = useState<{ search: string }>({
    search: "general",
  });
  const [faqQuestions, setFaqQuestions] = useState<FaqsType[]>([]);

  useEffect(() => {
    if (searchInquery.search === "payment") {
      setFaqQuestions(paymentFaqs);
    } else if (searchInquery.search === "update") {
      setFaqQuestions(updateFaqs);
    } else {
      setFaqQuestions(generalFaqs);
    }
  }, [searchInquery]);

  return (
    <>
      <Hero setSearchInquery={setSearchInquery} />
      <MainContent
        setSearchInquery={setSearchInquery}
        searchInquery={searchInquery}
        faqsQuestions={faqQuestions}
        teamMembers={teamMembers}
      />
    </>
  );
}
