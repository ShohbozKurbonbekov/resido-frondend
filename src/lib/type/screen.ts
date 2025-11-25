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
import type {
  AgenciesListPage,
  Agency,
  ChosenAgencyTargetItemsType,
} from "./agency";
import type { BlogsListPage } from "./blogs";
// REACTT APP STATE
export interface AppRootState {
  homepage: HomePageState;
  propertiesPage: PropertiesPageState;
  agentsPage: AgentsPageState;
  agenciesPage: AgenciesPageState;
  blogsPage: BlogsPageState;
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
  chosenAgencyPage: Agency | null;
  chosenAgencyTargetItems: ChosenAgencyTargetItemsType;
}

// BLOGS PAGE
export interface BlogsPageState {
  blogsListPage: BlogsListPage;
}
