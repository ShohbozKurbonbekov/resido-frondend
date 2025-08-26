import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Agency } from "@/lib/type/agency";
import { ArrowLeft, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AgencyCardProp {
  agency: Agency;
}
export default function AgencyCard(prop: AgencyCardProp) {
  const { agency } = prop;
  return (
    <Card>
      <CardHeader className="items-center pb-5 mt-12">
        <div className="w-auto h-auto rounded-md p-1 border-2">
          <Link to="/agencies/agencyId:snskjgnjkgn">
            <img
              src={agency.agencyImage}
              className=" max-w-[350px] w-full md:w-[230px] md:h-auto  lg:w-[130px] lg:h-[117px] rounded-md  hover:opacity-60 duration-100 transition-opacity ease-linear"
              alt={agency.agencyName}
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-0 pb-5 gap-y-2 mb-0 leading-none">
        <span className="py-1 px-3 rounded-sm bg-green-600 text-xs font-jostFont font-normal text-white capitalize">
          {agency.agencyAgentNumbers} Agents
        </span>
        <h5 className="text-xl text-darkBlue capitalize font-bold font-jostFont hover:text-blue-700 transition-colors duration-100 ease-linear">
          <Link to="/agencies/agencyId:sdnkgbw">{agency.agencyName}</Link>
        </h5>
        <p className="text-slate-400 text-size_15 capitalize font-light font-jostFont">
          {agency.agencyPropertyNumbers} Properties
        </p>
      </CardContent>
      <CardFooter>
        <button className="w-full flex flex-row items-center justify-center py-[14px] rounded-md border-2  bg-[#074da31f] text-[#074da3] border-[#074da333] hover:bg-blue-700 transition-all ease-linear duration-200 hover:text-white">
          <Link
            className="w-auto h-auto list-none flex flex-row items-center gap-2"
            to="/agencies/agencyId:snskjgnjkgn"
          >
            View Agency
            <MoveRight className="-mb-1" />
          </Link>
        </button>
      </CardFooter>
    </Card>
  );
}
