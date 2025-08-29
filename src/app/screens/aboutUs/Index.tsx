import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import AboutOurStory from "./AboutOurStory";
import MeetTeam from "./MeetTeam";
import { useEffect } from "react";
import type { T } from "@/lib/type/common";

export type TeamMemberType = {
  id: string;
  memberName: string;
  memberRole: string; // e.g. CEO, CTO, Marketing
  photoUrl: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
};
const members: TeamMemberType[] = [
  {
    id: `${Date.now()}`,
    memberName: "Adam Valcorn",
    memberRole: "Marketolog",
    photoUrl: "/img/user-3.jpg",
    socialLinks: {
      linkedin: "myLinkedIn@.com",
    },
  },
  {
    id: `${Date.now()}`,
    memberName: "Jack Wildson",
    memberRole: "Designer",
    photoUrl: "/img/user-2.jpg",
    socialLinks: {
      linkedin: "myLinkedIn4@.com",
    },
  },
  {
    id: `${Date.now()}`,
    memberName: "Micahel Johson",
    memberRole: "Engineer",
    photoUrl: "/img/user-1.jpg",
    socialLinks: {
      linkedin: "myLinkedIn432@.com",
    },
  },
  {
    id: `${Date.now()}`,
    memberName: "Hasan Uyyubidin",
    memberRole: "Staff Leader",
    photoUrl: "/img/user-4.jpg",
    socialLinks: {
      linkedin: "myLinkedinsdgnk@.com",
    },
  },
  {
    id: `${Date.now()}`,
    memberName: "Hiltonson Madicior",
    memberRole: "CEO",
    photoUrl: "/img/user-5.jpg",
    socialLinks: {
      linkedin: "myLinkedins252k@.com",
    },
  },
];
export default function AboutUsPage() {
  useEffect(() => {
    // get data about platform members from the database, don't implement hard code for them.
  }, []);
  return (
    <>
      <SectionIntroNoBackground
        title="About Us"
        subtitle="who we are & our mission"
      />
      <AboutOurStory />
      <MeetTeam
        title="meet our team"
        subtitle="professional & Dedicated team"
        members={members}
      />
    </>
  );
}
