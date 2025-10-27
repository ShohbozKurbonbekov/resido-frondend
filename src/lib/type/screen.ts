import type { FeaturedPropertyResults, RecentPropertyResult } from "./property";
import type { FeaturedAgentsResult } from "./agent";

// REACTT APP STATE
export interface AppRootState {
  homepage: HomePageState;
}

// HOMEPAGE
export interface HomePageState {
  recentPropertyForRent: RecentPropertyResult;
  featuredProperties: FeaturedPropertyResults;
  featuredAgents: FeaturedAgentsResult;
}
