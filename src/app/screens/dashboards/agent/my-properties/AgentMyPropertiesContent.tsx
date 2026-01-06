import type { CommonPropertyResults } from "@/lib/type/property";
import React from "react";

interface AgentMyPropertiesContentType {
  agentMyProperties: CommonPropertyResults;
}

const AgentMyPropertiesContent: React.FC<AgentMyPropertiesContentType> =
  React.memo(({ agentMyProperties }) => {
    return <div>Content: {agentMyProperties.properties.length}</div>;
  });

export default AgentMyPropertiesContent;
