import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectUserDashboardPage = (state: AppRootState) =>
  state.userDashboardPage;

// RETREIVE SAVED PROPERTIES
export const retrieveSavedProperties = createSelector(
  selectUserDashboardPage,
  (userDashboardPage) => userDashboardPage.savedProperties
);

export const retrieveFollowedAgents = createSelector(
  selectUserDashboardPage,
  (userDashboardPage) => userDashboardPage.followedAgents
);

export const retrieveSavedBlogs = createSelector(
  selectUserDashboardPage,
  (userDashboardPage) => userDashboardPage.savedBlogs
);

export const retrieveGetUserComments = createSelector(
  selectUserDashboardPage,
  (userDashboardPage) => userDashboardPage.getUserComments
);
