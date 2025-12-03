import SocialsNetwork from "@/app/components/SocialsNetwork";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import type { BlogAuthor } from "@/lib/type/blogs";
import React from "react";

// ---------------------------------------------- COMPONENT ----------------------------------
interface BlogAuthorType {
  author: BlogAuthor;
}
const BlogAuthorCom: React.FC<BlogAuthorType> = React.memo(({ author }) => {
  const { authorName, socials, authorAvatar, bioInfo } = author;

  const imgUrl = authorAvatar
    ? `${serverAPI}/${authorAvatar}`
    : defaultUserAvatar;

  // ---------------------------------------------- RENDER ----------------------------------
  return (
    <div className="p-5 flex flex-col items-center rounded-md border-2  bg-white">
      <>
        <div className="w-32 h-32 rounded-full p-0.5 border-2 border-slate-200 mx-auto mb-4">
          <img
            src={imgUrl}
            alt={authorName || "Agent picture here"}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h4 className="text-center font-bold text-darkBlue capitalize font-jostFont text-lg mb-1.5 leading-7">
          {authorName ?? "Unknown"}
        </h4>
        <SocialsNetwork networks={socials} />
        <p className="leading-onePointEight text-size_15 text-slate-500 mb-2.5 text-center">
          {bioInfo ?? "No description"}
        </p>
      </>
    </div>
  );
});

export default BlogAuthorCom;
