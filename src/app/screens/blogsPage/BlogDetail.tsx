import { useParams } from "react-router-dom";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import SearchBar from "./SearchBar";
import Category from "./Category";
import TrendingPost from "./TrendingPost";
import { createSelector, type Dispatch } from "@reduxjs/toolkit";
import type { ChosenBlogComments, ChosenBlogType } from "@/lib/type/blogs";
import { setChosenBlogComments, setChosenBlogPage } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenBlogComments, retrieveChosenBlogPage } from "./selector";

// ---------------------------------------------- REDUX INTEGRATION ---------------------------------------
const chosenBlogPageDispatch = (dispatch: Dispatch) => ({
  setChosenBlogPage: (data: ChosenBlogType) =>
    dispatch(setChosenBlogPage(data)),
});

const chosenBlogCommentsDispatch = (dispatch: Dispatch) => ({
  setChosenBlogComments: (data: ChosenBlogComments) =>
    dispatch(setChosenBlogComments(data)),
});

const chosenBlogPageRetriever = createSelector(
  retrieveChosenBlogPage,
  (chosenBlogPage) => ({ chosenBlogPage })
);

const choseBlogCommentsRetriever = createSelector(
  retrieveChosenBlogComments,
  (chosenBlogComments) => ({ chosenBlogComments })
);

// ---------------------------------------------- COMPONENT ---------------------------------------
export default function BlogDetail() {
  const { setChosenBlogPage } = chosenBlogPageDispatch(useDispatch());
  const { setChosenBlogComments } = chosenBlogCommentsDispatch(useDispatch());
  const { mainBlog, trendingBlogs } = useSelector(retrieveChosenBlogPage);
  const { chosenBlogComments } = useSelector(choseBlogCommentsRetriever);
  const { blogId } = useParams();

  // ---------------------------------------------- RENDER ---------------------------------------
  return (
    <>
      <SectionIntroNoBackground
        title="Blog detail"
        subtitle="See our latest articles and news"
      />
      <section className="py-20 bg-sky-100">
        <div className="container mb-4 grid grid-cols-1 gap-y-[30px] lg:grid-cols-12  lg:gap-x-6">
          <div className="lg:col-span-8 flex flex-col gap-y-[30px]">
            {/* <BlogDetailDescription blog={blogFinder} />
            <PostAuther auther={blogFinder?.writer} />
            <BlogComments comments={blogFinder?.comments ?? []} /> */}
          </div>
          <div className="lg:col-span-4 flex flex-col gap-y-10 ">
            <SearchBar />
            <Category />
            <TrendingPost />
          </div>
        </div>
      </section>
    </>
  );
}
