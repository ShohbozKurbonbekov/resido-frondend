import type { AdminDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminDashboardPage = {
  adminTariffPlans: { metaCounter: [{ total: 0 }], paymentTariffs: [] },
  adminMessages: { messages: [], metaCounter: [{ total: 0 }] },
};

const adminDashboardPageSlice = createSlice({
  name: "adminDashboardPage",
  initialState,
  reducers: {
    setAdminTariffPlans: (state, action) => {
      state.adminTariffPlans = action.payload;
    },

    setAdminMessages: (state, action) => {
      state.adminMessages = action.payload;
    },
  },
});

export const { setAdminTariffPlans, setAdminMessages } =
  adminDashboardPageSlice.actions;

const AdminDashoardPageReducer = adminDashboardPageSlice.reducer;
export default AdminDashoardPageReducer;
