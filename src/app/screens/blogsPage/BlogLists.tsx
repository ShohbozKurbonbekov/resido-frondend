import { useCallback, useEffect, useMemo, useState } from "react";
import type { Dispatch } from "@reduxjs/toolkit";
import { setBlogsListPage } from "./slice";
import { createSelector } from "reselect";
import { retrieveBlogsListPage } from "./selector";
import { useDispatch, useSelector } from "react-redux";

const activeBtn = "bg-blue-700 shadow-pagesActiveButtons";
const defaultBtn = "hover:bg-blue-700 py-5 font-jostFont capitalize";
const inputClasses = "text-slate-500 font-jostFont text-base ";

// ----------------------------------------- REDUX INTEGRATION ------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setBlogsListPage: (data: BlogsListPage) => dispatch(setBlogsListPage(data)),
});

const blogsListPageRetriever = createSelector(
  retrieveBlogsListPage,
  (blogsListPage) => ({ blogsListPage })
);

import { Button } from "@/components/ui/button";
import { BlogCategory, SortOrder } from "@/lib/enums/blog.enum";
import type { BlogSearchInput, BlogsListPage } from "@/lib/type/blogs";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import BlogService from "@/app/services/BlogService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { customLetterCustomise } from "@/lib/utils";
import NoFound from "@/app/components/NoFound";
import BlogCard from "./BlogsCard";
import { PaginationCom } from "@/app/components/PaginationCom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const resultsWrapper = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

export default function BlogLists() {
  const { setBlogsListPage } = actionDispatch(useDispatch());
  const { blogsListPage } = useSelector(blogsListPageRetriever);
  const [reloadMainPage, setReloadMainPage] = useState<boolean>(false);

  const [search, setSearch] = useState("");
  const [blogsSearchInput, setBlogsSearchInput] = useState<BlogSearchInput>({
    limit: 4,
    page: 1,
    sort: SortOrder.DESC,
    search: {
      category: BlogCategory.GENERAL,
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const blog = new BlogService();
      try {
        const result = await blog.getAllBlogs(blogsSearchInput);
        setBlogsListPage(result);
      } catch (error) {
        console.log("Error in fetching getting all blogs: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [blogsSearchInput, reloadMainPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(
      (blogsListPage?.totalBlogsNumber[0].total ?? 0) / blogsSearchInput.limit
    );
  }, [blogsListPage, blogsSearchInput]);
  // ---------------------------------------- HANLDERS ----------------------------
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);
  }, []);

  const handleCategory = useCallback((category: string) => {
    setBlogsSearchInput((prev) => ({
      ...prev,
      search: {
        category: category,
      },
    }));
  }, []);

  const handleSort = useCallback((sort: SortOrder) => {
    setBlogsSearchInput((prev) => ({
      ...prev,
      sort: sort,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setBlogsSearchInput((prev) => ({
        ...prev,
        search: {
          ...prev.search,
          title: search.trim(),
        },
      }));
    },
    [setBlogsSearchInput, search]
  );

  // ---------------------------------------- RENDER ----------------------------
  return (
    <>
      <SectionIntroNoBackground
        title={"Our Articles"}
        subtitle={"See Our Latest Articles & News ..."}
      />
      <section className="py-20 bg-sky-100">
        <div className="container  flex flex-col gap-8 mx-auto">
          {/* TOP SECTION */}
          <div className="w-full flex flex-col gap-2 text-center  p-7 rounded-md border">
            <h2 className="text-3xl font-bold text-darkBlue font-jostFont capitalize">
              Explore Our Blogs
            </h2>
            <p className="text-lg text-slate-500 font-semibold font-jostFont">
              Read the latest news, humor, tech insights, and more from our
              writers.
            </p>
          </div>

          {/* SEARCH INPUT */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 lg:flex-row lg:items-center bg-white p-7 lg:p-10 rounded-md"
          >
            {/* SEARCH INPUT */}
            <input
              placeholder="Search by title name..."
              value={search}
              onChange={handleSearch}
              className={`flex-1 border-blue-400 border rounded-md py-2 px-5   focus:ring-0 outline-none  ${inputClasses}`}
              autoFocus
            />

            {/* Select input */}
            <div className="wrapper flex flex-col sm:flex-row  sm:justify-between gap-5 ">
              <Select
                value={blogsSearchInput?.sort}
                onValueChange={(value: SortOrder) => handleSort(value)}
              >
                <SelectTrigger
                  className={`focus:ring-blue-400 py-5 ${inputClasses} focus:outline-none focus:ring-0 border-blue-400 min-w-44`}
                >
                  <SelectValue placeholder={blogsSearchInput?.sort} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SortOrder.DESC} className={inputClasses}>
                    New
                  </SelectItem>
                  <SelectItem value={SortOrder.ASC} className={inputClasses}>
                    Old
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Search button */}
              <Button
                type="submit"
                className="bg-blue-400 py-5 hover:bg-blue-700 transition-all ease-linear duration-200 active:scale-95 px-10"
              >
                Search
              </Button>
            </div>
          </form>

          {/* MAIN CONTENT */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT SIDE: Categories */}
            <div className="lg:w-1/4 flex flex-col gap-4">
              {/* Categories */}

              <div className="flex flex-col gap-3 bg-white p-7 rounded-md border">
                <h3 className="font-semibold text-xl lg:text-lg text-darkBlue font-jostFont">
                  Categories
                </h3>
                {Object.keys(BlogCategory).map((cat) => (
                  <Button
                    type="button"
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={`${cat === blogsSearchInput?.search?.category ? activeBtn : "bg-slate-400"} ${defaultBtn}`}
                  >
                    {customLetterCustomise(cat)}
                  </Button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Results */}
            <div className="lg:w-3/4 flex flex-col gap-6">
              {loading ? (
                <SpinnerGrids count={3} columns={resultsWrapper} />
              ) : blogsListPage.blogs.length ? (
                <>
                  <div className={resultsWrapper}>
                    {blogsListPage.blogs.map((blog) => (
                      <BlogCard
                        blog={blog}
                        key={blog._id}
                        setReloadMainPage={setReloadMainPage}
                      />
                    ))}
                  </div>
                  <PaginationCom
                    totalPages={totalPages}
                    currentPage={blogsSearchInput.page}
                    onPageChange={setBlogsSearchInput}
                    styleclasses="flex flex-row items-center gap-3 justify-center"
                  />
                </>
              ) : (
                <NoFound />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
