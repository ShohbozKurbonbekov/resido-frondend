import type { AgentProperties, AgentPropertiesInput } from "@/lib/type/agent";
import type { Dispatch } from "@reduxjs/toolkit";
import { setChosenAgentProperties } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenAgentProperties } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AgentService from "@/app/services/Agent.service";
import { AgentPropertyType } from "@/lib/enums/agent.enum";
import NoFound from "@/app/components/NoFound";
import PropertyCard from "@/app/components/PropertyCard";
import { PaginationCom } from "@/app/components/PaginationCom";

const inputClasses = "text-slate-500 font-jostFont text-base ";
// ----------------------------------------- REDUX INTEGRATION ------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenAgentProperties: (data: AgentProperties) =>
    dispatch(setChosenAgentProperties(data)),
});

const chosenAgentPropertiesRetriever = createSelector(
  retrieveChosenAgentProperties,
  (chosenAgentProperties) => ({ chosenAgentProperties }),
);

// ------------------------------------------ COMPONENT ----------------------------------------
const AgentProperties: React.FC = () => {
  const { setChosenAgentProperties } = actionDispatch(useDispatch());
  const {
    chosenAgentProperties: { agent },
  } = useSelector(chosenAgentPropertiesRetriever);
  const { agentId } = useParams();

  const [agentPropertiesInput, setAgentPropertiesInput] =
    useState<AgentPropertiesInput>({
      page: 1,
      limit: 6,
      agentPropertyType: AgentPropertyType.NONE,
    });

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // AGENT PROPERTIES DATA
        const agent = new AgentService();
        const result = await agent.getAgentProperties(
          agentId!,
          agentPropertiesInput,
        );
        setChosenAgentProperties(result);
      } catch (error) {
        console.log("Error in fetching agentProperties: ", error);
        await sweetErrorHandling(error!);
      }
    };
    fetchData();
  }, [agentId, agentPropertiesInput]);

  const propertiesList = useMemo(() => {
    if (agent[0]?.limitedProperties) {
      return agent[0].limitedProperties.map((card) => (
        <PropertyCard property={card} key={card._id} />
      ));
    }
  }, [agent]);

  // -------------------------------------- HANLDERS ----------------------------------------
  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setAgentPropertiesInput((prev) => ({
        ...prev,
        searchLocation: query.trim(),
      }));
    },
    [query],
  );
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
  }, []);

  const handleSelect = useCallback((value: AgentPropertyType) => {
    setAgentPropertiesInput((prev) => ({ ...prev, agentPropertyType: value }));
  }, []);
  return (
    <>
      <SectionIntroNoBackground
        title={agent[0]?.fullName || "Agent"}
        subtitle="All Properties"
      />
      <div className="container mx-auto py-10">
        {/*SEARCH FORM*/}
        <form
          onSubmit={handleSearch}
          className="lg:max-w-screen-lg flex flex-col  items-stretch md:flex-row md:items-center gap-4 p-6 md:p-10 bg-white shadow-addAgentForm rounded-lg mx-auto"
        >
          {/* Search input */}
          <input
            placeholder="Search by place name..."
            value={query}
            onChange={handleInput}
            className={`flex-1 border-blue-400 border rounded-md py-2 px-5   focus:ring-0 outline-none  ${inputClasses}`}
            autoFocus
          />

          {/* Select input */}
          <Select
            value={agentPropertiesInput.agentPropertyType}
            onValueChange={(value: AgentPropertyType) => handleSelect(value)}
          >
            <SelectTrigger
              className={`max-w-52 focus:ring-blue-400 py-5 ${inputClasses} focus:outline-none focus:ring-0 border-blue-400 mx-auto`}
            >
              <SelectValue placeholder={AgentPropertyType.NONE} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={AgentPropertyType.SALE}
                className={inputClasses}
              >
                Sale
              </SelectItem>
              <SelectItem
                value={AgentPropertyType.RENT}
                className={inputClasses}
              >
                Rent
              </SelectItem>
              <SelectItem
                value={AgentPropertyType.NONE}
                className={inputClasses}
              >
                All
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Search button */}
          <Button
            type="submit"
            className="mt-2 md:mt-0 bg-blue-400 py-5 hover:bg-blue-700 transition-all ease-linear duration-200 active:scale-95"
          >
            Search
          </Button>
        </form>

        {/*ALL AGENT PROPERTIES*/}
        {agent[0]?.limitedProperties?.length ? (
          <div className="py-10 grid grid-cols-1 max-w-[500px] mx-auto md:grid-cols-2 md:max-w-full  gap-5 lg:grid-cols-3">
            {propertiesList}
          </div>
        ) : (
          <NoFound />
        )}

        {/*PAGINATION*/}
        {agent[0]?.limitedProperties?.length ? (
          <PaginationCom
            totalPages={Math.ceil(
              agent[0]?.totalProperties / agentPropertiesInput.limit,
            )}
            currentPage={agentPropertiesInput.page}
            styleclasses="flex flex-row items-center justify-center gap-3"
            onPageChange={setAgentPropertiesInput}
          />
        ) : null}
      </div>
    </>
  );
};

export default AgentProperties;
