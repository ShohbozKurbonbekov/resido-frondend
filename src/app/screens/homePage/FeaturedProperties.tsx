import { Link } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import NoFound from "@/app/components/NoFound";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFeaturedProperties } from "./selector";
import type { Property } from "@/lib/type/property";
import { serverAPI } from "@/lib/config";

// -------------------- REDUX SELECTOR --------------------
const featuredPropertiesRetriever = createSelector(
  retrieveFeaturedProperties,
  (featuredProperties) => ({ featuredProperties })
);

// -------------------- COMPONENT --------------------
export default function FeaturedProperties() {
  const { featuredProperties } = useSelector(featuredPropertiesRetriever);

  // -------------------- RENDER --------------------
  return (
    <section className="flex flex-row justify-center py-20 bg-slate-200">
      <div className="container flex-col gap-12 items-center">
        <div className="max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue mb-12 mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-tight text-3xl">
            Featured Property For Sale
          </h2>
          <p className="mb-2 leading-onePointEight text-center">
            Discover our handpicked selection of premium properties available
            for sale. Each listing is carefully chosen to offer the best in
            comfort, design, and value.
          </p>
        </div>

        {featuredProperties.properties.length ? (
          <>
            {/* section cards */}
            <div className="pt-0 mt-0 grid grid-cols-1  lg:grid-cols-2 justify-items-center items-center gap-4">
              {featuredProperties.properties.map((property: Property) => {
                return <FeaturedCard property={property} />;
              })}
            </div>
            <div className="w-full flex flex-row justify-center items-center mt-10">
              <Link to={`/property/getAll`}>
                <button className="py-2 px-10 bg-blue-800 text-slate-50 font-jostFont font-sm rounded capitalize hover:opacity-70 transition-all">
                  Browse More Properties
                </button>
              </Link>
            </div>
          </>
        ) : (
          <NoFound />
        )}
      </div>
    </section>
  );
}
