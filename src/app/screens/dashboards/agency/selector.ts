import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAgencyDashboardPage = (state: AppRootState) =>
  state.agencyDashboardPage;

// RETREIVE SAVED PROPERTIES
export const retrieveAgencyMyBlogs = createSelector(
  selectAgencyDashboardPage,
  (agencyDashboardPage) => agencyDashboardPage.agencyMyBlogs,
);
