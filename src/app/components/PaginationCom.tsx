import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  styleclasses?: string;
  onPageChange: React.Dispatch<
    React.SetStateAction<{ limit: number; page: number }>
  >;
};

export function PaginationCom({
  totalPages,
  currentPage,
  onPageChange, // () => {} change page number
  styleclasses = "w-full flex flex-row items-center mt-5 gap-2",
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1)
      onPageChange((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleNext = () => {
    if (currentPage < totalPages)
      onPageChange((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
  };

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

      {Array.from({ length: totalPages }).map((_, index) => {
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
              "w-9 h-9 text-sm rounded-md border border-gray-300 hover:bg-blue-600 hover:text-white duration-300 transition-colors font-semi-bold",
              isActive
                ? "bg-blue-600 text-white shadow-[0_0_0px_3px_rgba(191,219,254,1)] border-0"
                : "bg-white text-black "
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
