import type { AgencyDashboardPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AgencyDashboardPage = {
  agencyMyBlogs: {
    blogs: [],
    totalBlogsNumber: [{ total: 0 }],
  },
  getAgencyMessages: { messages: [], metaCounter: [{ total: 0 }] },
  agencySubscriptionInfo: {
    agencySubscription: null,
    tariffPlans: [],
  },
  myAllProperties: {
    properties: [],
    totalPropertiesNumber: [{ total: 0 }],
  },
  agencyNotifications: { notifications: [], metaCounter: [{ total: 0 }] },
  myAllAgents: {
    agents: [],
    totalNumbers: [{ total: 0 }],
  },
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
    setAgencySubscriptionInfo: (state, action) => {
      state.agencySubscriptionInfo = action.payload;
    },

    setAgencyNotifications: (state, action) => {
      state.agencyNotifications = action.payload;
    },
    setAgencyMyProperties: (state, action) => {
      state.myAllProperties = action.payload;
    },

    setAgencyMyAgents: (state, action) => {
      state.myAllAgents = action.payload;
    },
  },
});

export const {
  setAgencyMyBlogs,
  setGetAgencyMessages,
  setAgencySubscriptionInfo,
  setAgencyNotifications,
  setAgencyMyProperties,
  setAgencyMyAgents,
} = agencyDashboardPageSlice.actions;

const AgencyDashoardPageReducer = agencyDashboardPageSlice.reducer;
export default AgencyDashoardPageReducer;
