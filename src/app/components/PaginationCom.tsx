import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useCallback } from "react";
import type { PropertiesSearchInput } from "@/lib/type/property";
import type { SetStateType } from "@/lib/type/common";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: SetStateType<PropertiesSearchInput>;
  styleclasses?: string;
};

export function PaginationCom({
  totalPages,
  currentPage,
  onPageChange,
  styleclasses = "w-full flex flex-row items-center mt-5 gap-2",
}: PaginationProps) {
  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange((prev) => ({ ...prev, page }));
    },
    [onPageChange]
  );

  const handlePrev = useCallback(() => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  }, [currentPage, handlePageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  }, [currentPage, totalPages, handlePageChange]);

  // 🧮 Generate visible pages with ellipses
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: (number | string)[] = [];

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1); // always include first page

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) range.push(i);

    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages); // always include last page

    return range;
  }, [currentPage, totalPages]);

  return (
    <div className={styleclasses}>
      {/* Prev Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 transition-colors duration-300",
          currentPage === 1
            ? "cursor-not-allowed bg-gray-100 text-slate-300"
            : "bg-white hover:bg-blue-600 hover:text-white"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Buttons */}
      {paginationRange.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="px-2 text-gray-400 select-none"
            >
              ...
            </span>
          );
        }

        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page as number)}
            className={cn(
              "w-9 h-9 text-sm rounded-md border border-gray-300 transition-colors font-semibold",
              isActive
                ? "bg-blue-600 text-white shadow-pagesActiveButtons border-0"
                : "bg-white hover:bg-blue-600 hover:text-white text-slate-600"
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 transition-colors duration-300",
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-100 text-slate-300"
            : "bg-white hover:bg-blue-600 hover:text-white"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
