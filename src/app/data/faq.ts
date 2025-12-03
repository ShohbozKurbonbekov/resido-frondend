import type { ContactOptionsType, FaqsType } from "@/lib/type/faqs";
import { Headset, MessagesSquare, ShoppingBasket } from "lucide-react";

// PAYMENT
export const PAYMENT_QUESTIONS: FaqsType[] = [
  {
    id: Date.now() + 1,
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, and bank transfers.",
  },
  {
    id: Date.now() + 2,
    question: "Is my payment information secure?",
    answer: "Yes, all transactions are encrypted and processed securely.",
  },
  {
    id: Date.now() + 3,
    question: "Can I get a refund after payment?",
    answer:
      "Refunds depend on our refund policy. Please check the terms or contact support.",
  },
  {
    id: Date.now() + 4,
    question: "Will I be charged automatically every month?",
    answer:
      "Yes, subscriptions renew automatically unless you cancel before the billing date.",
  },
];

// GENERAL
export const GENERAL_QUESTIONS: FaqsType[] = [
  {
    id: Date.now() + 1,
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' at login and follow the instructions.",
  },
  {
    id: Date.now() + 2,
    question: "How do I contact support?",
    answer: "You can reach us by email at support@example.com.",
  },
  {
    id: Date.now() + 3,
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime from your account settings.",
  },
];

// UPDATE
export const UPDATE_QUESTIONS: FaqsType[] = [
  {
    id: Date.now() + 1,
    question: "How do I update my profile information?",
    answer:
      "Go to account settings and click 'Edit Profile' to update your details.",
  },
  {
    id: Date.now() + 2,
    question: "Can I update my email address?",
    answer:
      "Yes, you can change your email in account settings. Verification is required.",
  },
  {
    id: Date.now() + 3,
    question: "How do I update my payment method?",
    answer:
      "Navigate to billing settings and add or update your payment details.",
  },
  {
    id: Date.now() + 4,
    question: "Do updates affect my subscription?",
    answer:
      "No, updating your information does not interrupt your active subscription.",
  },
];

// CONTACT OPTIONS
export const CONTACT_OPTIONS: ContactOptionsType[] = [
  { memberRole: "Marketolog", title: "Contact Sales", Icon: ShoppingBasket },
  { memberRole: "Support Agent", title: "Contact Support", Icon: Headset },
  {
    memberRole: "Community Agent",
    title: "Start with Chat",
    Icon: MessagesSquare,
  },
];

// TAB BUTTONS
