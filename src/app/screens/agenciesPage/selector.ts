import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAgenciesPage = (state: AppRootState) => state.agenciesPage;

export const retrieveAgenciesListPage = createSelector(
  selectAgenciesPage,
  (agenciesPage) => agenciesPage.agenciesListPage
);

export const retrieveChosenAgencyProperties = createSelector(
  selectAgenciesPage,
  (agenciesPage) => agenciesPage.chosenAgencyProperties
);

export const retrieveChosenAgencyAgents = createSelector(
  selectAgenciesPage,
  (agenciesPage) => agenciesPage.chosenAgencyAgents
);
export const retrieveChosenAgencyPage = createSelector(
  selectAgenciesPage,
  (agenciesPage) => agenciesPage.chosenAgencyPage
);
