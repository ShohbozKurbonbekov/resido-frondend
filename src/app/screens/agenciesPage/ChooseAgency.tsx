import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import SectionTopShortInfo from "@/app/components/SectionTopShortInfo";
import type { Agency } from "@/lib/type/agency";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AgencyDetailMainContent from "./AgencyDetailMainContent";
import PropertyService from "@/app/services/PropertyService";
import type { PropertyDetailFeaturedPropertyType } from "@/lib/type/property";
import AgencyService from "@/app/services/AgencyService";
import AgentService from "@/app/services/AgentService";
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

const agencyAgents = [
  {
    agentImage: "/img/user-1.jpg",
    agentName: "James N. Green",
    agentProperties: 117,
    agentPhone: "02937582376",
    agentRating: 4,
    agentReviews: 42,
  },
  {
    agentImage: "/img/user-2.jpg",
    agentName: "Seema Gauranki",
    agentProperties: 46,
    agentPhone: "23598235",
    agentRating: 3,
    agentReviews: 46,
  },
  {
    agentImage: "/img/user-3.jpg",
    agentName: "Adam Walcorn",
    agentProperties: 38,
    agentPhone: "2379823578923",
    agentRating: 4,
    agentReviews: 16,
  },
  {
    agentImage: "/img/user-4.jpg",
    agentName: "Jasmin Khatri",
    agentProperties: 51,
    agentPhone: "238572375",
    agentRating: 5,
    agentReviews: 28,
  },
  {
    agentImage: "/img/user-5.jpg",
    agentName: "Rudra K. Mathan",
    agentProperties: 75,
    agentPhone: "9235987235",
    agentRating: 1,
    agentReviews: 75,
  },
  {
    agentImage: "/img/user-6.jpg",
    agentName: "Niharika Muthurk",
    agentProperties: 15,
    agentPhone: "83259817",
    agentRating: 5,
    agentReviews: 15,
  },
];
const agencyProperties = [
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

const chosenAgency: Agency = {
  agencyName: "Green villa",
  agencyAgentNumbers: 4,
  agencyImage: "/img/ag-1.png",
  agencyLocation: "3599 Huntz Lane",
  agencyPropertyNumbers: 140,
  agencyDescription:
    "Most text editors like MS Word or Lotus Notes generate random lorem text when needed, either as pre-installed module or plug-in to be added. Word selection or sequence don't necessarily match the original, which is intended to add variety. Presentation software like Keynote.",
  agencySocialContacts: {
    facebook: "https://www.facebook.com/",
    twitter: "https://www.twitter.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    email: "https://www.gmail.com/",
    skype: "myskype@e.com/",
  },
  agencyOwner: "Mr. Adam Vilawo",
  agencyPhone: "+91 235 658 4758",
  agencyCountry: "United State",
  agencyCity: "New York",
  agencyMemberyear: 2007,
};

export default function ChooseAgency() {
  const { agencyId } = useParams<{ agencyId: string }>();
  const [activeTab, setActiveTab] = useState<"properties" | "agents">("agents");

  const handleTabContent = (str: "agents" | "properties"): void => {
    setActiveTab(str);
  };

  useEffect(() => {
    const agency = new AgencyService();
    agency
      .getAgency(agencyId)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [agencyId]);

  useEffect(() => {
    if (activeTab === "agents") {
      // getting all the agents, being a member of a certain agency
      const agent = new AgentService();
      agent.getAgents().then().catch();
    } else if (activeTab === "properties") {
      const property = new PropertyService();
      property.getProperties();
    }
  }, [activeTab]);

  if (!chosenAgency) return null;
  return (
    <>
      <SectionIntroNoBackground
        title="Agency Detail"
        subtitle={`${chosenAgency.agencyName} from ${chosenAgency.agencyLocation}`}
      />
      <SectionTopShortInfo
        shortInfo={{
          logo: chosenAgency.agencyImage,
          location: chosenAgency.agencyLocation,
          name: chosenAgency.agencyName,
          description: chosenAgency.agencyDescription,
          propertyNumber: chosenAgency.agencyPropertyNumbers,
          ...chosenAgency.agencySocialContacts,
        }}
      />
      <AgencyDetailMainContent
        agency={chosenAgency}
        handleTab={handleTabContent}
        activeTab={activeTab}
        agencyInfo={activeTab === "agents" ? agencyAgents : agencyProperties}
        featuredProperty={featuredProperty}
      />
    </>
  );
}
