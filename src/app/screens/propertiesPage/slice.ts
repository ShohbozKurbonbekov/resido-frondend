import type { PropertiesPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PropertiesPageState = {
  properties: { properties: [], totalPropertiesNumber: [] },
  chosenProperty: { mainProperty: [], trendingProperties: [] },
  chosenPropComments: { comments: [], metaCounter: [{ total: 0 }] },
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
    setChosenPropComments: (state, action) => {
      state.chosenPropComments = action.payload;
    },
  },
});

export const { setChosenProperty, setProperties, setChosenPropComments } =
  propertiesPageSlice.actions;

const PropertiesPageReducer = propertiesPageSlice.reducer;
export default PropertiesPageReducer;
