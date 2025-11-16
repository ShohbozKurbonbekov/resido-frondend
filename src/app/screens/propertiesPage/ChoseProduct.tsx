import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type {
  ChosenProperty,
  ChosenPropertyStateType,
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
import type { Comments } from "@/lib/type/comment";
import type { ChosenPropCommentsInput } from "@/lib/type/ChosenPropCommentsInput";
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

// ------------------------------------------- COMPONENT ------------------------------------
export default function ChoseProduct() {
  const { setChosenProperty, setChosenPropComments } = actionDispatch(
    useDispatch()
  );
  const { chosenPropComments } = useSelector(chosenPropCommentsRetriever);
  const { chosenProperty } = useSelector(chosenPropertyRetriever);
  const { propertyId } = useParams<{ propertyId: string }>();
  const [chosenPropertyState, setChosenPropertyState] =
    useState<ChosenPropertyStateType>({
      propertyId: propertyId!,
      reLoadPropertyPage: false,
    });
  const [propertyComments, setPropertyComments] =
    useState<ChosenPropCommentsInput>({
      page: 1,
      limit: 10,
      commentTarget: CommentTargetType.PROPERTY,
    });

  // -------------------------------------- HANDLERS ---------------------------

  const chosenPropCommentsContextValue = useMemo(() => {
    return {
      propertyComments,
      setPropertyComments,
      setChosenPropertyState,
    };
  }, [propertyComments, setChosenPropertyState]);

  // ------------------------------------------------- GETTING DATA FROM DB --------------------------------
  useEffect(() => {
    const { propertyId } = chosenPropertyState;
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
  }, [chosenPropertyState, propertyComments]);

  return (
    <div className="property-detail bg-sky-100 ">
      {chosenProperty.mainProperty.length ? (
        <>
          <ChosePropertyTopImages
            mainProperty={chosenProperty.mainProperty[0]}
          />
          <ChosenPropCommentsContext value={chosenPropCommentsContextValue}>
            <ChosenPropertyMainContent
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
