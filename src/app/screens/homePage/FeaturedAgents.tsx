import { useState } from "react";
import NoFound from "@/app/components/NoFound";
import { Link } from "react-router-dom";
import AgentCard from "./FeaturedAgent";
import type { Agent } from "@/lib/type/agent";

export default function FeaturedAgents() {
  const [newAgents] = useState<Agent[]>([
    {
      agentImage: "/img/user-3.jpg",
      agentName: "James N. Green",
      agentProperties: 117,
      agentPhone: "1234567859",
      agentRating: 4,
      agentReviews: 42,
    },
    {
      agentImage: "/img/user-4.jpg",
      agentName: "Seema Gauranki",
      agentProperties: 20,
      agentPhone: "235923598727385",
      agentRating: 1,
      agentReviews: 334,
    },
    {
      agentImage: "/img/user-6.jpg",
      agentName: "Adam Walcorn",
      agentProperties: 38,
      agentPhone: "23895235",
      agentRating: 3,
      agentReviews: 16,
    },
    {
      agentImage: "/img/user-1.jpg",
      agentName: "Jasmin Khatri",
      agentProperties: 51,
      agentPhone: "235283957",
      agentRating: 2,
      agentReviews: 51,
    },
  ]);
  return (
    <section className="featured-agents py-20 flex flex-row justify-center">
      <div className="container flex flex-col gap-10">
        <div className="section-heading max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-[1.2] text-3xl">
            Explore Featured Agents
          </h2>
          <p className="mb-2 leading-[1.7] text-center">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
        </div>
        {!newAgents.length ? (
          <NoFound title="no featured Agents found !" />
        ) : (
          <>
            <div className="agents-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {newAgents.map((agent) => {
                return <AgentCard agent={agent} />;
              })}
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <Link to="/featuredProperties">
                <button className="py-2 px-10 bg-blue-800 text-slate-50 font-jostFont font-sm rounded capitalize hover:opacity-70 transition-all ">
                  Browse More Properties
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
