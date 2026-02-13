import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOrder } from "@/lib/enums/blog.enum";
import { useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { customLetterCustomise } from "@/lib/utils";

// -------------------- Classes -------------
const actionBtnClasses =
  "font-jostFont py-6 text-gray-700  focus-visible:ring-slate-400";
// ------------------ Component ------------------
export default function AdminDashboardListFilter<
  Status extends string,
  Category extends string,
>({
  category,
  sort,
  status,
  onTextSubmit,
  onCategoryChange,
  onSortChange,
  onStatusChange,
  categoryData,
  sortData,
  statusData,
  filterHeader,
}: {
  onTextSubmit: (text: string) => Promise<void>;
  category: Category | undefined;
  status: Status | undefined;
  sort: SortOrder | undefined;
  categoryData: Category[];
  sortData: SortOrder[];
  statusData: Status[];
  onCategoryChange: (category: Category) => void;
  onSortChange: (sort: SortOrder) => void;
  onStatusChange: (status: Status) => void;
  filterHeader: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState<string>("");
  // ------------------------------------- Render -------------------------------------
  return (
    <div className="flex flex-col gap-y-6 p-6 bg-white border border-slate-300/60 rounded-lg shadow-sm">
      {/* Header */}
      {filterHeader}

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-start gap-2">
        <div className="md:flex-1 relative text-gray-400">
          <Search className="h-5 w-5  absolute left-2 top-1/2 -translate-y-1/2 " />
          <Input
            className={`pl-8 text-lg ${actionBtnClasses}`}
            placeholder="Search By Name..."
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
          {category && (
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className={`text-sm ${actionBtnClasses}`}>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryData.map((c) => (
                  <SelectItem key={c} value={c}>
                    {customLetterCustomise(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {sort && (
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className={`text-sm ${actionBtnClasses}`}>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sortData.map((s) => (
                  <SelectItem value={s} key={s}>
                    {" "}
                    {s === SortOrder.DESC ? "Newest" : "Oldest"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {status && (
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className={`text-sm ${actionBtnClasses}`}>
                <SelectValue placeholder="Blog Status" />
              </SelectTrigger>
              <SelectContent>
                {statusData.map((s) => (
                  <SelectItem value={s} key={s}>
                    {customLetterCustomise(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}
