import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Quote } from "lucide-react";
import type { Comment } from "@/lib/type/comment";
import { customTruncate, defaultUserAvatar, serverAPI } from "@/lib/config";

interface PreviewCardType {
  comment: Comment;
}
export default function PreviewCard({ comment }: PreviewCardType) {
  const { content, senderData } = comment;

  const imgUrl = senderData?.avatar
    ? `${serverAPI}/${senderData.avatar}`
    : defaultUserAvatar;
  return (
    <Card
      className="shadow-none  flex flex-col 
    items-center h-full p-4"
    >
      <CardHeader>
        <div className="w-20 h-20 relative overflow-hidden">
          <img
            src={imgUrl}
            className="rounded-full w-full h-full"
            alt={senderData?.memberName ?? "Unknown"}
          />
          <span className="absolute right-0 bottom-0 h-7 w-7 rounded-full bg-blue-700 flex items-center justify-center">
            <Quote
              className="h-3 w-3 text-slate-50 origin-center rotate-180"
              fill="white"
            />
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-7 w-full">
        <p className="leading-tight text-sm font-jostFont text-slate-400 text-center w-full  p-2 rounded-sm">
          {customTruncate(content, 100)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col  flex-1 p-0 ">
        <div className=" mt-auto text-center">
          <h5 className="font-jostFont text-lg text-darkBlue font-bold ">
            {senderData?.memberName ?? "Unknown"}
          </h5>
          <p className="font-loraFont text-sm text-darkBlue">
            {senderData?.occupation
              ? senderData.occupation
              : "position (secret)"}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
