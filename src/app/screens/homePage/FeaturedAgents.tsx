import { useState } from "react";
import FeaturedAgent from "./FeaturedAgent";
import NoFound from "@/app/components/NoFound";
import { Link } from "react-router-dom";

export default function FeaturedAgents() {
  const [newAgents, setNewAgents] = useState<number[]>([1, 2, 3, 4, 5, 6]);
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
              {newAgents.map((_, index: number) => {
                return <FeaturedAgent key={index} />;
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
