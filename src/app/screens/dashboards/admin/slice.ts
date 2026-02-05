import type { AdminDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminDashboardPage = {
  adminTariffPlans: { metaCounter: [{ total: 0 }], paymentTariffs: [] },
};

const adminDashboardPageSlice = createSlice({
  name: "adminDashboardPage",
  initialState,
  reducers: {
    setAdminTariffPlans: (state, action) => {
      state.adminTariffPlans = action.payload;
    },
  },
});

export const { setAdminTariffPlans } = adminDashboardPageSlice.actions;

const AdminDashoardPageReducer = adminDashboardPageSlice.reducer;
export default AdminDashoardPageReducer;
