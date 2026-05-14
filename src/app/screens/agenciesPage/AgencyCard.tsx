import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { serverAPI } from "@/lib/config";
import type { Agency } from "@/lib/type/agency";
import { MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface AgencyCardType {
  agency: Agency;
}
const AgencyCard: React.FC<AgencyCardType> = React.memo(({ agency }) => {
  const { _id, avatar, memberName, agentsTotalNumber, propertiesTotalNumber } =
    agency;
  const imgUrl = avatar ? `${serverAPI}/${avatar}` : "/img/ag-3.png";
  return (
    <Card>
      <CardHeader className="items-center pb-5 mt-12">
        <div className="w-auto h-auto rounded-md p-1 border-2">
          <Link to={`/agencies/${_id}`}>
            <img
              src={imgUrl}
              className=" max-w-[350px] aspect-blogCardRatio w-full md:w-[230px] md:h-auto  lg:w-[130px] lg:h-[117px] rounded-md  hover:opacity-60 duration-100 transition-opacity ease-linear"
              alt={memberName ?? "agency picture"}
              loading="lazy"
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-0 pb-5 gap-y-2 mb-0 leading-none">
        <span className="py-1 px-3 rounded-sm bg-green-600 text-xs font-jostFont font-normal text-white capitalize">
          {agentsTotalNumber ?? 0} Agent{agentsTotalNumber > 1 ? "s" : ""}
        </span>
        <h5 className="text-xl text-darkBlue capitalize font-bold font-jostFont hover:text-blue-700 transition-colors duration-100 ease-linear line-clamp-1">
          <Link to={`/agencies/${_id}`}>{memberName ?? "N/A"}</Link>
        </h5>
        <p className="text-slate-400 text-size_15 capitalize font-light font-jostFont">
          {propertiesTotalNumber ?? 0} Propert
          {propertiesTotalNumber > 1 ? "ies" : "y"}
        </p>
      </CardContent>
      <CardFooter>
        <button className="w-full flex flex-row items-center justify-center py-4 rounded-md border-2  bg-[#074da31f] text-[#074da3] border-[#074da333] hover:bg-blue-700 transition-all ease-linear duration-200 group">
          <Link
            className="w-auto h-auto list-none flex flex-row items-center gap-2 group-hover:text-white"
            to={`/agencies/${_id}`}
          >
            View Agency
            <MoveRight className="-mb-1 relative  group-hover:translate-x-3 transition-transform ease-linear duration-200 group-hover:stroke-white" />
          </Link>
        </button>
      </CardFooter>
    </Card>
  );
});

export default AgencyCard;
