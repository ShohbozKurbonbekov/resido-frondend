import type { BlogsPageState } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BlogsPageState = {
  blogsListPage: { blogs: [], totalBlogsNumber: [{ total: 0 }] },
  chosenBlogComments: { comments: [], metaCounter: [{ total: 0 }] },
  chosenBlogPage: { mainBlog: null, trendingBlogs: [] },
};

const blogsPageSlice = createSlice({
  name: "blogsPage",
  initialState,
  reducers: {
    setBlogsListPage: (state, action) => {
      state.blogsListPage = action.payload;
    },
    setChosenBlogPage: (state, action) => {
      state.chosenBlogPage = action.payload;
    },
    setChosenBlogComments: (state, action) => {
      state.chosenBlogComments = action.payload;
    },
  },
});

export const { setBlogsListPage, setChosenBlogPage, setChosenBlogComments } =
  blogsPageSlice.actions;

const BlogsPageReducer = blogsPageSlice.reducer;
export default BlogsPageReducer;
