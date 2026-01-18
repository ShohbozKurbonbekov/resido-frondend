import type { AgencyDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgencyDashboardPage = {
  agencyMyBlogs: {
    blogs: [],
    totalBlogsNumber: [{ total: 0 }],
  },
  getAgencyMessages: { messages: [], metaCounter: [{ total: 0 }] },
};

const agencyDashboardPageSlice = createSlice({
  name: "agencyDashboardPage",
  initialState,
  reducers: {
    setAgencyMyBlogs: (state, action) => {
      state.agencyMyBlogs = action.payload;
    },
    setGetAgencyMessages: (state, action) => {
      state.getAgencyMessages = action.payload;
    },
  },
});

export const { setAgencyMyBlogs, setGetAgencyMessages } =
  agencyDashboardPageSlice.actions;

const AgencyDashoardPageReducer = agencyDashboardPageSlice.reducer;
export default AgencyDashoardPageReducer;
