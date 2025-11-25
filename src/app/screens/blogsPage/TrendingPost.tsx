import { useMemo } from "react";
import type { BlogType } from "@/lib/type/blogs";
import NoFound from "@/app/components/NoFound";
import { Link } from "react-router-dom";
import moment from "moment";
import { chunkingArray } from "@/lib/utils";
import type { T } from "@/lib/type/common";

const blogs: T = [];
const sortBlogs = (): BlogType[] => {
  return [
    ...blogs
      .map((blog) => ({
        ...blog,
        date: new Date(blog.date).getTime(),
      }))
      .sort((a, b) => b.date - a.date),
  ];
};

export default function TrendingPost() {
  const trendingPosts = useMemo(() => {
    const sortedBlogs = sortBlogs();
    return sortedBlogs;
  }, [blogs]);

  const chunkingFivePosts = useMemo(
    () => chunkingArray(trendingPosts, 4),
    [trendingPosts]
  );
  return (
    <div className="bg-white border-2 border-slate-200 rounded-md py-9 px-7 flex flex-col gap-y-4">
      <h4 className="text-xl leading-tight text-darkBlue font-bold font-jostFont capitalize">
        Trending Posts
      </h4>
      {trendingPosts.length === 0 ? (
        <NoFound title="No Trending posts yet" />
      ) : (
        <ul className="flex flex-col items-stretch gap-y-4">
          {chunkingFivePosts[0].map((post, index) => (
            <li className="flex flex-row gap-x-5 items-start" key={index}>
              <img
                src={post.image}
                alt={post.title}
                className="h-14 w-20 rounded-sm "
              />
              <div className="flex-1  flex flex-col gap-y-2">
                <Link
                  to=""
                  className="text-lg font-bold leading-tight  capitalize text-darkBlue font-jostFont hover:text-blue-700 "
                >
                  {post.title.length > 35
                    ? post.title.slice(0, 35) + " ......"
                    : post.title}
                </Link>
                <p className="text-slate-400  text-sm leading-tight font-normal font-jostFont">
                  {moment(post.date).format("Do MMMM YYYY")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
