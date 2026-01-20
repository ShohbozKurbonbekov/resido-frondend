import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useCallback } from "react";
import type { SavedBlog } from "@/lib/type/blogs";
import { defaultBlogImage, serverAPI } from "@/lib/config";
import { dateConverter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { SetStateType } from "@/lib/type/common";
import BlogService from "@/app/services/Blog.service";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";

// ----------------------------------- COMPONENT -----------------------
interface SavedBlogCardType {
  blog: SavedBlog;
  setMainPageLoading: SetStateType<boolean>;
}
const SavedBlogCard: React.FC<SavedBlogCardType> = React.memo(
  ({ blog, setMainPageLoading }) => {
    const imgUrl = blog.blogImage
      ? `${serverAPI}/${blog.blogImage}`
      : defaultBlogImage;

    // ----------------------------------- HANDLERS -----------------------
    const handleUnSave = useCallback(async () => {
      const target = new BlogService();
      try {
        await target.saveToggleBlog(blog._id);
        setMainPageLoading((prev) => !prev);
        await sweetTopSmallSuccessAlert("Successfully unsaved", 1400);
      } catch (error) {
        console.log("Error in Toggle save blog: ", error);
        await sweetErrorHandling(error!);
      }
    }, [blog, setMainPageLoading]);

    // ----------------------------------- RENDER -----------------------
    return (
      <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white  max-w-md mx-auto">
        <CardHeader className="p-0">
          <div className="h-52 w-full overflow-hidden">
            <img
              src={imgUrl}
              alt={blog.blogTitle}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-2">
          <h2 className="text-lg font-semibold leading-tight font-jostFont capitalize">
            {blog.blogTitle}
          </h2>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-jostFont capitalize">
            <Calendar size={15} />
            <span>{dateConverter(blog.createdAt)}</span>
          </div>
          <p className="text-sm  text-muted-foreground font-light">
            {blog.blogShortInfo}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <Link
              to={`/blogs/${blog._id}`}
              className="text-sm font-medium text-blue-600 hover:underline font-jostFont flex flex-row items-center  group"
            >
              Read more ...
            </Link>

            <Button
              className="hover:text-white bg-transparent border-0 shadow-none text-blue-500  hover:bg-red-500 transition-all duration-200 ease-linear active:scale-95"
              onClick={handleUnSave}
            >
              Unsave
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
);

export default SavedBlogCard;
