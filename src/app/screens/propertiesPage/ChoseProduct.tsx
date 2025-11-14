import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { Agent } from "@/lib/type/agent";
import type {
  ChosenProperty,
  PropertyDetailFeaturedPropertyType,
} from "@/lib/type/property";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenPropComments, setChosenProperty } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenPropComments, retrieveChosenProperty } from "./selector";
import PropertyService from "@/app/services/PropertyService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import NoFound from "@/app/components/NoFound";
import ChosePropertyTopImages from "./ChosePropertyTopImages";
import ChosenPropertyMainContent from "./ChosenPropertyMainContent";
import CommentService from "@/app/services/CommentService";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import type { ChosenPropCommentsInput, Comments } from "@/lib/type/comment";
import { ChosenPropCommentsContext } from "@/app/context/PropertyCommentsContex";

// ------------------------------- REDUX SETUP ---------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProperty: (data: ChosenProperty) =>
    dispatch(setChosenProperty(data)),
  setChosenPropComments: (data: Comments) =>
    dispatch(setChosenPropComments(data)),
});

const chosenPropertyRetriever = createSelector(
  retrieveChosenProperty,
  (chosenProperty) => ({ chosenProperty })
);

const chosenPropCommentsRetriever = createSelector(
  retrieveChosenPropComments,
  (chosenPropComments) => ({ chosenPropComments })
);

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

// ------------------------------------------- COMPONENT ------------------------------------
export default function ChoseProduct() {
  const { setChosenProperty, setChosenPropComments } = actionDispatch(
    useDispatch()
  );
  const { chosenPropComments } = useSelector(chosenPropCommentsRetriever);
  const { chosenProperty } = useSelector(chosenPropertyRetriever);
  const { propertyId } = useParams<{ propertyId: string }>();
  const [propertyComments, setPropertyComments] =
    useState<ChosenPropCommentsInput>({
      page: 1,
      limit: 10,
      commentTarget: CommentTargetType.PROPERTY,
    });

  const chosenPropCommentsContextValue = useMemo(() => {
    return {
      propertyComments,
      setPropertyComments,
    };
  }, [propertyComments]);

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

  // ------------------------------------------------- GETTING DATA FROM DB --------------------------------
  useEffect(() => {
    const property = new PropertyService();
    const comment = new CommentService();

    property
      .getProperty(propertyId!)
      .then((data) => {
        setChosenProperty(data);
      })
      .catch((error) => {
        console.log(error);
        sweetErrorHandling(error);
      });

    comment
      .getItemComments(propertyId!, propertyComments)
      .then((data) => {
        setChosenPropComments(data);
      })
      .catch((error) => {
        sweetErrorHandling(error);
      });
  }, [propertyId, propertyComments]);

  return (
    <div className="property-detail bg-sky-100 ">
      {chosenProperty.mainProperty.length ? (
        <>
          <ChosePropertyTopImages
            mainProperty={chosenProperty.mainProperty[0]}
          />
          <ChosenPropCommentsContext value={chosenPropCommentsContextValue}>
            <ChosenPropertyMainContent
              featuredProperty={featuredProperty}
              propertyAgent={propertyAgent}
              chosenPropComments={chosenPropComments}
            />
          </ChosenPropCommentsContext>
        </>
      ) : (
        <NoFound />
      )}
    </div>
  );
}
