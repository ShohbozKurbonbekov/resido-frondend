import Divider from "@/app/components/Divider";
import BlogService from "@/app/services/BlogService";
import { customTruncate, defaultBlogImage, serverAPI } from "@/lib/config";
import { BlogAuthorType, BlogNeighborings } from "@/lib/enums/blog.enum";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { Blog } from "@/lib/type/blogs";
import type { SetStateType } from "@/lib/type/common";
import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const commonBtnClasses =
  "p-4 w-full text-center  md:w-auto py-4 rounded-md text-white capitalize";
const disabledBtnClasses = "cursor-not-allowed bg-slate-300";
const activeBtnClasses =
  "bg-slate-500 hover:bg-slate-700 duration-300 transition-all ease-linear active:scale-95";
// ------------------------------------------------------- COMPONENT -------------------------------------------
interface BlogDetailDescriptionType {
  blog: Blog;
  totalComments: number;
  setReloadMainPage: SetStateType<boolean>;
  setLoading: SetStateType<boolean>;
}
const BlogDetailDescription: React.FC<BlogDetailDescriptionType> = React.memo(
  ({ blog, totalComments, setReloadMainPage, setLoading }) => {
    const navigation = useNavigate();
    const {
      blogAuthorId,
      blogAuthorType,
      blogContent,
      blogImage,
      blogTitle,
      blogQuote,
      blogAuthor,
      blogShortInfo,
      meLiked,
      prevBlog,
      nextBlog,
      _id,
    } = blog;

    const blogAuthoUrl: string = useMemo(() => {
      let url: string;
      if (blogAuthorType === BlogAuthorType.AGENCY) {
        url = `/agencies/${blogAuthorId}`;
      } else if (blogAuthorType === BlogAuthorType.AGENT) {
        url = `/agents/${blogAuthorId}`;
      } else {
        url = `/admin/detail`;
      }
      return url;
    }, [blogAuthorId, blogAuthorType]);

    const safeValue = useCallback((str: string | undefined) => {
      return str ? str : "N/A";
    }, []);

    const imgUrl = blogImage ? `${serverAPI}/${blogImage}` : defaultBlogImage;

    // ------------------------------------------------------- HANDLERS -------------------------------------------
    const handlePrevNextBlog = useCallback(
      (str: BlogNeighborings) => {
        const navigationUrl =
          str === BlogNeighborings.PREV
            ? `/blogs/${prevBlog?._id}`
            : `/blogs/${nextBlog?._id}`;
        navigation(navigationUrl);
        setLoading(true);
      },

      [prevBlog, nextBlog, navigation]
    );

    const handleLike = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        try {
          const blog = new BlogService();
          await blog.likeTargetBlog(id);
          setReloadMainPage((prev) => !prev);
        } catch (error) {
          console.log("Error in liking the blog: ", error);
          await sweetErrorHandling(error!);
        }
      },
      [setReloadMainPage]
    );
    return (
      <div className="p-5 bg-white border-2 border-slate-200 rounded-md w-full flex  flex-col">
        {/*IMAGE*/}
        <div className="h-auto w-auto mb-6 relative">
          <img
            src={imgUrl}
            alt={blogTitle ?? "blog image"}
            className="w-full object-cover rounded-md"
          />
          <motion.button
            whileTap={{ scale: 1.5 }}
            onClick={(e) => handleLike(e, _id)}
            className="ms-auto  p-1 rounded-full bg-black/35 flex flex-row items-center justify-center absolute top-5 right-5"
          >
            <Heart
              className={`w-7 h-7 lg:h-10 lg:w-10 ${
                meLiked
                  ? "fill-red-500 text-red-500 "
                  : "fill-white stroke-white "
              }`}
            />
          </motion.button>
        </div>

        {/*AUTHOR NAME AND COMMENTS COUNT*/}
        <div className="flex flex-row space-x-5 items-center ps-2">
          <Link
            to={`${blogAuthoUrl}`}
            className="text-blue-600 font-normal font-jostFont text-size_15 leading-tight capitalize underline"
          >
            By {blogAuthor?.authorName ?? "Unknown"}
          </Link>
          <p className="text-slate-600 font-normal font-jostFont text-size_15 leading-tight capitalize">
            {totalComments ?? 0} Comments
          </p>
        </div>

        {/*BLOG TITLE*/}
        <h3 className="font-bold leading-normal mt-1 text-3xl  text-darkBlue font-jostFont capitalize">
          {safeValue(blogTitle)}
        </h3>

        {/*BLOG SHORT*/}
        <p className="text-slate-400 font-jostFont mt-3 text-base leading-onePointEight">
          <span className="underline capitalize">Short description</span>
          {": "}
          {customTruncate(blogShortInfo, 150)}
        </p>

        {/*QUOTE*/}
        <blockquote className="my-5 relative py-7 pe-7 ps-24 bg-sky-50 rounded-sm border-0  italic flex flex-col space-y-3">
          {blogQuote ? (
            <>
              <span className="text-lg font-jostFont  text-slate-500 font-semibold capitalize">
                the quote of the year - ( {blogAuthor?.authorName ?? "Unknown"}{" "}
                )
              </span>
              <p className="text-slate-400 text-base  leading-onePointEight">
                "{safeValue(blogQuote)}"
              </p>
            </>
          ) : (
            <p className="text-slate-500 text-lg italics">
              There is no quote by author
            </p>
          )}

          <span className="absolute  top-1/2 -translate-y-full leading-none left-12 ">
            <Quote className="fill-blue-700 border-0 rotate-180 text-blue-700" />
          </span>
        </blockquote>

        {/*DESCRIPTION*/}
        <p className="text-slate-400 font-jostFont text-base leading-onePointEight">
          <span className="underline capitalize">Blog Content</span>
          {": "}
          {safeValue(blogContent)}
        </p>

        <Divider
          height={"2px"}
          bgColor={"rgba(128, 128, 128, 0.2)"}
          width={"100%"}
          marginTop={"40px"}
        />

        {/* NEXT AND PREV BUTTONS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-row justify-start items-center">
            <button
              className={`${commonBtnClasses} ${prevBlog ? activeBtnClasses : disabledBtnClasses}`}
              onClick={() => handlePrevNextBlog(BlogNeighborings.PREV)}
              disabled={Boolean(!prevBlog)}
            >
              Prev post
            </button>
          </div>
          <div className="flex flex-row justify-start md:justify-end items-center m-0">
            <button
              className={`${commonBtnClasses} ${nextBlog ? activeBtnClasses : disabledBtnClasses}`}
              onClick={() => handlePrevNextBlog(BlogNeighborings.NEXT)}
              disabled={Boolean(!nextBlog)}
            >
              Next post
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default BlogDetailDescription;
