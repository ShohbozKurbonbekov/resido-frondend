import { useCallback, useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import NoFound from "@/app/components/NoFound";
import AgentCard from "../../components/Cards/AgentCard";
import SectionIntroductionBackground from "@/app/components/SectionIntroductionBackground";
import type { Dispatch } from "@reduxjs/toolkit";
import type { AgentData, AgentsListPage } from "@/lib/type/agent";
import { setAgentsListPage } from "./slice";
import { createSelector } from "reselect";
import { retrieveAgentsListPage } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import type { SellersSearchInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AgentService from "@/app/services/Agent.service";
import { PaginationCom } from "@/app/components/PaginationCom";
import { Input } from "@/components/ui/input";

// ----------------------------------------- REDUX INTEGRATION ------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setAgentsList: (data: AgentsListPage) => dispatch(setAgentsListPage(data)),
});

const agentsListRetriever = createSelector(
  retrieveAgentsListPage,
  (agentsList) => ({ agentsList }),
);

// ------------------------------------------ COMPONENT -------------------------------------
export default function AgentsList() {
  const { setAgentsList } = actionDispatch(useDispatch());
  const { agentsList } = useSelector(agentsListRetriever);
  const { agents, totalNumbers } = agentsList;
  const [agentLocation, setAgentLocation] = useState<string>("");
  const [searchInput, setSearchInput] = useState<SellersSearchInput>({
    page: 1,
    limit: 8,
    // location: "",
  });

  // ------------------------------------- FETCHING DB DATA -------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const agent = new AgentService();
        const result = await agent.getAgentByLocation(searchInput);

        setAgentsList(result);
      } catch (error) {
        console.log("Error in fetching agentsList data from db: ", error);
        sweetErrorHandling(error!);
      }
    };
    fetchData();
  }, [searchInput]);

  // -------------------------------------- HANDLERS ---------------------------------------
  const handleLocation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setAgentLocation(input);
    },
    [],
  );

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearchInput((prev) => ({ ...prev, location: agentLocation.trim() }));
    },
    [agentLocation],
  );

  const totalPages = useMemo(() => {
    return Math.ceil((totalNumbers[0]?.total ?? 0) / searchInput.limit);
  }, [totalNumbers, searchInput.limit]);

  return (
    <>
      <SectionIntroductionBackground
        title="All Agents"
        subtitle="Lists of all expert agents"
      />
      <section className="bg-sky-100">
        <div className="container">
          {/* // Searching Input Element for the agents list */}
          <form
            className="flex flex-col md:items-center items-stretch md:flex-row gap-y-2  p-2.5 rounded-md bg-white shadow-agentSearchForm mb-10 relative -mt-8 max-w-screen-lg w-full mx-auto 
            "
            onSubmit={handleSearch}
          >
            <div className="md:flex-1 flex flex-row items-center  px-1 gap-1">
              <MapPin className="stroke-sky-300 h-5 w-5" />
              <Input
                type="text"
                className="border-0 bg-transparent py-2 pe-6  text-base text-gray-800  shadow-none focus-visible:ring-emerald-600 flex-1  font-jostFont   placeholder:text-gray-600"
                autoFocus
                placeholder="Search by a location"
                value={agentLocation}
                onChange={handleLocation}
              />
            </div>
            <button
              type="submit"
              className=" bg-darkBlue text-white  rounded-md cursor-pointer py-2.5 px-10  transition-all duration-200 ease-in box-border active:shadow-[0_0_0_0.25rem_rgba(66,70,73,0.5)] font-base font-jostFont "
            >
              Search
            </button>
          </form>

          {(totalNumbers[0]?.total ?? 0) ? (
            <>
              <div className="agents-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10  pt-5">
                {agents.map((agent: AgentData) => (
                  <AgentCard agent={agent} key={agent._id} />
                ))}
              </div>

              <PaginationCom
                styleclasses="flex flex-row pb-5 gap-3 justify-center items-center"
                totalPages={totalPages}
                currentPage={searchInput.page}
                onPageChange={setSearchInput}
              />
            </>
          ) : (
            <NoFound />
          )}
          {/* // Agents list */}
        </div>
      </section>
    </>
  );
}
