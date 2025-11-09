import type { PropertiesPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PropertiesPageState = {
  properties: { properties: [], totalPropertiesNumber: [] },
  chosenProperty: { mainProperty: [], trendingProperties: [] },
};

const propertiesPageSlice = createSlice({
  name: "propertiesPage",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setChosenProperty: (state, action) => {
      state.chosenProperty = action.payload;
    },
  },
});

export const { setChosenProperty, setProperties } = propertiesPageSlice.actions;

const PropertiesPageReducer = propertiesPageSlice.reducer;
export default PropertiesPageReducer;
