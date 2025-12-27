import type { AgentDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgentDashboardPage = {
  agentMyBlogs: { blogs: [], totalBlogsNumber: [{ total: 0 }] },
};

const agentDashboardPageSlice = createSlice({
  name: "agentDashboardPage",
  initialState,
  reducers: {
    setAgentMyBlogs: (state, action) => {
      state.agentMyBlogs = action.payload;
    },
  },
});

export const { setAgentMyBlogs } = agentDashboardPageSlice.actions;

const AgentDashoardPageReducer = agentDashboardPageSlice.reducer;
export default AgentDashoardPageReducer;
