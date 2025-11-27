import Divider from "@/app/components/Divider";
import { blogShareNetworks } from "@/app/data/blog";
import BlogService from "@/app/services/BlogService";
import { customTruncate, defaultBlogImage, serverAPI } from "@/lib/config";
import { BlogAuthorType } from "@/lib/enums/blog.enum";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { Blog } from "@/lib/type/blogs";
import type { SetStateType } from "@/lib/type/common";
import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
interface BlogDetailDescriptionType {
  blog: Blog;
  totalComments: number;
  setReloadMainPage: SetStateType<boolean>;
}

const BlogDetailDescription: React.FC<BlogDetailDescriptionType> = React.memo(
  ({ blog, totalComments, setReloadMainPage }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [hoverEl, setHoverEl] = useState("");
    const {
      blogAuthorId,
      blogAuthorType,
      blogContent,
      blogImage,
      blogTags,
      blogTitle,
      blogQuote,
      blogAuthor,
      blogShortInfo,
      meLiked,
      _id,
    } = blog;
    const likedByMe = meLiked;

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

    const isTagsPresent = useMemo(() => {
      return Array.isArray(blogTags) && blogTags.length;
    }, [blogTags]);

    // ---------------------------------------- HANDLERS --------------------------------
    const safeValue = useCallback((str: string | undefined) => {
      return str ? str : "N/A";
    }, []);

    const imgUrl = blogImage ? `${serverAPI}/${blogImage}` : defaultBlogImage;

    // ----------------------------------------------------- HANDLERS --------------------------------------------------
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
                likedByMe
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
        <p className="text-slate-400 font-jostFont mt-6 text-base leading-onePointEight">
          {customTruncate(blogShortInfo, 150)}
        </p>

        {/*QUOTE*/}
        <blockquote className="my-12 relative py-7 pe-7 ps-24 bg-sky-50 rounded-sm border-0  italic flex flex-col space-y-3">
          {blogQuote ? (
            <>
              <span className="text-lg font-jostFont  text-slate-500 font-semibold capitalize">
                Year of the quote - by ( {blogAuthor?.authorName ?? "Unknown"} )
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
          {safeValue(blogContent)}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-y-7 md:grid-cols-2">
          {/*TAGE*/}
          <div className="flex flex-col space-y-5">
            <h4 className="font-jostFont text-base font-bold leading-tight text-darkBlue capitalize">
              Related Tags
            </h4>
            <ul className="flex flex-row flex-wrap gap-2.5 list-none">
              {isTagsPresent ? (
                blogTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      navigation(`/tags/${tag}`);
                    }}
                    className="border border-slate-200 py-2 px-5 text-darkBlue decoration no-underline hover:bg-blue-700 hover:text-white duration-300 transition-all ease-linear font-jostFont"
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <p className="text-slate-400 font-sm font-jostFont capitalize">
                  no tags
                </p>
              )}
            </ul>
          </div>

          {/* NETWORK  */}
          <div className="flex flex-col space-y-5 md:items-end">
            <h4 className="font-jostFont text-base font-bold leading-tight text-darkBlue capitalize">
              Social share
            </h4>
            <ul className="flex flex-row justify-start md:justify-end  list-none">
              {blogShareNetworks.map(({ ShareIcon, name, Icon }) => (
                <ShareIcon
                  title="Check this out"
                  url={`${serverAPI}/${location?.pathname}`}
                  key={name}
                  onMouseEnter={() => setHoverEl(name)}
                  onMouseLeave={() => setHoverEl("")}
                >
                  <Icon
                    size={30}
                    round
                    iconFillColor={
                      hoverEl === name ? "red" : "rgba(169, 169, 169, 1)"
                    }
                    bgStyle={{ fill: "transparent" }}
                  />
                </ShareIcon>
              ))}
            </ul>
          </div>
        </div>

        <Divider
          height={"2px"}
          bgColor={"rgba(128, 128, 128, 0.2)"}
          width={"100%"}
          marginTop={"40px"}
        />

        {/* NEXT AND PREV BUTTONS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-row justify-start items-center">
            <button className="p-4 w-full text-center bg-slate-400 md:w-auto py-4 rounded-md text-white hover:bg-slate-600 duration-300 transition-all ease-linear active:scale-95 capitalize">
              Next post
            </button>
          </div>
          <div className="flex flex-row justify-start md:justify-end items-center m-0">
            <button className="p-4 w-full text-center bg-slate-400 md:w-auto py-4 rounded-md text-white hover:bg-slate-600 duration-300 transition-all ease-linear active:scale-95 capitalize">
              Prev post
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default BlogDetailDescription;
