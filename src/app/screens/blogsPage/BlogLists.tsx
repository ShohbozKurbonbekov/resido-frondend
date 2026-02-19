import { useCallback, useEffect, useMemo, useState } from "react";
import type { Dispatch } from "@reduxjs/toolkit";
import { setBlogsListPage } from "./slice";
import { createSelector } from "reselect";
import { retrieveBlogsListPage } from "./selector";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------- REDUX INTEGRATION ------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setBlogsListPage: (data: BlogsListPage) => dispatch(setBlogsListPage(data)),
});

const blogsListPageRetriever = createSelector(
  retrieveBlogsListPage,
  (blogsListPage) => ({ blogsListPage }),
);

import { Button } from "@/components/ui/button";
import { BlogCategory, SortOrder } from "@/lib/enums/blog.enum";
import type { BlogSearchInput, BlogsListPage } from "@/lib/type/blogs";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import BlogService from "@/app/services/Blog.service";
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
    sort: SortOrder.ASC,
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
      (blogsListPage?.totalBlogsNumber[0].total ?? 0) / blogsSearchInput.limit,
    );
  }, [blogsListPage, blogsSearchInput]);
  // ---------------------------------------- HANLDERS ----------------------------
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);
  }, []);

  const handleCategory = useCallback((category: BlogCategory) => {
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
    [setBlogsSearchInput, search],
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

          {/* SEARCH INPUT */}
          <form
            onSubmit={handleSubmit}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-6  sm:px-6 sm:py-8 flex flex-col gap-4 sm:flex-row sm:items-end
      "
          >
            {/* Search Input */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-basse font-medium text-gray-700 sm:text-lg font-jostFont">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={handleSearch}
                autoFocus
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-100 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2
            focus:ring-slate-200 focus:border-slate-400 transition
          "
              />
            </div>

            <div className="max-w-sm ml-auto sm:max-w-max w-full grid   grid-cols-2 items-start gap-4">
              {/* Sort Select */}

              <Select value={blogsSearchInput?.sort} onValueChange={handleSort}>
                <SelectTrigger
                  className="h-11 rounded-lg border border-slate-300 bg-slate-100 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 w-auto
          "
                >
                  <SelectValue placeholder="Newest" />
                </SelectTrigger>
                <SelectContent className="text-gray-700 font-jostFont">
                  <SelectItem
                    value={SortOrder.DESC}
                    className="text-gray-700 font-jostFont"
                  >
                    Newest First
                  </SelectItem>
                  <SelectItem
                    value={SortOrder.ASC}
                    className="text-gray-700 font-jostFont"
                  >
                    Oldest First
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Submit Button */}
              <Button
                type="submit"
                className="h-11 px-6 rounded-lg bg-slate-300 text-black font-jostFont hover:bg-slate-400
          transition
          font-medium
        
        "
              >
                Search
              </Button>
            </div>
          </form>

          {/* MAIN CONTENT */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT SIDE: Categories */}
            <div className="lg:w-1/4 w-full flex flex-col gap-6">
              {/* Card */}
              <div className="bg-slate-50 border border-slate-300 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-jostFont">
                  Categories
                </h3>

                <div className="grid grid-cols-1 gap-2 font-jostFont">
                  {Object.keys(BlogCategory).map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      onClick={() => handleCategory(cat as BlogCategory)}
                      className={`
                p-5 rounded-md font-medium text-sm transition hover:bg-slate-700 hover:text-white
                ${
                  blogsSearchInput.search?.category === cat
                    ? "bg-slate-700"
                    : "bg-slate-200 text-slate-800"
                }
              `}
                    >
                      {customLetterCustomise(cat)}
                    </Button>
                  ))}
                </div>
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
