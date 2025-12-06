import type { UserDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserDashboardPage = {
  savedProperties: { properties: [], totalPropertiesNumber: [{ total: 0 }] },
};

const userDashboardPageSlice = createSlice({
  name: "userDashboardPage",
  initialState,
  reducers: {
    setSavedProperties: (state, action) => {
      state.savedProperties = action.payload;
    },
  },
});

export const { setSavedProperties } = userDashboardPageSlice.actions;

const UserDashoardPageReducer = userDashboardPageSlice.reducer;
export default UserDashoardPageReducer;
