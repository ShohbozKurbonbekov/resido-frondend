import React from "react";
import { Loader2 } from "lucide-react";

// Full-page loading overlay for detail pages
type DetailPageLoadingType = {
  message?: string;
};

const   DetailPageLoading:React<DetailPageLoadingType> = React.memo(({ message = "Loading..." })=> {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 shadow-xl">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
})
export default DetailPageLoading
