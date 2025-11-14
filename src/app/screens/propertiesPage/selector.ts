import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectPropertiesPage = (state: AppRootState) => state.propertiesPage;

export const retrieveProperties = createSelector(
  selectPropertiesPage,
  (propertiesPage) => propertiesPage.properties
);

export const retrieveChosenProperty = createSelector(
  selectPropertiesPage,
  (propertiesPage) => propertiesPage.chosenProperty
);

export const retrieveChosenPropComments = createSelector(
  selectPropertiesPage,
  (propertiesPage) => propertiesPage.chosenPropComments
);
