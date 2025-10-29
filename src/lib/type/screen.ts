import type { FeaturedPropertyResults, RecentPropertyResult } from "./property";
import type { FeaturedAgentsResult } from "./agent";
import type { Comment } from "./comment";
// REACTT APP STATE
export interface AppRootState {
  homepage: HomePageState;
}

// HOMEPAGE
export interface HomePageState {
  recentPropertyForRent: RecentPropertyResult;
  featuredProperties: FeaturedPropertyResults;
  featuredAgents: FeaturedAgentsResult;
  latestComments: Comment[];
}
