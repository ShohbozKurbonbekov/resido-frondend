import type { AgencyDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgencyDashboardPage = {
  agencyMyBlogs: {
    blogs: [],
    totalBlogsNumber: [{ total: 0 }],
  },
};

const agencyDashboardPageSlice = createSlice({
  name: "agencyDashboardPage",
  initialState,
  reducers: {
    setAgencyMyBlogs: (state, action) => {
      state.agencyMyBlogs = action.payload;
    },
  },
});

export const { setAgencyMyBlogs } = agencyDashboardPageSlice.actions;

const AgencyDashoardPageReducer = agencyDashboardPageSlice.reducer;
export default AgencyDashoardPageReducer;
