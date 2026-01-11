import type { AgentDashboardOverviewType } from "@/lib/type/agent";
import React, { useMemo } from "react";
import { agentDashboardOververWrapper } from "../AgentDashboardOverview";
import OverviewCard from "@/app/components/Cards/OverviewCard";

// -------------------------------------------- COMPONENT ---------------------------------
interface AgentDashboardOverviewContentType {
  agentDashboardOverview: AgentDashboardOverviewType;
}
const AgentDashboardOverviewContent: React.FC<AgentDashboardOverviewContentType> =
  React.memo(({ agentDashboardOverview }) => {
    const { generatedAt } = agentDashboardOverview;

    // -------------------------------------------- RENDER ---------------------------------
    const removeGenerateAt = useMemo(() => {
      return Object.entries(agentDashboardOverview).filter(
        ([key, _]) => key !== "generatedAt"
      );
    }, [agentDashboardOverview]);

    return (
      <div className={agentDashboardOververWrapper}>
        {removeGenerateAt.map(([key, amount]) => (
          <OverviewCard
            title={key}
            key={key}
            amount={amount}
            updatedAt={generatedAt || "not given"}
          />
        ))}
      </div>
    );
  });

export default AgentDashboardOverviewContent;
