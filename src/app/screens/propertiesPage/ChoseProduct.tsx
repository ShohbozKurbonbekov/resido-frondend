import { useParams } from "react-router-dom";
import DetaiLMaincontent from "./DetaiLMaincontent";
import DetailTopImage from "./DetailTopImage";
import { useEffect, useState } from "react";
import type { Agent } from "@/lib/type/agent";
import type { PropertyDetailFeaturedPropertyType } from "@/lib/type/property";

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

export default function ChoseProduct() {
  const { propertyId } = useParams<{ propertyId: string }>();

  const [propertyAgent] = useState<Agent>({
    agentImage: "/img/user-4.jpg",
    agentName: "Adam D. Okraar",
    agentMemberYear: 2001,
    agentPhone: "(91) 123 456 7895",
    agentLocation: "3599 Huntz Lane",
    agentPosition: "CEO",
    agentCountry: "USA",
    agentCity: "New York",
    agentContacts: {
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
      instagram: "https://www.instagram.com/",
      email: "https://www.email.com/",
      twitter: "https://www.twitter.com/",
    },
  });
  useEffect(() => {
    // Getting data from database using propertyId in the params
    // Getting agent Data according to the property data
    // Getting  5 properties from the database according to most liked, most viewed, and finally most paid membership.
  }, []);

  console.log(propertyId);
  return (
    <div className="property-detail bg-sky-100 ">
      {/* // Detail top image */}
      <DetailTopImage />
      <DetaiLMaincontent
        featuredProperty={featuredProperty}
        propertyAgent={propertyAgent}
      />
    </div>
  );
}
