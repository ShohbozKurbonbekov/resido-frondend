import type { BlogsPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BlogsPageState = {
  blogsListPage: { blogs: [], totalBlogsNumber: [{ total: 0 }] },
};

const blogsPageSlice = createSlice({
  name: "blogsPage",
  initialState,
  reducers: {
    setBlogsListPage: (state, action) => {
      state.blogsListPage = action.payload;
    },
  },
});

export const { setBlogsListPage } = blogsPageSlice.actions;

const BlogsPageReducer = blogsPageSlice.reducer;
export default BlogsPageReducer;
