import type { AgentDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgentDashboardPage = {
  agentMyBlogs: {
    blogs: [],
    totalBlogsNumber: [{ total: 0 }],
  },
  getAgentMessages: { messages: [], metaCounter: [{ total: 0 }] },
  myallReviews: { comments: [], metaCounter: [{ total: 0 }] },
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
  },
});

export const { setAgentMyBlogs, setGetAgentMessages, setMyallReviews } =
  agentDashboardPageSlice.actions;

const AgentDashoardPageReducer = agentDashboardPageSlice.reducer;
export default AgentDashoardPageReducer;
