import Lottie from "lottie-react";
import noResults from "@/assets/no-data.json";

interface NoFoundType {
  title?: string;
}
export default function NoFound({ title = "No results found" }: NoFoundType) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Lottie
        animationData={noResults}
        loop={true}
        className="w-52 h-52  md:h-64  md:w-64 lg:w-96 lg:h-96 lg:py-5"
      />
      <p className="text-gray-300 text-lg">{title}</p>
    </div>
  );
}
