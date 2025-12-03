import type { TeamMemberType } from "@/lib/type/about-us";

export const OUR_MEMBERS: TeamMemberType[] = [
  {
    id: `${Date.now()}-1`,
    memberName: "Adam Valcorn",
    memberRole: "Marketolog",
    photoUrl: "/img/user-3.jpg",
    socialLinks: {
      facebook: null,
      twitter: null,
      instagram: null,
      linkedin: "https://linkedin.com/in/adamvalcorn",
      email: "adam@example.com",
    },
    phone: "+82 10-1234-5678",
  },
  {
    id: `${Date.now()}-2`,
    memberName: "Jack Wildson",
    memberRole: "Community Agent",
    photoUrl: "/img/user-2.jpg",
    socialLinks: {
      facebook: "https://facebook.com/jackwildson",
      twitter: null,
      instagram: "https://instagram.com/jack_designs",
      linkedin: "https://linkedin.com/in/jackwildson",
      email: "jack@example.com",
    },
    phone: "+82 10-8754-3629",
  },
  {
    id: `${Date.now()}-3`,
    memberName: "Michael Johnson",
    memberRole: "Support Agent",
    photoUrl: "/img/user-1.jpg",
    socialLinks: {
      facebook: null,
      twitter: "https://twitter.com/michael_j",
      instagram: null,
      linkedin: "https://linkedin.com/in/michaeljohnson",
      email: "michael@example.com",
    },
    phone: "+82 10-2457-6983",
  },
  {
    id: `${Date.now()}-4`,
    memberName: "Hasan Uyyubidin",
    memberRole: "Staff Leader",
    photoUrl: "/img/user-4.jpg",
    socialLinks: {
      facebook: "https://facebook.com/hasanuy",
      twitter: "https://twitter.com/hasanuy",
      instagram: "https://instagram.com/hasan_uy",
      linkedin: "https://linkedin.com/in/hasanuy",
      email: "hasan@example.com",
    },
    phone: "+82 10-9987-3344",
  },
  {
    id: `${Date.now()}-5`,
    memberName: "Hiltonson Madicior",
    memberRole: "CEO",
    photoUrl: "/img/user-5.jpg",
    socialLinks: {
      facebook: "https://facebook.com/hiltonson",
      twitter: null,
      instagram: "https://instagram.com/hiltonson",
      linkedin: "https://linkedin.com/in/hiltonson",
      email: "ceo@example.com",
    },
    phone: "+82 10-5678-1122",
  },
];

export const OUR_STORY: string[] = [
  "We believe everyone deserves a place to call home — a place where life truly begins.",
  "Our platform connects people with properties that fit their dreams, needs, and future plans.",
  "We’re committed to making the search for a home easier, smarter, and more enjoyable.",
  "With clear information and trusted listings, we remove the stress from finding the right home.",
  "We partner with reliable agents and agencies to ensure every property meets real expectations.",
  "Every user, from first-time renters to experienced buyers, can explore confidently with us.",
  "We continuously improve our platform to provide smoother navigation and more powerful tools.",
  "Our team works with one goal in mind: helping people make the best housing decisions.",
  "We believe transparency, trust, and support are the foundations of a happy move.",
  "Together, we’re shaping a world where finding your dream home becomes a joyful journey.",
];
