import type { AppRootState } from "@/lib/type/screen";
import { createSelector } from "@reduxjs/toolkit";

const selectHomePage = (state: AppRootState) => state.homepage;

export const retrieveRecentRentProperties = createSelector(
  selectHomePage,
  (homepage) => homepage.recentPropertyForRent,
);

export const retrieveFeaturedProperties = createSelector(
  selectHomePage,
  (homepage) => homepage.featuredProperties,
);

export const retrieveFeaturedAgents = createSelector(
  selectHomePage,
  (homepage) => homepage.featuredAgents,
);

export const retrieveLatestComments = createSelector(
  selectHomePage,
  (homepage) => homepage.latestComments,
);
