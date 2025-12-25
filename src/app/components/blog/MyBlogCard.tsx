import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import React from "react";
import type { Blog } from "@/lib/type/blogs";
import { defaultBlogImage, serverAPI } from "@/lib/config";
import { dateConverter } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ----------------------------------- COMPONENT -----------------------
interface MyBlogCardType {
  blog: Blog;
}
const MyBlogCard: React.FC<MyBlogCardType> = React.memo(({ blog }) => {
  const imgUrl = blog.blogImage
    ? `${serverAPI}/${blog.blogImage}`
    : defaultBlogImage;

  // ----------------------------------- HANDLERS -----------------------

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
          <span>{dateConverter(blog.createdAt, "Do MMMM YYYY")}</span>
        </div>
        <p className="text-sm  text-muted-foreground font-light">
          {blog.blogShortInfo}
        </p>
      </CardContent>

      <CardFooter className="mt-2 flex items-center justify-between">
        <Button variant={"secondary"} className="" onClick={() => {}}>
          edit
        </Button>
        <Button className="" onClick={() => {}}>
          delete
        </Button>
      </CardFooter>
    </Card>
  );
});

export default MyBlogCard;
