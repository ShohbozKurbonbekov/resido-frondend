import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import React from "react";
import type { SavedBlogsOutput } from "@/lib/type/blogs";
import type { CommonInput, SetStateType } from "@/lib/type/common";

interface SavedBlogsContentType {
  savedBlogs: SavedBlogsOutput;
  savedBlogsInput: CommonInput;
  setSavedBlogsInput: SetStateType<CommonInput>;
  setMainPageLoading: SetStateType<boolean>;
}
const SavedBlogsContent: React.FC<SavedBlogsContentType> = React.memo(
  ({ savedBlogs, savedBlogsInput, setMainPageLoading, setSavedBlogsInput }) => {
    return (
      <>
        {savedBlogs?.blogs?.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div>Content here</div>
            <PaginationCom
              totalPages={Math.ceil(
                (savedBlogs.totalBlogsNumber[0]?.total ?? 0) /
                  savedBlogsInput.limit
              )}
              styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
              currentPage={savedBlogsInput.page}
              onPageChange={setSavedBlogsInput}
            />
          </div>
        ) : (
          <NoFound title="No saved blogs found" />
        )}
      </>
    );
  }
);

export default SavedBlogsContent;
