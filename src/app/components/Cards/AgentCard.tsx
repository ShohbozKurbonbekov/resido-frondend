import Stars from "@/app/components/Stars";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Agent } from "@/lib/type/agent";
import { MailQuestionMark } from "lucide-react";
import { Link } from "react-router-dom";

interface AgentCardProp {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProp) {
  return (
    <Card className=" flex flex-col shadow-cardShadow">
      <CardHeader className="flex flex-col items-center justify-center ">
        <div className="header-img max-w-[130px] max-h-[130px] box-content rounded-full border-2 border-slate-100 p-1">
          <Link to="/agents/sdnnlsnvj">
            <img
              src={agent.agentImage}
              className="h-full w-full rounded-full"
              alt=""
            />
          </Link>
        </div>
        <CardTitle>
          <Link
            className="font-loraFont font-bold text-lg pt-0 text-darkBlue"
            to={"/agents/wlnfwkgjnwjg"}
          >
            {agent.agentName}
          </Link>
        </CardTitle>
        <CardDescription>
          <p className="text-slate-400 text-sm font-jostFont">
            {agent.agentProperties} properties
          </p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between items-end mt-3">
        <div className="flex flex-col gap-3">
          <span className="flex flex-row gap-1 text-xs font-bold">
            <span className="text-darkBlue capitalize">call:</span>
            <span className="text-blue-500">{agent.agentPhone}</span>
          </span>
          <span className="flex flex-row gap-2">
            <Stars size="70px" ratingNum={agent.agentRating} />
            <span className="text-slate-400">
              ( {agent.agentReviews} Reviews)
            </span>
          </span>
        </div>

        <div className="">
          <Link to="/">
            <button className="bg-rose-300 p-2 rounded hover:opacity-70 transition-all duration-200 ease-in-out text-blue-800 hover:text-slate-50 hover:scale-110 hover:bg-blue-600">
              <MailQuestionMark />
            </button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
