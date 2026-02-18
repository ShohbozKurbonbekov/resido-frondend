import NoFound from "@/app/components/NoFound";
import { Link } from "react-router-dom";
import AgentCard from "../../components/Cards/AgentCard";
import type { AgentData } from "@/lib/type/agent";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFeaturedAgents } from "./selector";

// ------------------------------ REDUX SELECTOR -----------------------------
const featuredAgentsRetriever = createSelector(
  retrieveFeaturedAgents,
  (featuredAgents) => ({ featuredAgents }),
);

// ------------------------------- COMPONENT -----------------------------
export default function FeaturedAgents() {
  const { featuredAgents } = useSelector(featuredAgentsRetriever);

  // ------------------------------ RENDER -----------------------------

  return (
    <section className="py-20 flex flex-row justify-center">
      <div className="container flex flex-col gap-10">
        <div className="max-w-lg flex flex-col items-center gap-y-2 text-darkBlue mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-tight text-3xl text-center">
            Explore Featured Agents
          </h2>
          <p className="mb-2 leading-onePointEight text-center">
            Meet our top-rated real estate agents, carefully selected for their
            experience, dedication, and proven success in helping clients find
            their perfect properties.
          </p>
        </div>
        {!featuredAgents.agents.length ? (
          <NoFound />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredAgents.agents.map((agent: AgentData) => (
                <AgentCard agent={agent} />
              ))}
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <Link to={`/agents`}>
                <button className="py-2 px-10 bg-blue-800 text-slate-50 font-jostFont font-sm rounded capitalize hover:opacity-70 transition-all ">
                  Browse More Agents
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
