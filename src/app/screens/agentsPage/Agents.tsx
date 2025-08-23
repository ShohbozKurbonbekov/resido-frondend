import { useState } from "react";
import { MapPin } from "lucide-react";
import type { Agent } from "@/lib/type/agent";
import NoFound from "@/app/components/NoFound";
import AgentCard from "../homePage/FeaturedAgent";

export default function AgentsList() {
  const [agentsList] = useState<Agent[]>([
    {
      agentImage: "/img/user-1.jpg",
      agentName: "James N. Green",
      agentProperties: 117,
      agentPhone: "02937582376",
      agentRating: 4,
      agentReviews: 42,
    },
    {
      agentImage: "/img/user-2.jpg",
      agentName: "Seema Gauranki",
      agentProperties: 46,
      agentPhone: "23598235",
      agentRating: 3,
      agentReviews: 46,
    },
    {
      agentImage: "/img/user-3.jpg",
      agentName: "Adam Walcorn",
      agentProperties: 38,
      agentPhone: "2379823578923",
      agentRating: 4,
      agentReviews: 16,
    },
    {
      agentImage: "/img/user-4.jpg",
      agentName: "Jasmin Khatri",
      agentProperties: 51,
      agentPhone: "238572375",
      agentRating: 5,
      agentReviews: 28,
    },
    {
      agentImage: "/img/user-5.jpg",
      agentName: "Rudra K. Mathan",
      agentProperties: 75,
      agentPhone: "9235987235",
      agentRating: 1,
      agentReviews: 75,
    },
    {
      agentImage: "/img/user-6.jpg",
      agentName: "Niharika Muthurk",
      agentProperties: 15,
      agentPhone: "83259817",
      agentRating: 5,
      agentReviews: 15,
    },
  ]);
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <>
      <section className="py-20 bg-blue-800 relative">
        {/* // background 1 */}
        <div className="absolute top-0 left-0 mt-6  w-[96px] h-[64px] bg-[#eff4fc] opacity-25 rounded-e-full"></div>
        {/* // background 2 */}
        <div className="absolute bottom-0 ms-6  w-[64px] h-[84px] bg-[#eff4fc] opacity-25 rounded-t-full"></div>

        {/* // background 3 */}
        <div className="absolute right-0 bottom-0 mb-6  w-[96px] h-[64px] bg-[#eff4fc] opacity-25 rounded-s-full"></div>

        {/* // background 4 */}
        <div className="absolute right-0 top-0 me-6  w-[64px] h-[84px] bg-[#eff4fc] opacity-25 rounded-b-full"></div>

        <div className="container">
          <div className="py-[30px] flex flex-col items-start gap-y-2">
            <h2 className="text-white font-bold font-jostFont leading-tight text-3xl">
              All Agents
            </h2>
            <p className="italic text-xl font-light text-slate-300 leading-none">
              Lists of our all export agents
            </p>
          </div>
        </div>
      </section>
      <section className="bg-sky-100">
        <div className="container">
          {/* // Searching Input Element for the agents list */}
          <form
            action="#"
            className="flex flex-col md:items-center items-stretch md:flex-row gap-y-1  p-[10px] rounded-md bg-white shadow-agentSearchForm mb-10 relative -mt-[30px] max-w-[1076px] w-full mx-auto
            "
          >
            <div className="md:flex-1 flex flex-row items-center  px-1 gap-1">
              <MapPin className="stroke-sky-300 h-[20px] w-[20px]" />
              <input
                type="text"
                className="border-0 bg-transparent py-2 pe-6  text-base text-slate-400  shadow-none focus:ring-0 focus:outline-0 flex-1  font-jostFont  font-semibold placeholder:text-slate-300"
                autoFocus
                placeholder="Search for a location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="button"
              className=" bg-darkBlue text-white  rounded-md cursor-pointer p-[10px_40px]  transition-all duration-200 ease-in box-border active:shadow-[0_0_0_0.25rem_rgba(66,70,73,0.5)] font-base font-jostFont "
            >
              Search
            </button>
          </form>

          {/* // Agents list */}
          <div className="agents-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10  pt-5">
            {!agentsList.length && <NoFound title={"No Agents Found"} />}
            {agentsList.map((agent: Agent) => (
              <AgentCard agent={agent} />
            ))}
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              type="button"
              className="bg-blue-800 text-white border-transparent cursor-pointer p-[10px_40px] hover:bg-blue-600 transition-all duration-200 ease-linear mb-14 rounded-md font-jostFont text-base"
            >
              Explore More Agents
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
