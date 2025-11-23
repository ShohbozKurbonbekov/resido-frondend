import type { AgenciesPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgenciesPageState = {
  agenciesListPage: { agencies: [], totalNumbers: [{ total: 0 }] },
  chosenAgencyTargetItems: null,
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
    setChosenAgencyTargetItems: (state, action) => {
      state.chosenAgencyTargetItems = action.payload;
    },
  },
});

export const {
  setAgenciesListPage,
  setChosenAgencyTargetItems,
  setChosenAgencyPage,
} = agenciesPageSlice.actions;

const AgenciesPageReducer = agenciesPageSlice.reducer;
export default AgenciesPageReducer;
