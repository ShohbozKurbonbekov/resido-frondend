import type { AgentsPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgentsPageState = {
  agentsListPage: { agents: [], totalNumbers: [] },
  chosenAgentPage: { agent: [] },
};

const agentsPageSlice = createSlice({
  name: "agentsPage",
  initialState,
  reducers: {
    setAgentsListPage: (state, action) => {
      state.agentsListPage = action.payload;
    },
    setChosenAgentPage: (state, action) => {
      state.chosenAgentPage = action.payload;
    },
  },
});

export const { setAgentsListPage, setChosenAgentPage } =
  agentsPageSlice.actions;

const AgentsPageReducer = agentsPageSlice.reducer;
export default AgentsPageReducer;
