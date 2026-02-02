import type { MyAgentsDashboardType } from "@/lib/type/agent";
import React from "react";
import { MoreVertical, ShieldX, Eye, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import { AgentStatus } from "@/lib/enums/agent.enum";

// ----------------------------------------- COMPONENT --------------------------

interface MyAgentsDashboardCardType {
  agent: MyAgentsDashboardType;
  onChangeAgentStatus: (id: string, status: AgentStatus) => Promise<void>;
  onViewProperties: (id: string) => void;
}

const MyAgentsDashboardCard: React.FC<MyAgentsDashboardCardType> = React.memo(
  ({ agent, onChangeAgentStatus, onViewProperties }) => {
    // ----------------------------------------- RENDER --------------------------
    const agentImgUrl = agent?.avatar
      ? `${serverAPI}/${agent.avatar}`
      : defaultUserAvatar;

    return (
      <Card className="rounded-xl shadow-sm">
        <CardContent className="flex items-center justify-between p-4">
          {/* Left: Agent Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={agentImgUrl} />
              <AvatarFallback>{agent.fullName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col font-jostFont space-y-1">
              <span className="font-semibold text-sm capitalize">
                {agent.fullName}
              </span>
              <span className="text-xs text-muted-foreground">
                @{agent.nickname}
              </span>

              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="capitalize">
                  {agent.currentStatus}
                </Badge>
                {agent.isVerified && (
                  <Badge variant="secondary">Verified</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="text-slate-700 bg-transparent hover:bg-slate-200 hover:text-slate-900"
                onClick={() => onViewProperties(agent._id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Properties
              </DropdownMenuItem>

              {agent.currentStatus === AgentStatus.AVAILABLE && (
                <DropdownMenuItem
                  onClick={() =>
                    onChangeAgentStatus(agent._id, AgentStatus.PAUSED)
                  }
                  className="text-red-400 hover:text-red-700 bg-transparent hover:bg-red-200"
                >
                  <ShieldX className="w-4 h-4 mr-2" />
                  Suspend Agent
                </DropdownMenuItem>
              )}
              {agent.currentStatus === AgentStatus.PAUSED && (
                <DropdownMenuItem
                  onClick={() =>
                    onChangeAgentStatus(agent._id, AgentStatus.AVAILABLE)
                  }
                  className="text-blue-500 hover:text-blue-700 bg-transparent hover:bg-blue-200"
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Activate Agent
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    );
  },
);

export default MyAgentsDashboardCard;
