import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCategory, BlogStatus, SortOrder } from "@/lib/enums/blog.enum";
import type { SetStateType } from "@/lib/type/common";
import type { BlogSearchInput } from "@/lib/type/blogs";
import { useState } from "react";

import { RotateCcw, Search } from "lucide-react";
import { customLetterCustomise } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "@/app/hooks/useGlobals";
import { MemberType } from "@/lib/enums/agent.enum";

// -------------------- Classes -------------
const actionBtnClasses =
  "font-jostFont py-6 text-gray-700  focus-visible:ring-slate-400";
// ------------------ Component ------------------
interface AdminDashboardBlogsFilterType {
  onTextSubmit: (text: string) => Promise<void>;
  searchInput: BlogSearchInput & { status?: BlogStatus };
  setSearchInput: SetStateType<BlogSearchInput & { status?: BlogStatus }>;
  setLoading: SetStateType<boolean>;
}
export default function AdminDashboardBlogsFilter({
  searchInput,
  setSearchInput,
  onTextSubmit,
  setLoading,
}: AdminDashboardBlogsFilterType) {
  const [searchText, setSearchText] = useState<string>("");
  const { search, sort } = searchInput;
  const navigation = useNavigate();
  const { authmember } = useGlobals();
  // --------------------------- Handlers -----------------------------
  // Toggle category
  const onCategoryChange = (c: BlogCategory) => {
    setLoading(true);
    setSearchInput((prev) => ({
      ...prev,
      page: 1,
      search: {
        ...prev.search,
        category: c,
      },
    }));
  };

  // Toggle sort
  const onSort = (s: SortOrder) => {
    setLoading(true);
    setSearchInput((prev) => ({
      ...prev,
      sort: s,
    }));
  };

  // Toggle status
  const onStatusChange = (s: BlogStatus) => {
    setLoading(true);
    setSearchInput((prev) => ({
      ...prev,
      page: 1,
      status: s,
    }));
  };

  // Navigate to post blog path
  const onPostBlog = () => {
    if (authmember && authmember.role === MemberType.REAL_ESTATE_ADMIN) {
      navigation("/admin/post/blog");
    }
  };

  // ------------------------------------- Render -------------------------------------
  return (
    <div className="flex flex-col gap-y-6 p-6 bg-white border border-slate-300/60 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex  flex-col  gap-2  items-start sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg md:text-xl text-gray-700 font-jostFont tracking-tight ">
          Search, filter, and manage all blog posts
        </h2>
        <Button
          className="self-end sm:self-auto hover:opacity-60 duration-150 transition-colors ease-linear font-jostFont"
          onClick={onPostBlog}
        >
          Post New Blog
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-start gap-2">
        <div className="md:flex-1 relative text-gray-400">
          <Search className="h-5 w-5  absolute left-2 top-1/2 -translate-y-1/2 " />
          <Input
            className={`pl-8 text-lg ${actionBtnClasses}`}
            placeholder="Search by blog title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onTextSubmit(searchText);
              }
            }}
          />
          <RotateCcw
            className="h-5 w-5 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-gray-700 active:-rotate-45 transition-all ease-linear duration-200"
            onClick={() => setSearchText("")}
          />
        </div>

        <div className="max-w-80 w-full flex flex-row flex-wrap md:flex-nowrap ml-auto gap-2 font-jostFont text-gray-700 capitalize ">
          <Select value={search?.category} onValueChange={onCategoryChange}>
            <SelectTrigger className={`text-sm ${actionBtnClasses}`}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(BlogCategory).map((c) => (
                <SelectItem key={c} value={c}>
                  {customLetterCustomise(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={onSort}>
            <SelectTrigger className={`text-sm ${actionBtnClasses}`}>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SortOrder.DESC}>Newest First</SelectItem>
              <SelectItem value={SortOrder.ASC}>Oldest First</SelectItem>
            </SelectContent>
          </Select>

          <Select value={searchInput.status} onValueChange={onStatusChange}>
            <SelectTrigger className={`text-sm ${actionBtnClasses}`}>
              <SelectValue placeholder="Blog Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={BlogStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={BlogStatus.BLOCKED}>Blocked</SelectItem>

              <SelectItem value={BlogStatus.DELETED}>Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
