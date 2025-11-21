import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAgenciesPage = (state: AppRootState) => state.agenciesPage;

export const retrieveAgenciesListPage = createSelector(
  selectAgenciesPage,
  (agenciesPage) => agenciesPage.agenciesListPage
);
