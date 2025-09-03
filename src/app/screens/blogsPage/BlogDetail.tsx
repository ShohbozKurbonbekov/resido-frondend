import type { BlogType } from "@/lib/type/blogs";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { blogs } from "./blogs-data";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import BlogDetailDescription from "./BlogDetailDescription";
import BlogComments from "./BlogComments";

export default function BlogDetail() {
  const { blogId } = useParams<{ blogId: string }>();

  const findBlog = (arr: BlogType[]): BlogType | undefined => {
    return arr.find((el: BlogType) => el.id === Number(blogId));
  };

  const blogFinder = useMemo(() => findBlog(blogs), [blogId]);

  if (!blogId) return null;

  return (
    <>
      <SectionIntroNoBackground
        title="Blog detail"
        subtitle="See our latest articles and news"
      />
      <section className="py-20 bg-sky-100">
        <div className="container mb-4 grid grid-cols-1 gap-y-[30px] lg:grid-cols-12  lg:gap-x-6">
          <div className="lg:col-span-8 flex flex-col gap-y-[30px]">
            <BlogDetailDescription blog={blogFinder} />
            <BlogComments comments={blogFinder?.comments ?? []} />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-y-10 bg-blue-400">
            right part
          </div>
        </div>
      </section>
    </>
  );
}
