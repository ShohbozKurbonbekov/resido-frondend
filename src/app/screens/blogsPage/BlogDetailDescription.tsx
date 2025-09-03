import Divider from "@/app/components/Divider";
import type { BlogType } from "@/lib/type/blogs";
import { Quote } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

interface BlogDetailDescriptionProp {
  blog: BlogType | undefined;
}

interface BlogShareNetworksType {
  name: string;
  ShareIcon: React.ComponentType<
    React.ComponentProps<typeof LinkedinShareButton>
  >;
  Icon: React.ComponentType<React.ComponentProps<typeof TwitterIcon>>;
}
const blogShareNetworks: BlogShareNetworksType[] = [
  { name: "facebook", ShareIcon: FacebookShareButton, Icon: FacebookIcon },
  { name: "twitter", ShareIcon: TwitterShareButton, Icon: TwitterIcon },
  {
    name: "linkedin",
    ShareIcon: LinkedinShareButton,
    Icon: LinkedinIcon,
  },
  { name: "email", ShareIcon: EmailShareButton, Icon: EmailIcon },
  { name: "telegram", ShareIcon: TelegramShareButton, Icon: TelegramIcon },
];

export default function BlogDetailDescription({
  blog,
}: BlogDetailDescriptionProp) {
  const navigation = useNavigate();
  const [hoverEl, setHoverEl] = useState("");
  return (
    <div className="p-5 bg-white border-2 border-slate-200 rounded-md w-full flex  flex-col">
      <div className="h-auto w-auto mb-6">
        <img
          src={blog?.image}
          alt={blog?.title}
          className="w-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-row space-x-[19px] items-center ps-2">
        <Link
          to={`/agents/${blog?.writer?.name}`}
          className="text-slate-600 font-normal font-jostFont text-size_15 leading-tight capitalize"
        >
          By {blog?.writer.name}
        </Link>
        <Link
          to={`/agents/${blog?.writer?.name}`}
          className="text-slate-600 font-normal font-jostFont text-size_15 leading-tight capitalize"
        >
          {blog?.comments.length} Comments
        </Link>
      </div>
      <h3 className="font-bold leading-[1.4] mt-1 text-3xl  text-darkBlue font-jostFont capitalize">
        {blog?.title}
      </h3>
      <p className="text-slate-400 font-jostFont mt-6 text-base leading-onePointEight">
        {(blog?.description ?? "").length > 150
          ? blog?.description.slice(0, 150) + " ....."
          : blog?.description ?? "No description"}
      </p>
      <blockquote className="my-[50px] relative py-7 pe-7 ps-[100px] bg-sky-50 rounded-sm border-0  italic flex flex-col space-y-3">
        <p className="text-slate-400 text-base  mt-[25px]  leading-onePointEight">
          {blog?.quote}
        </p>
        <h5 className="font-bold font-jostFont text-darkBlue text-[18px] leading-tight">
          - {blog?.quote.split(" – ")[1]}
        </h5>
        <span className="absolute  top-1/2 -translate-y-full leading-none left-[50px] ">
          <Quote className="fill-blue-700 border-0 rotate-180 text-blue-700" />
        </span>
      </blockquote>
      <p className="text-slate-400 font-jostFont text-base leading-onePointEight">
        {blog?.description ?? "No description"}
      </p>
      <div className="mt-[43px] grid grid-cols-1 gap-y-7 md:grid-cols-2">
        {/* // tags */}
        <div className="flex flex-col space-y-5">
          <h4 className="font-jostFont text-base font-bold leading-tight text-darkBlue capitalize">
            Related Tags
          </h4>
          <ul className="flex flex-row flex-wrap gap-2.5 list-none">
            {blog?.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  navigation(`/tags/${tag}`);
                }}
                className="border border-slate-200 p-[9px_20px] text-darkBlue decoration no-underline hover:bg-blue-700 hover:text-white duration-300 transition-all ease-linear font-jostFont"
              >
                {tag}
              </button>
            ))}
          </ul>
        </div>

        {/* // social networks */}
        <div className="flex flex-col space-y-5 md:items-end">
          <h4 className="font-jostFont text-base font-bold leading-tight text-darkBlue capitalize">
            Social share
          </h4>
          <ul className="flex flex-row justify-start md:justify-end  list-none">
            {blogShareNetworks.map(({ ShareIcon, name, Icon }) => (
              <ShareIcon
                title="Check this out"
                url="https://www.example.com"
                key={name}
                onMouseEnter={() => setHoverEl(name)}
                onMouseLeave={() => setHoverEl("")}
              >
                <Icon
                  size={30}
                  round
                  iconFillColor={
                    hoverEl === name ? "red" : "rgba(169, 169, 169, 1)"
                  }
                  bgStyle={{ fill: "transparent" }}
                />
              </ShareIcon>
            ))}
          </ul>
        </div>
      </div>

      <Divider
        height={"2px"}
        bgColor={"rgba(128, 128, 128, 0.2)"}
        width={"100%"}
        marginTop={"40px"}
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-row justify-start items-center">
          <button className="p-4 w-full text-center bg-slate-400 md:w-auto py-4 rounded-md text-white hover:bg-slate-600 duration-300 transition-all ease-linear active:scale-95 capitalize">
            Next post
          </button>
        </div>
        <div className="flex flex-row justify-start md:justify-end items-center m-0">
          <button className="p-4 w-full text-center bg-slate-400 md:w-auto py-4 rounded-md text-white hover:bg-slate-600 duration-300 transition-all ease-linear active:scale-95 capitalize">
            Prev post
          </button>
        </div>
      </div>
    </div>
  );
}
