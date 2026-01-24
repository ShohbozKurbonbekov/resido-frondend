import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAgencyDashboardPage = (state: AppRootState) =>
  state.agencyDashboardPage;

// RETREIVE SAVED PROPERTIES
export const retrieveAgencyMyBlogs = createSelector(
  selectAgencyDashboardPage,
  (agencyDashboardPage) => agencyDashboardPage.agencyMyBlogs,
);

export const retrieveGetAgencyMessages = createSelector(
  selectAgencyDashboardPage,
  (agencyDashboardPage) => agencyDashboardPage.getAgencyMessages,
);

export const retrieveAgencySubscriptionInfo = createSelector(
  selectAgencyDashboardPage,
  (agencyDashboardPage) => agencyDashboardPage.agencySubscriptionInfo,
);

export const retrieveAgencyNotifications = createSelector(
  selectAgencyDashboardPage,
  (agencyDashboardPage) => agencyDashboardPage.agencyNotifications,
);
