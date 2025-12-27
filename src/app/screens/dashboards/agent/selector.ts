import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAgentDashboardPage = (state: AppRootState) =>
  state.agentDashboardPage;

// RETREIVE SAVED PROPERTIES
export const retrieveAgentMyBlogs = createSelector(
  selectAgentDashboardPage,
  (agentDashboardPage) => agentDashboardPage.agentMyBlogs
);
