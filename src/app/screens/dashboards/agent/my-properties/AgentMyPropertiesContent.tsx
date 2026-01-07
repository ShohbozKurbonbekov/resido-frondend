import NoFound from "@/app/components/NoFound";
import type {
  AgentMyProperties,
  CommonPropertyResults,
} from "@/lib/type/property";
import React from "react";
import { agentMyPropertiesCardWrapper } from "../AgentDashboardMyProperties";
import AgentMyPropertiesCard from "./AgentMyPropertiesCard";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";

interface AgentMyPropertiesContentType {
  agentMyProperties: CommonPropertyResults<AgentMyProperties>;
  agentMyPropertiesInput: CommonInput;
  setAgentMyPropertiesInput: SetStateType<CommonInput>;
}

const AgentMyPropertiesContent: React.FC<AgentMyPropertiesContentType> =
  React.memo(
    ({
      agentMyProperties,
      agentMyPropertiesInput,
      setAgentMyPropertiesInput,
    }) => {
      return (
        <>
          {agentMyProperties?.properties?.length ? (
            <div className="flex-1 flex flex-col justify-between">
              <div
                className={`${agentMyPropertiesCardWrapper} bg-white py-2 px-3 rounded-md`}
              >
                <h5 className="font-jostFont font-semibold text-lg mt-4">
                  My Properties
                </h5>
                {agentMyProperties?.properties.map(
                  (property: AgentMyProperties) => (
                    <AgentMyPropertiesCard
                      property={property}
                      key={property._id}
                    />
                  )
                )}
              </div>
              <PaginationCom
                totalPages={Math.ceil(
                  (agentMyProperties.totalPropertiesNumber[0]?.total ?? 0) /
                    agentMyPropertiesInput.limit
                )}
                styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
                currentPage={agentMyPropertiesInput.page}
                onPageChange={setAgentMyPropertiesInput}
              />
            </div>
          ) : (
            <NoFound title="No properties found" />
          )}
        </>
      );
    }
  );

export default AgentMyPropertiesContent;
