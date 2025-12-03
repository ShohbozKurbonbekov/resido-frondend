import { useParams } from "react-router-dom";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { createSelector, type Dispatch } from "@reduxjs/toolkit";
import type { ChosenBlogComments, ChosenBlogType } from "@/lib/type/blogs";
import { setChosenBlogComments, setChosenBlogPage } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenBlogComments, retrieveChosenBlogPage } from "./selector";
import BlogDetailDescription from "./BlogDetailDescription";
import { useEffect, useMemo, useState } from "react";
import DetailPageLoading from "@/app/components/loading/DetailPageLoading";
import BlogService from "@/app/services/BlogService";
import CommentService from "@/app/services/CommentService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { ChosenItemCommentsInput } from "@/lib/type/comment";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import BlogAuthorCom from "./BlogAuthorCom";
import ChosenItemComments from "@/app/components/ChosenItemComments";
import ChosenItemWriteComment from "@/app/components/ChosenItemWriteComment";
import TrendingPost from "./TrendingPost";
import SaveShareCom from "../propertiesPage/SaveShareCom";
import { serverAPI } from "@/lib/config";
import { UserSavingTargetGroup } from "@/lib/enums/user.enum";
import BlogTags from "./BlogTags";

const sectionClasses = "bg-white p-5 rounded-md border-2";
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
  const shareUrl = `${serverAPI}/blogs/${mainBlog?._id}`;
  const shareTitle = "visit us to see our special blog for you";

  const [chosenBlogCommentsInput, setCommentsInput] =
    useState<ChosenItemCommentsInput>({
      limit: 4,
      page: 1,
      commentTarget: CommentTargetType.BLOG,
    });
  const [reloadMainPage, setReloadMainPage] = useState<boolean>(false);
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
  }, [blogId, chosenBlogCommentsInput, reloadMainPage]);

  const totalComments = useMemo(() => {
    return chosenBlogComments?.metaCounter[0]?.total ?? 0;
  }, [chosenBlogComments]);
  // ---------------------------------------------- RENDER ---------------------------------------
  return loading || !mainBlog ? (
    <DetailPageLoading />
  ) : (
    <>
      <SectionIntroNoBackground
        title="Blog detail"
        subtitle="See our latest articles and news"
      />
      {mainBlog && (
        <section className="py-20 bg-sky-100">
          <div className="container mb-4 grid grid-cols-1 gap-y-10 gap-x-5 lg:grid-cols-12">
            <div className="lg:col-span-8 flex flex-col gap-y-7">
              <BlogDetailDescription
                blog={mainBlog}
                totalComments={totalComments}
                setReloadMainPage={setReloadMainPage}
                setLoading={setLoading}
              />

              {/* BLOG AUTHOR DESCRIPTION*/}
              <BlogAuthorCom author={mainBlog.blogAuthor} />

              {/* RELATED BLOGS TAGS*/}
              <BlogTags tags={mainBlog.blogTags} />

              {/* READING COMMENTS */}
              <div className={sectionClasses}>
                <ChosenItemComments
                  chosenItemComments={chosenBlogComments}
                  setPropertyComments={setCommentsInput}
                />
              </div>

              {/*WRITING COMMENTS*/}
              <div className={sectionClasses}>
                <ChosenItemWriteComment
                  id={blogId!}
                  targetType={CommentTargetType.BLOG}
                  setReloadMainPage={setReloadMainPage}
                />
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-y-5 ">
              <SaveShareCom
                setReloadMainPage={setReloadMainPage}
                savedItemId={mainBlog._id}
                shareUrl={shareUrl}
                shareTitle={shareTitle}
                isSaved={mainBlog.meSaved!}
                targetItem={UserSavingTargetGroup.BLOG}
              />
              <TrendingPost blogs={trendingBlogs} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
