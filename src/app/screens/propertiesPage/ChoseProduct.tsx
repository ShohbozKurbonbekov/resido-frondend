import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ChosenProperty } from "@/lib/type/property";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenPropComments, setChosenProperty } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenProperty } from "./selector";
import PropertyService from "@/app/services/Property.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import NoFound from "@/app/components/NoFound";
import ChosePropertyTopImages from "./ChosePropertyTopImages";
import ChosenPropertyMainContent from "./ChosenPropertyMainContent";
import CommentService from "@/app/services/Comment.service";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import type { ChosenItemCommentsInput, Comments } from "@/lib/type/comment";

// ------------------------------- REDUX SETUP ---------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProperty: (data: ChosenProperty) =>
    dispatch(setChosenProperty(data)),
  setChosenPropComments: (data: Comments) =>
    dispatch(setChosenPropComments(data)),
});

const chosenPropertyRetriever = createSelector(
  retrieveChosenProperty,
  (chosenProperty) => ({ chosenProperty }),
);

// ------------------------------------------- COMPONENT ------------------------------------
export default function ChoseProduct() {
  const { setChosenProperty, setChosenPropComments } =
    actionDispatch(useDispatch());
  const { chosenProperty } = useSelector(chosenPropertyRetriever);
  const { propertyId } = useParams<{ propertyId: string }>();
  const [reloadMainPage, setReloadMainPage] = useState<boolean>(false);

  const [propertyComments, setPropertyComments] =
    useState<ChosenItemCommentsInput>({
      page: 1,
      limit: 10,
      commentTarget: CommentTargetType.PROPERTY,
    });

  // -------------------------------------- HANDLERS ---------------------------

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
  }, [propertyId, propertyComments, reloadMainPage]);

  return (
    <div className="property-detail bg-sky-100 ">
      {chosenProperty.mainProperty.length ? (
        <>
          <ChosePropertyTopImages
            mainProperty={chosenProperty.mainProperty[0]}
          />
          <ChosenPropertyMainContent
            setPropertyComments={setPropertyComments}
            setReloadMainPage={setReloadMainPage}
          />
        </>
      ) : (
        <NoFound />
      )}
    </div>
  );
}
