import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import React from "react";
import type { Blog } from "@/lib/type/blogs";
import { defaultBlogImage, serverAPI } from "@/lib/config";
import { dateConverter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SetStateType } from "@/lib/type/common";
import { Link } from "react-router-dom";

// ----------------------------------- COMPONENT -----------------------
interface MyBlogCardType {
  blog: Blog;
  handleDeleteBlog: (id: string) => Promise<void>;
  setModelOpen: SetStateType<boolean>;
  setSelectedBlog: SetStateType<null | Blog>;
}
const MyBlogCard: React.FC<MyBlogCardType> = ({
  blog,
  handleDeleteBlog,
  setModelOpen,
  setSelectedBlog,
}) => {
  const isEdited =
    new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime();
  const imgUrl = blog.blogImage
    ? `${serverAPI}/${blog.blogImage}`
    : defaultBlogImage;

  // ----------------------------------- RENDER -----------------------
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white  max-w-md mx-auto flex flex-col">
      <CardHeader className="p-0">
        <div className="h-52 w-full overflow-hidden relative">
          <img
            src={imgUrl}
            alt={blog.blogTitle}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isEdited ? (
            <Badge
              variant={"outline"}
              className={
                "absolute top-2 right-2 h-5 px-2 text-size_10 bg-slate-100 inline-block text-gray-700 font-jostFont border italic"
              }
            >
              Edited
            </Badge>
          ) : null}
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
        <p className="text-sm  text-slate-400 font-light">
          {blog.blogShortInfo}
        </p>
        <div className="group flex gap-1 ">
          <Link
            className="underline text-blue-700 text-sm"
            to={`/blogs/${blog._id}`}
          >
            Visit my blog
          </Link>
          <span className="opacity-0 group-hover:opacity-100 text-blue-700 transition-all duration-200 ease-linear">
            ......
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-1  flex-col justify-end items-end">
        <div className="flex gap-x-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1 duration-200 transition-all ease-linear active:scale-105"
            onClick={() => {
              setModelOpen(true);
              setSelectedBlog(blog);
            }}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className={`gap-1 duration-200 transition-colors ease-linear   hover:bg-red-600 bg-red-400 text-white`}
            onClick={() => handleDeleteBlog(blog._id)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MyBlogCard;
