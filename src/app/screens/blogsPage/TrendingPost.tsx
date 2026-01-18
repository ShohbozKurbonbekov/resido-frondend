import type { Blog } from "@/lib/type/blogs";
import NoFound from "@/app/components/NoFound";
import { Link } from "react-router-dom";
import React from "react";
import { defaultBlogImage, serverAPI } from "@/lib/config";
import { dateConverter } from "@/lib/utils";

// ------------------------------------------------ COMPONENT -----------------------------------------------
interface TrendingPostType {
  blogs: Blog[];
}
const TrendingPost: React.FC<TrendingPostType> = React.memo(({ blogs }) => {
  // ------------------------------------------------ RENDER -----------------------------------------------

  return (
    <div className="bg-white border-2 border-slate-200 rounded-md py-9 px-7 flex flex-col gap-y-4">
      <h4 className="text-xl leading-tight text-darkBlue font-bold font-jostFont capitalize">
        Trending Posts
      </h4>
      {!blogs.length ? (
        <NoFound title="No Trending posts yet" />
      ) : (
        <ul className="flex flex-col items-stretch gap-y-4">
          {blogs.map((post) => {
            const imgUrl = post?.blogImage
              ? `${serverAPI}/${post?.blogImage}`
              : defaultBlogImage;
            return (
              <Link to={`/blogs/${post?._id}`} className="group">
                <li
                  className="flex flex-row gap-x-5 items-start group-hover:opacity-60 duration-200 transition-opacity ease-linear"
                  key={post._id}
                >
                  <img
                    src={imgUrl}
                    alt={post?.blogTitle || "blog image"}
                    className="max-w-36 object-cover rounded-sm "
                  />
                  <div className="flex-1  flex flex-col gap-y-2">
                    <div className="lg:text-sm text-lg font-bold leading-tight  capitalize text-darkBlue font-jostFont group-hover:text-blue-700  ">
                      {post?.blogShortInfo}
                    </div>
                    <p className="text-slate-400  text-sm leading-tight font-normal font-jostFont">
                      {dateConverter(post?.createdAt)}
                    </p>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default TrendingPost;
