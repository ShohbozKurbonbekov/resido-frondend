import NoFound from "@/app/components/NoFound";
import type { SocialType, WriterType } from "@/lib/type/blogs";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";

interface PostAutherProp {
  auther: WriterType | undefined;
}

export default function PostAuther({ auther }: PostAutherProp) {
  return (
    <div className="p-5 flex flex-col items-center rounded-md border-2 border-200 bg-white">
      {!auther ? (
        <NoFound title={"No post auther found"} />
      ) : (
        <>
          <span className="w-[120px] h-[120px] rounded-full p-0.5 border-2 border-slate-200 mx-auto mb-4">
            <img
              src={auther.avatar}
              alt={auther.name}
              className="w-full h-full rounded-full object-cover"
            />
          </span>
          <h4 className="text-center font-bold text-darkBlue capitalize font-jostFont text-lg mb-1.5 leading-7">
            {auther.name}
          </h4>
          <ul className="w-full flex flex-row items-center justify-center mb-4 gap-4">
            {Object.keys(auther.social).map((link: string) => {
              const Social: ComponentType<SVGProps<SVGSVGElement>> =
                link === "facebook"
                  ? Facebook
                  : link === "twitter"
                  ? Twitter
                  : link === "instagram"
                  ? Instagram
                  : link === "youtube"
                  ? Youtube
                  : Linkedin;
              const iconClasses: string =
                link === "instagram"
                  ? "fill-slate-400 stroke-white hover:fill-blue-700"
                  : link === "twitter"
                  ? "stroke-slate-400 fill-slate-400 hover:fill-blue-700 hover:stroke-blue-700"
                  : link === "youtube"
                  ? "stroke-white fill-slate-400 hover:fill-blue-700"
                  : link === "facebook"
                  ? "fill-slate-400 stroke-slate-400 hover:fill-blue-700 hover:stroke-blue-700"
                  : "stroke-slate-400 fill-slate-400 hover:fill-blue-700 hover:stroke-blue-700";
              return (
                <Link
                  key={link}
                  to={auther.social[link as keyof SocialType]}
                  className="group"
                >
                  <Social
                    className={`w-4 h-4 4 ${iconClasses} group-hover:scale-110 duration-200 transition-all ease-linear `}
                  />
                </Link>
              );
            })}
          </ul>
          <p className="leading-onePointEight text-size_15 text-slate-500 mb-2.5 text-center">
            {auther.bio}
          </p>
        </>
      )}
    </div>
  );
}
