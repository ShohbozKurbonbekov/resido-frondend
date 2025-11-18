import Stars from "@/app/components/Stars";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import type { AgentData } from "@/lib/type/agent";
import { MailQuestionMark } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AgentCardType {
  agent: AgentData;
}

// ----------------------------- COMPONENT -------------------------
export default function AgentCard({ agent }: AgentCardType) {
  const {
    _id: id,
    avatar,
    nickname,
    fullName,
    totalProperties,
    phone,
    averageRating,
    totalComments,
  } = agent;
  const imgUrl = avatar ? `${serverAPI}/${avatar}` : defaultUserAvatar;
  const navigation = useNavigate();
  // ------------------------------------------- HANDLERS ----------------------------------------
  const handleClick = (id: string) => {
    navigation(`/agents/${id}`);
  };

  // ------------------------ RENDER ----------------------------
  return (
    <Card
      className=" flex flex-col shadow-cardShadow cursor-pointer"
      onClick={() => handleClick(id)}
    >
      {/*HEADER*/}
      <CardHeader className="flex flex-col items-center justify-center ">
        <div className="max-w-32 max-h-32 box-content rounded-full border-2 border-slate-100 p-1">
          <img
            src={imgUrl}
            className="h-full w-full rounded-full"
            alt={nickname}
          />
        </div>
        <CardTitle>{fullName ?? "N/A"}</CardTitle>
        <CardDescription>
          <p className="text-slate-400 text-sm font-jostFont">
            {totalProperties ?? 0} propert{totalProperties !== 0 ? "y" : "ies"}
          </p>
        </CardDescription>
      </CardHeader>

      {/* CONTENT */}
      <CardFooter className="flex flex-row justify-between items-end mt-3">
        <div className="flex flex-col gap-3">
          <span className="flex flex-row gap-1 text-xs font-bold">
            <span className="capitalize text-red-400">Call:</span>
            <span className="text-blue-500">{phone ?? "N/A"}</span>
          </span>
          <span className="flex flex-row gap-2">
            <Stars rating={averageRating ?? 0} />
            <span className="text-slate-400">
              ({totalComments ?? 0} Comment{totalComments !== 0 ? "s" : ""})
            </span>
          </span>
        </div>

        <div>
          <button className="bg-rose-300 p-2 rounded hover:opacity-70 transition-all duration-200 ease-in-out text-blue-800 hover:text-slate-50 hover:scale-110 hover:bg-blue-600">
            <MailQuestionMark />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
