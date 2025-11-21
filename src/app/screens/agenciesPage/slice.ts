import type { AgenciesPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgenciesPageState = {
  agenciesListPage: { agencies: [], totalNumbers: [{ total: 0 }] },
};

const agenciesPageSlice = createSlice({
  name: "agenciesPage",
  initialState,
  reducers: {
    setAgenciesListPage: (state, action) => {
      state.agenciesListPage = action.payload;
    },
  },
});

export const { setAgenciesListPage } = agenciesPageSlice.actions;

const AgenciesPageReducer = agenciesPageSlice.reducer;
export default AgenciesPageReducer;
