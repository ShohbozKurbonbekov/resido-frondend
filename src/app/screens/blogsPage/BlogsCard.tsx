import BlogService from "@/app/services/BlogService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { customTruncate, defaultBlogImage, serverAPI } from "@/lib/config";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { Blog } from "@/lib/type/blogs";
import type { SetStateType } from "@/lib/type/common";
import { dateConverter } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, MoveRight } from "lucide-react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface BlogCardType {
  blog: Blog;
  setReloadMainPage: SetStateType<boolean>;
}

const BlogCard: React.FC<BlogCardType> = React.memo(
  ({ blog, setReloadMainPage }) => {
    const navigation = useNavigate();
    const { blogImage, blogTitle, blogShortInfo, _id, createdAt, meLiked } =
      blog;
    const likedByMe = meLiked;
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
      <Card className="max-w-lg mx-auto shadow-sm rounded-md border-0 flex flex-col">
        <CardHeader className="flex flex-row items-center p-2.5 relative">
          <img
            src={imgUrl}
            alt={blogTitle || "blog title"}
            className="w-full h-auto rounded-md object-cover  aspect-blogCardRatio"
          />
          <motion.button
            whileTap={{ scale: 1.5 }}
            onClick={(e) => handleLike(e, _id)}
            className="ms-auto  p-1 rounded-full bg-black/35 flex flex-row items-center justify-center absolute top-5 right-5"
          >
            <Heart
              className={`w-7 h-7 lg:h-5 lg:w-5 ${
                likedByMe
                  ? "fill-red-500 text-red-500 "
                  : "fill-white stroke-white "
              }`}
            />
          </motion.button>
        </CardHeader>
        <CardContent className="p-0 flex flex-col  h-full">
          <div className="info py-2.5 px-5">
            <span className="inline-block py-1 px-4 text-white bg-green-800 text-xs rounded-md">
              {dateConverter(createdAt, "Do MMM YYYY")}
            </span>
          </div>

          <div className="p-[5px_20px_30px] flex-1 flex flex-col items-start justify-between">
            <div>
              <h4 className="text-lg text-darkBlue font-semibold  font-jostFont capitalize mb-1 leading-onePointEight">
                {customTruncate(blogTitle, 50)}
              </h4>
              <p className="mb-2.5 leading-onePointEight text-slate-400 text-start ">
                {customTruncate(blogShortInfo, 100)}
              </p>
            </div>
            <button
              className="flex flex-row items-center gap-1 text-blue-600 py-3 pe-6 rounded-md text-size_15 font-jostFont capitalize hover:bg-blue-800 hover:text-white duration-300 transition-all active:shadow-[0_0_0_4px_rgba(0,0,255,0.3)] font-semibold hover:ps-6 shadow-none"
              onClick={() => {
                navigation(`/blogs/${_id}`);
              }}
            >
              Continue
              <MoveRight className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default BlogCard;
