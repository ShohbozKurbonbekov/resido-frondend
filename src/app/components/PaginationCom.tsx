import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertiesSearchInput } from "@/lib/type/property";
import type { SetStateType } from "@/lib/type/common";
import { useCallback, useMemo } from "react";

// --------------------------------- COMPONENT ------------------------------
type PaginationProps = {
  totalPages: number;
  currentPage: number;
  styleclasses?: string;
  onPageChange: SetStateType<PropertiesSearchInput>;
};

export function PaginationCom({
  totalPages,
  currentPage,
  onPageChange,
  styleclasses = "w-full flex flex-row items-center mt-5 gap-2",
}: PaginationProps) {
  // -------------------------------- HANDLERS ----------------------
  const handlePrev = useCallback(() => {
    if (currentPage > 1)
      onPageChange((prev) => ({ ...prev, page: currentPage - 1 }));
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages)
      onPageChange((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
  }, [currentPage, onPageChange, totalPages]);

  const calculatePageButtons = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i);
  }, [totalPages]);

  return (
    <div className={`${styleclasses}`}>
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 duration-300 transition-colors  group ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-100 text-slate-300"
            : "bg-white hover:bg-blue-600 hover:text-white "
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className={`w-4 h-4`} />
      </button>

      {calculatePageButtons.map((_, index) => {
        const page = index + 1;
        const isActive = currentPage === page;

        return (
          <button
            type="button"
            key={page}
            onClick={() => {
              onPageChange((prev) => ({ ...prev, page: page }));
            }}
            className={cn(
              "w-9 h-9 text-sm rounded-md border border-gray-300 hover:bg-blue-600 hover:text-white duration-300 transition-colors font-semi-bold text-slate-600",
              isActive
                ? "bg-blue-600 text-white shadow-pagesActiveButtons border-0"
                : "bg-white "
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        className={`w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 transition-colors duration-300  ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-100 text-slate-300"
            : "bg-white hover:bg-blue-600 hover:text-white "
        }`}
        aria-label="Next page"
        type="button"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className={`w-4 h-4`} />
      </button>
    </div>
  );
}
