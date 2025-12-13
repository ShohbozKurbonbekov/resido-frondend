import type { UserDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserDashboardPage = {
  savedProperties: { properties: [], totalPropertiesNumber: [{ total: 0 }] },
  followedAgents: { agents: [], totalNumbers: [{ total: 0 }] },
  savedBlogs: { blogs: [], totalBlogsNumber: [{ total: 0 }] },
  getUserComments: { comments: [], metaCounter: [{ total: 0 }] },
  getMemberMessages: { messages: [], metaCounter: [{ total: 0 }] },
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
  },
});

export const {
  setSavedProperties,
  setFollowedAgents,
  setSavedBlogs,
  setGetUserComments,
  setGetMemberMessages,
} = userDashboardPageSlice.actions;

const UserDashoardPageReducer = userDashboardPageSlice.reducer;
export default UserDashoardPageReducer;
