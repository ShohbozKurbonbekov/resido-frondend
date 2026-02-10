import type { AdminDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminDashboardPage = {
  adminTariffPlans: { metaCounter: [{ total: 0 }], paymentTariffs: [] },
  adminMessages: { messages: [], metaCounter: [{ total: 0 }] },
  adminGetComments: { comments: [], metaCounter: [{ total: 0 }] },
  adminAllBlogs: { blogs: [], totalBlogsNumber: [{ total: 0 }] },
  adminGetAllMembers: { members: [], metaCounter: [{ total: 0 }] },
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

    setAdminGetComments: (state, action) => {
      state.adminGetComments = action.payload;
    },

    setAdminAllBlogs: (state, action) => {
      state.adminAllBlogs = action.payload;
    },
    setAdminGetAllMembers: (state, action) => {
      state.adminGetAllMembers = action.payload;
    },
  },
});

export const {
  setAdminTariffPlans,
  setAdminMessages,
  setAdminGetComments,
  setAdminAllBlogs,
  setAdminGetAllMembers,
} = adminDashboardPageSlice.actions;

const AdminDashoardPageReducer = adminDashboardPageSlice.reducer;
export default AdminDashoardPageReducer;
