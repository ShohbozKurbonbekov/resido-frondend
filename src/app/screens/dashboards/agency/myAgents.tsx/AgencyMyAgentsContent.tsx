import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentStatus } from "@/lib/enums/agent.enum";
import type {
  CommonAgentResults,
  MyAgentsDashboardType,
} from "@/lib/type/agent";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import { myAgentsCardWrapper } from "./AgencyDashboardMyAgents";
import MyAgentsDashboardCard from "./MyAgentsDashboardCard";
import { PaginationCom } from "@/app/components/PaginationCom";
import NoFound from "@/app/components/NoFound";

interface AgencyMyAgentsContentType {
  myAllAgents: CommonAgentResults<MyAgentsDashboardType>;
  myAgentsInput: CommonInput & { status?: AgentStatus };
  setMyAgentsInput: SetStateType<CommonInput & { status?: AgentStatus }>;
  onStatusChange: (status: AgentStatus) => void;
  onSuspend: (id: string) => Promise<void>;
  onViewProperties: (id: string) => Promise<void>;
}

export default function MyAgentsFrame({
  onStatusChange,
  myAgentsInput,
  myAllAgents,
  setMyAgentsInput,
  onSuspend,
  onViewProperties,
}: AgencyMyAgentsContentType) {
  const { limit, page, status } = myAgentsInput;

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Status Filter */}
      <Tabs
        className="inline-flex w-fit items-center bg-white p-2 rounded-md font-jostFont"
        value={status}
        onValueChange={(value) => onStatusChange(value as AgentStatus)}
      >
        <TabsList className="bg-muted/40 rounded-lg p-1">
          <TabsTrigger value={AgentStatus.AVAILABLE}>Available</TabsTrigger>
          <TabsTrigger value={AgentStatus.PAUSED}>Paused</TabsTrigger>
          <TabsTrigger value={AgentStatus.REJECTED}>Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content Wrapper */}
      {myAllAgents?.agents?.length ? (
        <div className="flex-1  flex flex-col justify-between gap-4">
          <div className={myAgentsCardWrapper}>
            {myAllAgents.agents.map((agent: MyAgentsDashboardType) => (
              <MyAgentsDashboardCard
                onSuspend={onSuspend}
                onViewProperties={onViewProperties}
                agent={agent}
                key={agent._id}
              />
            ))}
          </div>
          <PaginationCom
            totalPages={Math.ceil(
              (myAllAgents.totalNumbers[0]?.total ?? 0) / limit,
            )}
            styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
            currentPage={page}
            onPageChange={setMyAgentsInput}
          />
        </div>
      ) : (
        <NoFound title="No Agents found" />
      )}
    </div>
  );
}
