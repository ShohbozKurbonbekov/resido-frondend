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
import BlogDetailDescription from "./BlogDetailDescription";
import { useEffect, useState } from "react";
import DetailPageLoading from "@/app/components/loading/DetailPageLoading";
import BlogService from "@/app/services/BlogService";
import CommentService from "@/app/services/CommentService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { ChosenItemCommentsInput } from "@/lib/type/comment";
import { CommentTargetType } from "@/lib/enums/comment.enum";

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
  const {
    chosenBlogPage: { mainBlog, trendingBlogs },
  } = useSelector(chosenBlogPageRetriever);
  const { chosenBlogComments } = useSelector(choseBlogCommentsRetriever);
  const { blogId } = useParams();
  const [chosenBlogCommentsInput, setCommentsInput] =
    useState<ChosenItemCommentsInput>({
      limit: 4,
      page: 1,
      commentTarget: CommentTargetType.BLOG,
    });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!blogId) return;

    const fetchData = async () => {
      const blog = new BlogService();
      const comment = new CommentService();
      try {
        // FETCHING CHOSEN BLOG DETAIL
        const result = await blog.getBlogDetail(blogId);
        setChosenBlogPage(result);

        const result2 = await comment.getItemComments(
          blogId,
          chosenBlogCommentsInput
        );
        setChosenBlogComments(result2);
      } catch (error) {
        console.log("Error in fetching chosenBlogPage data: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [blogId, chosenBlogCommentsInput]);
  // ---------------------------------------------- RENDER ---------------------------------------

  return loading || !mainBlog ? (
    <DetailPageLoading />
  ) : (
    <>
      <SectionIntroNoBackground
        title="Blog detail"
        subtitle="See our latest articles and news"
      />
      <section className="py-20 bg-sky-100">
        <div className="container mb-4 grid grid-cols-1 gap-7 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col gap-y-7">
            <BlogDetailDescription
              blog={mainBlog}
              totalComments={chosenBlogComments.comments.length}
            />
            {/* <PostAuther auther={blogFinder?.writer} />
            <BlogComments comments={blogFinder?.comments ?? []} /> */}
          </div>
          {/* <div className="lg:col-span-4 flex flex-col gap-y-10 ">
            <SearchBar />
            <Category />
            <TrendingPost />
          </div> */}
        </div>
      </section>
    </>
  );
}
