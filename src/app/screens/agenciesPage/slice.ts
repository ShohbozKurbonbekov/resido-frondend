import type { AgenciesPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgenciesPageState = {
  agenciesListPage: { agencies: [], totalNumbers: [{ total: 0 }] },
  chosenAgencyProperties: { properties: [], metaCounter: [{ total: 0 }] },
  chosenAgencyAgents: { agents: [], metaCounter: [{ total: 0 }] },
  chosenAgencyPage: null,
};

const agenciesPageSlice = createSlice({
  name: "agenciesPage",
  initialState,
  reducers: {
    setAgenciesListPage: (state, action) => {
      state.agenciesListPage = action.payload;
    },
    setChosenAgencyPage: (state, action) => {
      state.chosenAgencyPage = action.payload;
    },
    setChosenAgencyProperties: (state, action) => {
      state.chosenAgencyProperties = action.payload;
    },
    setChosenAgencyAgents: (state, action) => {
      state.chosenAgencyAgents = action.payload;
    },
  },
});

export const {
  setAgenciesListPage,
  setChosenAgencyAgents,
  setChosenAgencyPage,
  setChosenAgencyProperties,
} = agenciesPageSlice.actions;

const AgenciesPageReducer = agenciesPageSlice.reducer;
export default AgenciesPageReducer;
