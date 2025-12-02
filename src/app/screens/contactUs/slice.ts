import type { ContactUsPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ContactUsPageState = {
  adminData: null,
};

const contactUsPageSlice = createSlice({
  name: "contactUsPage",
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
  },
});

export const { setAdminData } = contactUsPageSlice.actions;

const ContactUsPageReducer = contactUsPageSlice.reducer;
export default ContactUsPageReducer;
