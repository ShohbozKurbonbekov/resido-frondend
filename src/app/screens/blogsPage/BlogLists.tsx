import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import TitleContentSection from "@/app/components/TitleContentSection";
import type { BlogType } from "@/lib/type/blogs";
import { useEffect, useMemo, useState } from "react";
import { blogs } from "./blogs-data";
import NoFound from "@/app/components/NoFound";
import BlogsCard from "./BlogsCard";
import { PaginationCom } from "@/app/components/PaginationCom";

export default function BlogLists() {
  const blogsData = blogs;

  const [blogInquery, setBlogInquery] = useState<{
    limit: number;
    page: number;
  }>({
    limit: 4,
    page: 1,
  });

  // Chunk array
  const chunkingArray = (arr: BlogType[], size: number): BlogType[][] => {
    const result: BlogType[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      // i => 0 => 4 => 8 => 12 => 16 => 20
      result.push(arr.slice(i, i + size)); // [[],[],[],[],[]]
    }
    return result;
  };

  const paginatedBlogs = useMemo(
    () => chunkingArray(blogsData, blogInquery.limit),
    [blogsData, blogInquery]
  );

  const sectionTitle = (
    <div className="container mb-12">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl leading-9 font-jostFont font-bold capitalize text-darkBlue ">
          Latest News
        </h2>
        <p className="text-size_15 leading-relaxed mb-[5px] text-slate-500 font-jostFont  font-light">
          we post regulary most powerful articles for help and support
        </p>
      </div>
    </div>
  );

  const sectionContent = (
    <div className="container">
      {blogsData.length === 0 ? (
        <NoFound title="no blog posts yet!" />
      ) : (
        <>
          <div className="cards-wrapper mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center px-4">
            {paginatedBlogs[blogInquery.page - 1].map(
              (blog: BlogType, index) => (
                <BlogsCard blogsData={blog} key={index} />
              )
            )}
          </div>
          <PaginationCom
            totalPages={paginatedBlogs.length}
            currentPage={blogInquery.page}
            onPageChange={setBlogInquery}
            styleclasses="w-full  flex flex-row items-center justify-center gap-1 mt-7"
          />
        </>
      )}
    </div>
  );

  useEffect(() => {
    // replace data with one in the database
    // setBlogsData(blogs);
  }, []);

  return (
    <>
      <SectionIntroNoBackground
        title="Our Articles"
        subtitle="see our latest articles & news"
      />
      <TitleContentSection
        sectionTitle={sectionTitle}
        sectionContent={sectionContent}
        sectionClass={"py-20 bg-sky-100"}
      />
    </>
  );
}
