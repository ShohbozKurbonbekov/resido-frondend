import type { AgentsPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgentsPageState = {
  agentsListPage: { agents: [], totalNumbers: [] },
  chosenAgentPage: { agent: [] },
  chosenAgentProperties: { agent: [] },
  chosenAgentComments: { comments: [], metaCounter: [{ total: 0 }] },
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
    setChosenAgentProperties: (state, action) => {
      state.chosenAgentProperties = action.payload;
    },
    setChosenAgentComments: (state, action) => {
      state.chosenAgentComments = action.payload;
    },
  },
});

export const {
  setAgentsListPage,
  setChosenAgentPage,
  setChosenAgentProperties,
  setChosenAgentComments,
} = agentsPageSlice.actions;

const AgentsPageReducer = agentsPageSlice.reducer;
export default AgentsPageReducer;
