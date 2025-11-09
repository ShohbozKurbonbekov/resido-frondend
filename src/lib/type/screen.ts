import type {
  ChosenProperty,
  FeaturedPropertyResults,
  Properties,
  RecentPropertyResult,
} from "./property";
import type { FeaturedAgentsResult } from "./agent";
import type { Comment } from "./comment";
// REACTT APP STATE
export interface AppRootState {
  homepage: HomePageState;
  propertiesPage: PropertiesPageState;
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
}
