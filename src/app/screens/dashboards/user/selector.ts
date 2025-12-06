import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectUserDashboardPage = (state: AppRootState) =>
  state.userDashboardPage;

// RETREIVE SAVED PROPERTIES
export const retrieveSavedProperties = createSelector(
  selectUserDashboardPage,
  (userDashboardPage) => userDashboardPage.savedProperties
);
