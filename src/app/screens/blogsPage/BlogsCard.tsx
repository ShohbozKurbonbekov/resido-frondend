import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { BlogType } from "@/lib/type/blogs";
import { dateConverter } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { id } from "zod/v4/locales";

interface BlogsCardProp {
  blogsData: BlogType;
}

export default function BlogsCard({ blogsData }: BlogsCardProp) {
  const navigation = useNavigate();
  const { image, title, description, comments, quote, writer, date } =
    blogsData;
  return (
    <Card className="max-w-[516px] shadow-sm rounded-md border-0 flex flex-col">
      <CardHeader className="flex flex-row items-center p-[10px]">
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-md object-cover"
        />
      </CardHeader>
      <CardContent className="p-0 flex flex-col  h-full">
        <div className="info p-[10px_20px]">
          <span className="inline-block py-1 px-4 text-white bg-green-800 text-xs rounded-md">
            {dateConverter(date, "Do MMM YYYY")}
          </span>
        </div>

        <div className="p-[5px_20px_30px] flex-1 flex flex-col items-start justify-between">
          <div>
            <h4 className="text-lg text-darkBlue font-semibold capitalize mb-1 leading-[26px]">
              {title}
            </h4>
            <p className="mb-2.5 leading-[1.8] text-slate-400 text-start ">
              {description}
            </p>
          </div>
          <button
            className="flex flex-row items-center gap-1 text-blue-600 py-3 pe-6 rounded-md text-size_15 font-jostFont capitalize hover:bg-blue-800 hover:text-white duration-300 transition-all active:shadow-[0_0_0_4px_rgba(0,0,255,0.3)] font-semibold hover:ps-6 shadow-none"
            onClick={() => {
              navigation(`${id}`);
            }}
          >
            Continue
            <MoveRight className="h-[13px] w-[13px]" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
