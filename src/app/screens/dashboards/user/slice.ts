import type { UserDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserDashboardPage = {
  savedProperties: { properties: [], totalPropertiesNumber: [{ total: 0 }] },
  followedAgents: { agents: [], totalNumbers: [{ total: 0 }] },
  savedBlogs: { blogs: [], totalBlogsNumber: [{ total: 0 }] },
  getUserComments: { comments: [], metaCounter: [{ total: 0 }] },
  getMemberMessages: { messages: [], metaCounter: [{ total: 0 }] },
  userDashboardOverview: {
    followedAgents: { total: 0 },
    savedProperties: { total: 0 },
    savedArticles: { total: 0 },
    reviews: { total: 0 },
    messages: { total: 0 },
    generatedAt: null,
  },
};

const userDashboardPageSlice = createSlice({
  name: "userDashboardPage",
  initialState,
  reducers: {
    setSavedProperties: (state, action) => {
      state.savedProperties = action.payload;
    },
    setFollowedAgents: (state, action) => {
      state.followedAgents = action.payload;
    },
    setSavedBlogs: (state, action) => {
      state.savedBlogs = action.payload;
    },
    setGetUserComments: (state, action) => {
      state.getUserComments = action.payload;
    },
    setGetMemberMessages: (state, action) => {
      state.getMemberMessages = action.payload;
    },
    setUserdashboardOverview: (state, action) => {
      state.userDashboardOverview = action.payload;
    },
  },
});

export const {
  setSavedProperties,
  setFollowedAgents,
  setSavedBlogs,
  setGetUserComments,
  setGetMemberMessages,
  setUserdashboardOverview,
} = userDashboardPageSlice.actions;

const UserDashoardPageReducer = userDashboardPageSlice.reducer;
export default UserDashoardPageReducer;
