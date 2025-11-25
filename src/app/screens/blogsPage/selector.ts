import { createSelector } from "reselect";
import { type AppRootState } from "@/lib/type/screen";

const selectBlogsPage = (state: AppRootState) => state.blogsPage;

export const retrieveBlogsListPage = createSelector(
  selectBlogsPage,
  (selectBlogsPage) => selectBlogsPage.blogsListPage
);
