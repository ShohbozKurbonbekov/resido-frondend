import Lottie from "lottie-react";
import noResults from "@/assets/no-data.json";
export default function NoFound() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Lottie
        animationData={noResults}
        loop={true}
        className="w-52 h-52  md:h-64  md:w-64 lg:w-80 lg:h-80"
      />
      <p className="text-gray-300 text-lg">No results found</p>
    </div>
  );
}
