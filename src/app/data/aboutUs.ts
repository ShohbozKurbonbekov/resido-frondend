import type { CardsContentType } from "@/lib/type/about-us";
import { Group, LockKeyholeOpen, Twitter } from "lucide-react";

export const CARDS_DATA: CardsContentType[] = [
  {
    cardTitle: "Secure Transactions & 24/7 Support",
    cardSubtitle:
      "We ensure every property transaction is safe, and our dedicated team is always available to assist you.",
    Icon: LockKeyholeOpen,
  },
  {
    cardTitle: "Manage Your Listings with Ease",
    cardSubtitle:
      "Our platform helps agents and property owners keep their listings organized and visible to the right audience.",
    Icon: Twitter,
  },
  {
    cardTitle: "Passionate Team, Dedicated to You",
    cardSubtitle:
      "We work hard to match clients with their dream homes and provide exceptional service every step of the way.",
    Icon: Group,
  },
];
