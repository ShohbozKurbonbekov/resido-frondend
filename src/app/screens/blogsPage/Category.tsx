import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NoFound from "@/app/components/NoFound";
import type { T } from "@/lib/type/common";

const blogs: T = [];
const chunkingArray = (arr: string[], size: number): string[][] => {
  const result: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    // i => 0 => 4 => 8 => 12 => 16 => 20
    result.push(arr.slice(i, i + size)); // [[],[],[],[],[]]
  }
  return result;
};

const categoryAmount = (categoryName: string): number => {
  return blogs.filter((el) => el.category.toLowerCase() === categoryName)
    .length;
};
export default function Category() {
  const [categoryInquery, setCategoryInquery] = useState<{
    limit: number;
    page: number;
  }>({
    limit: 3,
    page: 1,
  });

  const categories = useMemo(() => {
    const uniqueValuesInArr = [...new Set(blogs.map((blog) => blog.category))];
    return chunkingArray(uniqueValuesInArr, categoryInquery.limit);
  }, [categoryInquery.limit]);

  return (
    <div className="bg-white border-2 border-slate-200  rounded-md py-9 px-7 box-border  flex flex-col space-y-2 min-h-[329px]">
      <h4 className="text-xl font-bold font-jostFont leading-tight text-darkBlue capitalize">
        Categories
      </h4>
      <ul className="flex flex-col relative pb-10 items-center flex-1">
        {categories.length === 0 ? (
          <NoFound title="no categories yet" />
        ) : (
          <>
            {categories[categoryInquery.page - 1].map((category: string) => (
              <li
                className="py-3 border-s-0  border border-e-0 border-t-0 border-b-slate-300 group w-full"
                key={category}
              >
                <Link
                  className="no-underline list-none text-darkBlue font-jostFont text-size_15 capitalize w-full h-full flex flex-row justify-between items-center"
                  to=""
                >
                  <span className="hover:text-blue-700">{category}</span>
                  <span className="hover:text-blue-700">
                    {categoryAmount(category)}
                  </span>
                </Link>
              </li>
            ))}
            <div className="flex flex-row items-center justify-center gap-1 absolute -bottom-5 ">
              {/* Left */}
              <button
                className={`p-2 rounded-full border border-slate-300 
                     
                   
                    ${
                      categoryInquery.page === 1
                        ? "cursor-not-allowed bg-slate-100 text-slate-300"
                        : "hover:bg-slate-50 hover:text-slate-800 text-slate-600  active:scale-95 transition duration-200 ease-in-out shadow-sm hover:shadow"
                    }`}
                onClick={() =>
                  setCategoryInquery((prev) => ({
                    ...prev,
                    page: Math.max(1, categoryInquery.page - 1),
                  }))
                }
                disabled={categoryInquery.page === 1}
              >
                <ChevronLeft className="w-4 h-4 active:scale-95 " />
              </button>

              {/* Right */}
              <button
                className={`p-2 rounded-full border border-slate-300 
                     
                   
                    ${
                      categoryInquery.page === categories.length
                        ? "cursor-not-allowed bg-slate-100 text-slate-300"
                        : "hover:bg-slate-50 hover:text-slate-800 text-slate-600  active:scale-95 transition duration-200 ease-in-out shadow-sm hover:shadow"
                    }`}
                onClick={() =>
                  setCategoryInquery((prev) => ({
                    ...prev,
                    page: Math.min(categories.length, categoryInquery.page + 1),
                  }))
                }
                disabled={categoryInquery.page === categories.length}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
