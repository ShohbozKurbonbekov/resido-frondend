import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { setSavedBlogs } from "./slice";
import { retrieveSavedBlogs } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import type { SavedBlogsOutput } from "@/lib/type/blogs";
import BlogService from "@/app/services/BlogService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import SavedBlogsHeader from "./SavedBlogsHeader";
import SavedBlogsContent from "./SavedBlogsContent";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const savedBlogsDispatch = (dispatch: Dispatch) => ({
  setSavedBlogs: (data: SavedBlogsOutput) => dispatch(setSavedBlogs(data)),
});

const savedBlogsRetriever = createSelector(
  retrieveSavedBlogs,
  (savedBlogs) => ({ savedBlogs })
);

// --------------------------------------- COMPONENT --------------------
export default function SavedArticles() {
  const { setSavedBlogs } = savedBlogsDispatch(useDispatch());
  const { savedBlogs } = useSelector(savedBlogsRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
  const [savedBlogsInput, setSavedBlogsInput] = useState<CommonInput>({
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      const blog = new BlogService();

      try {
        const result = await blog.getSavedBlogs(savedBlogsInput);
        setSavedBlogs(result);
      } catch (error) {
        console.log("Error in fetching getSavedBlogs: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedBlogs();
  }, [savedBlogsInput, mainPageLoading]);
  // --------------------------------------- COMPONENT --------------------
  return (
    <div className="lg:col-span-9">
      {loading ? (
        <SpinnerGrids />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <SavedBlogsHeader />
          <SavedBlogsContent
            savedBlogs={savedBlogs}
            savedBlogsInput={savedBlogsInput}
            setSavedBlogsInput={setSavedBlogsInput}
            setMainPageLoading={setMainPageLoading}
          />
        </div>
      )}
    </div>
  );
}
