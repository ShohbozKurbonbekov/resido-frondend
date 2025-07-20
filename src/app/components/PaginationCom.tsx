import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  styleclasses?: string;
  onPageChange: (page: number) => void;
};

export function PaginationCom({
  totalPages = 4,
  currentPage, // 2
  onPageChange, // () => {} change page number
  styleclasses = "w-full flex flex-row items-center mt-5 gap-2",
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={`${styleclasses}`}>
      <button
        onClick={handlePrev}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-blue-600 hover:text-white duration-100 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 hover:text-white" />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-9 h-9 text-sm rounded-md border border-gray-300 hover:bg-blue-600 hover:text-white duration-100 transition-colors font-bold",
              isActive
                ? "bg-blue-600 text-white shadow-[0_0_1px_2px_rgba(191,219,254,1)] border-0"
                : "bg-white text-slate-400 "
            )}
          >
            {page}
          </button>
        );
      })}

      {/* // ... */}

      <button
        onClick={handleNext}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-blue-600 hover:text-white duration-100 transition-colors"
        aria-label="Next page"
      >
        <Ellipsis className="w-4 text-slate-400" />
      </button>

      <button
        onClick={handleNext}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-blue-600 hover:text-white duration-100 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
