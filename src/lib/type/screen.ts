import type {
  ChosenProperty,
  FeaturedPropertyResults,
  Properties,
  RecentPropertyResult,
} from "./property";
import type {
  AgentProperties,
  AgentsListPage,
  ChosenAgentPageType,
  FeaturedAgentsResult,
} from "./agent";
import type { Comment, Comments } from "./comment";
import type { AgenciesListPage } from "./agency";
// REACTT APP STATE
export interface AppRootState {
  homepage: HomePageState;
  propertiesPage: PropertiesPageState;
  agentsPage: AgentsPageState;
  agenciesPage: AgenciesPageState;
}

// HOMEPAGE
export interface HomePageState {
  recentPropertyForRent: RecentPropertyResult;
  featuredProperties: FeaturedPropertyResults;
  featuredAgents: FeaturedAgentsResult;
  latestComments: Comment[];
}

// PROPERTIES PAGE
export interface PropertiesPageState {
  properties: Properties;
  chosenProperty: ChosenProperty;
  chosenPropComments: Comments;
}

// AGENTS PAGE
export interface AgentsPageState {
  agentsListPage: AgentsListPage;
  chosenAgentPage: ChosenAgentPageType;
  chosenAgentProperties: AgentProperties;
  chosenAgentComments: Comments;
}

// AGENCIES PAGE
export interface AgenciesPageState {
  agenciesListPage: AgenciesListPage;
}
