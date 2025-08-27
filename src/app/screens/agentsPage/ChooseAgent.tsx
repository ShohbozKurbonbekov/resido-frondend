import AgentService from "@/app/services/AgentService";
import type { Agent } from "@/lib/type/agent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AgentDetailMainContent from "./AgentDetailMainContent";
import type { PropertyDetailFeaturedPropertyType } from "@/lib/type/property";
import SectionIntroNoBackground from "../../components/SectionIntroNoBackground";
import SectionTopShortInfo from "../../components/SectionTopShortInfo";

const agentProperties = [
  {
    propertyStatus: "verified",
    propertyImages: ["/img/p-16.jpg", "/img/p-17.jpg", "/img/p-15.jpg"],
    propertyMarketStatus: "for rent",
    propertyType: "Apartment",
    propertyName: "The Green Canton Chrysler",
    propertyLocation: "210 Zirak Road, Canada",
    PropertyBedroom: 3,
    propertyHall: 1,
    propertyKitchen: 2,
    propertyArea: 1900,
    propertyPrice: 80000,
  },
  {
    propertyStatus: "superAgent",
    propertyImages: ["/img/p-1.jpg", "/img/p-2.jpg", "/img/p-3.jpg"],
    propertyMarketStatus: "for sell",
    propertyType: "House",
    propertyName: "Purple Flatiron House",
    propertyLocation: "210 Zirak Road, Canada",
    PropertyBedroom: 6,
    propertyHall: 2,
    propertyKitchen: 4,
    propertyArea: 1600,
    propertyPrice: 30000,
  },
  {
    propertyStatus: "verified",
    propertyImages: ["/img/p-4.jpg", "/img/p-5.jpg", "/img/p-6.jpg"],
    propertyMarketStatus: "for rent",
    propertyType: "building",
    propertyName: "The Green Canton Chrysler",
    propertyLocation: "210 Zirak Road, Canada",
    PropertyBedroom: 2,
    propertyHall: 1,
    propertyKitchen: 1,
    propertyArea: 1200,
    propertyPrice: 44000,
  },
  {
    propertyStatus: "verified",
    propertyImages: ["/img/p-16.jpg", "/img/p-17.jpg", "/img/p-15.jpg"],
    propertyMarketStatus: "for rent",
    propertyType: "Apartment",
    propertyName: "The Green Canton Chrysler",
    propertyLocation: "210 Zirak Road, Canada",
    PropertyBedroom: 3,
    propertyHall: 1,
    propertyKitchen: 2,
    propertyArea: 1900,
    propertyPrice: 56000,
  },
  {
    propertyStatus: "superAgent",
    propertyImages: ["/img/p-1.jpg", "/img/p-2.jpg", "/img/p-3.jpg"],
    propertyMarketStatus: "for sell",
    propertyType: "House",
    propertyName: "Purple Flatiron House",
    propertyLocation: "210 Zirak Road, Canada",
    PropertyBedroom: 6,
    propertyHall: 2,
    propertyKitchen: 4,
    propertyArea: 1600,
    propertyPrice: 99000,
  },
  {
    propertyStatus: "verified",
    propertyImages: ["/img/p-4.jpg", "/img/p-5.jpg", "/img/p-6.jpg"],
    propertyMarketStatus: "for rent",
    propertyType: "building",
    propertyName: "The Green Canton Chrysler",
    propertyLocation: "210 Zirak Road, Canada",
    PropertyBedroom: 2,
    propertyHall: 1,
    propertyKitchen: 1,
    propertyArea: 1200,
    propertyPrice: 87000,
  },
];

const featuredProperty: PropertyDetailFeaturedPropertyType[] = [
  {
    featuredPropertyImage: "/img/p-12.jpg",
    featuredPropertyName: "Oss vengel New Apartment",
    featuredPropertyLocation: "Sans Fransico",
    featuredPropertyPrice: "$4,240",
  },
  {
    featuredPropertyImage: "/img/p-13.jpg",
    featuredPropertyName: "Montreal Quriqe Apartment",
    featuredPropertyLocation: "Liverpool, London",
    featuredPropertyState: "For Rent",
    featuredPropertyPrice: "$7,380",
  },
  {
    featuredPropertyImage: "/img/p-14.jpg",
    featuredPropertyName: "Curmic Studio For Office",
    featuredPropertyLocation: "Montreal, Canada",
    featuredPropertyState: "For Rent",
    featuredPropertyPrice: "$8,730",
  },
  {
    featuredPropertyImage: "/img/p-15.jpg",
    featuredPropertyName: "Montreal Quebec City",
    featuredPropertyLocation: "Sreek View, New York",
    featuredPropertyState: "For Rent",
    featuredPropertyPrice: "$6,240",
  },
];

export default function ChooseAgent() {
  const chosenAgent: Agent = {
    agentImage: "/img/user-2.jpg",
    agentName: "Daniel Radcliffe",
    agentProperties: 33,
    agentPhone: "01039674224",
    agentRating: 5,
    agentReviews: 101,
    agentContacts: {
      facebook: "https://www.facebook.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com",
      email: "https://www.gmail.com",
      skype: "isya24lia",
    },

    agentDescription:
      "Think of a news blog that's filled with content hourly on the day of going live However, reviewers tend to be distracted by comprehensible content. In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready.",
    agentLocation: "3599 Huntz Lane",
    agentMemberYear: 2007,
    agentPosition: "CEO",
    agentCountry: "USA",
    agentCity: "New York",
  };

  const { agentId } = useParams<{ agentId: string }>();
  console.log(agentId);
  useEffect(() => {
    const agent = new AgentService();
    agent
      .getAgent("nsvjslvnsjvbnsljb")
      .then((data) => {
        console.log(data);
        // set Agent data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!chosenAgent) return null;

  return (
    <>
      {/* // Section introduction */}
      <SectionIntroNoBackground
        title="Agent Detail"
        subtitle="Adam D. Okraar from Canada"
      />
      <SectionTopShortInfo
        shortInfo={{
          logo: chosenAgent.agentImage,
          name: chosenAgent.agentName,
          location: chosenAgent.agentLocation,
          description: chosenAgent.agentDescription,
          propertyNumber: chosenAgent.agentProperties,
          ...chosenAgent.agentContacts,
        }}
      />
      <AgentDetailMainContent
        featuredProperty={featuredProperty}
        agentProperties={agentProperties}
        agent={chosenAgent}
      />
    </>
  );
}
