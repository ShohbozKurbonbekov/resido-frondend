import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import NoFound from "@/app/components/NoFound";
import BlogService from "@/app/services/Blog.service";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { customTruncate, defaultBlogImage, serverAPI } from "@/lib/config";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { Blog } from "@/lib/type/blogs";
import { ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const btnClasses =
  "text-white py-2 px-3 transition-colors duration-200 ease-linear text-sm capitalize rounded-sm";

const tagContainerClasses =
  "grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mt-4 gap-4";
const containerWrapper =
  "p-5 rounded-md bg-white border-2 flex flex-col gap-2 items-start";
// ------------------------------------ COMPONENT ----------------------

interface BlogTagsType {
  tags: string[];
}

const BlogTags: React.FC<BlogTagsType> = React.memo(({ tags }) => {
  const normalizedBlogTag = useMemo(() => {
    return tags.map((tag) => tag.trim().toLowerCase());
  }, [tags]);

  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigate();
  const [activeTag, setActiveTag] = useState<string>(normalizedBlogTag[0]);
  const [relatedTags, setRelatedTags] = useState<Blog[]>([]);

  // ----------------------------------- HANDLERS ----------------------
  const handleMore = useCallback(() => {
    navigation("/blogs");
  }, [navigation]);

  const handleActiveTag = useCallback((tag: string) => {
    setActiveTag(tag);
  }, []);

  useEffect(() => {
    if (!activeTag) return;
    setLoading(true);
    const fetchTags = async () => {
      const blog = new BlogService();
      try {
        const result = await blog.blogSearchTag(activeTag);
        setRelatedTags(result.blogs);
      } catch (error) {
        console.log("Error in fetching tags: ", error);
        await sweetErrorHandling(error!);
        // setActiveTag(normalizedBlogTag[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, [activeTag]);

  // ---------------------------------- RENDER ----------------------
  return (
    <div className={containerWrapper}>
      <h4 className="text-lg font-jostFont text-slate-600 font-semibold">
        Related blog tags for you
      </h4>

      {normalizedBlogTag.length ? (
        <div className="w-full">
          <ul className="flex flex-row flex-wrap gap-4">
            {normalizedBlogTag.map((tag) => (
              <button
                className={`${btnClasses} ${activeTag === tag ? "bg-blue-700" : "bg-blue-400"}`}
                onClick={() => handleActiveTag(tag)}
                key={tag}
              >
                #{tag}
              </button>
            ))}
          </ul>

          {loading ? (
            <SpinnerGrids count={3} columns={tagContainerClasses} />
          ) : relatedTags.length ? (
            <>
              <div className={tagContainerClasses}>
                {relatedTags.map((tag) => {
                  const { blogShortInfo, blogContent } = tag;
                  const imgUrl = tag.blogImage
                    ? `${serverAPI}/${tag.blogImage}`
                    : defaultBlogImage;
                  return (
                    <Card
                      className="hover:shadow-[0_0_3px_2px_rgba(0,0,0,0.3)] transition-shadow duration-200 ease-linear shadow-none  max-w-sm mx-auto group flex flex-col"
                      key={tag._id}
                    >
                      <CardHeader>
                        <img
                          src={imgUrl}
                          alt={blogShortInfo}
                          className="object-cover aspect-blogCardRatio rounded-sm group-hover:opacity-70 transition-opacity duration-200 ease-linear"
                        />
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold font-jostFont text-lg text-blue-900">
                          {blogShortInfo}.
                        </h4>
                        <p className="font-jostFont text-slate-500 font-light text-base">
                          {customTruncate(blogContent, 50)}
                        </p>
                      </CardContent>
                      <CardFooter className="flex-1 flex flex-col items-start justify-end">
                        <Link
                          to={`/blogs/${tag._id}`}
                          className="text-blue-700 group-hover:underline font-jostFont font-semibold"
                        >
                          Read more...
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              <button
                className={`${btnClasses} flex flex-row items-center gap-1 group px-5 bg-blue-400 hover:bg-blue-700 mt-4 mx-auto`}
                onClick={handleMore}
              >
                more
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-all duration-200" />
              </button>
            </>
          ) : (
            <NoFound title="no related tag found" />
          )}
        </div>
      ) : (
        <div className={`w-full`}>
          <NoFound />
        </div>
      )}
    </div>
  );
});
export default BlogTags;
