import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectAdminDashboardPage = (state: AppRootState) =>
  state.adminDashboardPage;

// RETREIVE ADMIN TARIFF PLANS
export const retrieveAdminTariffPlans = createSelector(
  selectAdminDashboardPage,
  (adminDashboardPage) => adminDashboardPage.adminTariffPlans,
);

// RETREIVE ADMIN MESSAGES
export const retrieveAdminMessages = createSelector(
  selectAdminDashboardPage,
  (adminDashboardPage) => adminDashboardPage.adminMessages,
);

// RETREIVE USER COMMENTS
export const retrieveAdminGetComments = createSelector(
  selectAdminDashboardPage,
  (adminDashboardPage) => adminDashboardPage.adminGetComments,
);

// RETREIVE ADMIN ALL BLOGS
export const retrieveAdminAllBlogs = createSelector(
  selectAdminDashboardPage,
  (adminDashboardPage) => adminDashboardPage.adminAllBlogs,
);

// RETREIVE ADMIN MEMBERS
export const retrieveAdminGetAllMembers = createSelector(
  selectAdminDashboardPage,
  (adminDashboardPage) => adminDashboardPage.adminGetAllMembers,
);
