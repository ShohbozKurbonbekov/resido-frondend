import type { AppRootState } from "@/lib/type/screen";
import { createSelector } from "@reduxjs/toolkit";

const selectContactUsPage = (state: AppRootState) => state.contactUsPage;

export const retrieveContactUsPage = createSelector(
  selectContactUsPage,
  (selectContactUsPage) => selectContactUsPage
);
