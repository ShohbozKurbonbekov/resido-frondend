import type { HomePageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HomePageState = {
  recentPropertyForRent: { properties: [], totalPropertiesNumber: [] },
  featuredAgents: { agents: [], totalNumbers: [] },
  featuredProperties: { properties: [], totalPropertiesNumber: [] },
};

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setRecentRentProperties: (state, action) => {
      state.recentPropertyForRent = action.payload;
    },
    setFeaturedProperties: (state, action) => {
      state.featuredProperties = action.payload;
    },
    setFeaturedAgents: (state, action) => {
      state.featuredAgents = action.payload;
    },
  },
});

export const {
  setFeaturedAgents,
  setRecentRentProperties,
  setFeaturedProperties,
} = homepageSlice.actions;

const HomePageReducer = homepageSlice.reducer;
export default HomePageReducer;
