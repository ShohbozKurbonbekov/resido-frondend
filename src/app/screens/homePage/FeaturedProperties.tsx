import { Link } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import { useState } from "react";
import NoFound from "@/app/components/NoFound";

export default function featuredProperties() {
  const [featuredProperties, setFeaturedProperties] = useState<number[]>([
    1, 2, 3, 4,
  ]);
  return (
    <section className="featuredProperties flex flex-row justify-center py-20 bg-slate-200">
      <div className="container flex-col gap-12 items-center">
        {/* section header */}
        <div className="section-heading max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue mb-12 mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-[1.2] text-3xl">
            Featured Property For Sale
          </h2>
          <p className="mb-2 leading-[1.7] text-center">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
        </div>

        {featuredProperties.length ? (
          <>
            {/* section cards */}
            <div className="pt-0 mt-0 grid grid-cols-1  lg:grid-cols-2 justify-items-center items-center gap-4">
              {featuredProperties.map((_, index: number) => {
                return <FeaturedCard key={index} />;
              })}
            </div>
            <div className="w-full flex flex-row justify-center items-center mt-10">
              <Link to="/featuredProperties">
                <button className="py-2 px-10 bg-blue-800 text-slate-50 font-jostFont font-sm rounded capitalize hover:opacity-70 transition-all ">
                  Browse More Properties
                </button>
              </Link>
            </div>
          </>
        ) : (
          <NoFound title="no featured properties found !" borderColor="#fff" />
        )}
      </div>
    </section>
  );
}
