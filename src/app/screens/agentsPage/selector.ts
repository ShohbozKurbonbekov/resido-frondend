import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAgentsPage = (state: AppRootState) => state.agentsPage;

export const retrieveAgentsListPage = createSelector(
  selectAgentsPage,
  (agentsPage) => agentsPage.agentsListPage
);

export const retrieveChosenAgentPage = createSelector(
  selectAgentsPage,
  (agentsPage) => agentsPage.chosenAgentPage
);

export const retrieveChosenAgentProperties = createSelector(
  selectAgentsPage,
  (agentsPage) => agentsPage.chosenAgentProperties
);

export const retrieveChosenAgentComments = createSelector(
  selectAgentsPage,
  (agentsPage) => agentsPage.chosenAgentComments
);
