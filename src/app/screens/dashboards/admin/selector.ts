import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAdminDashboardPage = (state: AppRootState) =>
  state.adminDashboardPage;

// RETREIVE ADMIN TARIFF PLANS
export const retrieveAdminTariffPlans = createSelector(
  selectAdminDashboardPage,
  (adminDashboardPage) => adminDashboardPage.adminTariffPlans,
);
