import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAgentDashboardPage = (state: AppRootState) =>
  state.agentDashboardPage;

// RETREIVE SAVED PROPERTIES
export const retrieveAgentMyBlogs = createSelector(
  selectAgentDashboardPage,
  (agentDashboardPage) => agentDashboardPage.agentMyBlogs
);

export const retrieveGetAgentMessages = createSelector(
  selectAgentDashboardPage,
  (agentDashboardPage) => agentDashboardPage.getAgentMessages
);
export const retrieveMyallReviews = createSelector(
  selectAgentDashboardPage,
  (agentDashboardPage) => agentDashboardPage.myallReviews
);

export const retrieveAgentMyProperties = createSelector(
  selectAgentDashboardPage,
  (agentDashboardPage) => agentDashboardPage.agentMyProperties
);
