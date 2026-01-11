import type { AgentDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgentDashboardPage = {
  agentMyBlogs: {
    blogs: [],
    totalBlogsNumber: [{ total: 0 }],
  },
  getAgentMessages: { messages: [], metaCounter: [{ total: 0 }] },
  myallReviews: { comments: [], metaCounter: [{ total: 0 }] },
  agentMyProperties: { properties: [], totalPropertiesNumber: [{ total: 0 }] },
  agentDashboardOverview: {
    messages: { total: 0 },
    generatedAt: null,
    myBlogs: { total: 0 },
    myProperties: { total: 0 },
    reviews: { total: 0 },
    totalLikes: { total: 0 },
    totalViews: { total: 0 },
    transactions: { total: 0 },
  },
};

const agentDashboardPageSlice = createSlice({
  name: "agentDashboardPage",
  initialState,
  reducers: {
    setAgentMyBlogs: (state, action) => {
      state.agentMyBlogs = action.payload;
    },

    setGetAgentMessages: (state, action) => {
      state.getAgentMessages = action.payload;
    },

    setMyallReviews: (state, action) => {
      state.myallReviews = action.payload;
    },
    setAgentMyProperties: (state, action) => {
      state.agentMyProperties = action.payload;
    },
    setAgentDashboardOverview: (state, action) => {
      state.agentDashboardOverview = action.payload;
    },
  },
});

export const {
  setAgentMyBlogs,
  setGetAgentMessages,
  setMyallReviews,
  setAgentMyProperties,
  setAgentDashboardOverview,
} = agentDashboardPageSlice.actions;

const AgentDashoardPageReducer = agentDashboardPageSlice.reducer;
export default AgentDashoardPageReducer;
