import type { AgentData } from "@/lib/type/agent";
import React, { useCallback, useMemo, useState } from "react";
import SellerInfo from "@/app/components/SellerInfo";
import NoFound from "@/app/components/NoFound";
import PropertyCard from "@/app/components/PropertyCard";
import type { Property } from "@/lib/type/property";
import { useNavigate } from "react-router-dom";

const agentPropertiesTypeBtn =
  "transition-all duration-300 capitalize text-sm font-bold ease-linear  rounded-md py-4 px-6 bg-blue-500 text-white hover:bg-blue-700";
const activeBtn = "bg-blue-900 shadow-pagesActiveButtons";
// ------------------------------------------- COMPONENT ----------------------------------------
interface AgentDetailMainContentProp {
  agent: AgentData;
}
const AgentDetailMainContent: React.FC<AgentDetailMainContentProp> = React.memo(
  ({ agent }) => {
    const [agentPropertyType, setPropertyType] = useState<{
      type: string | null;
    }>({
      type: "RENT",
    });

    const noProperties =
      !agent?.properties?.rent?.length || !agent?.properties?.sale?.length;
    const navigation = useNavigate();

    // ------------------------------------------- HANDLERS ----------------------------------------
    const propertiesList = useCallback((properties: Property[]) => {
      return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2  gap-5">
          {properties.slice(0, 4).map((property) => (
            <PropertyCard property={property} key={property._id} />
          ))}
        </div>
      );
    }, []);

    const handlePropertyTypeBtn = useCallback((str: string) => {
      setPropertyType(() => ({ type: str }));
    }, []);

    const handleClick = () => {
      navigation(`/agents/${agent._id}/properties`);
    };

    const returnTargetProperties = useMemo(() => {
      if (!agent?.properties?.rent?.length && !agent?.properties?.sale?.length)
        return null;

      if (
        agentPropertyType.type === "RENT" &&
        agent?.properties?.rent?.length
      ) {
        return propertiesList(agent.properties.rent);
      }

      if (agentPropertyType.type === "SALE" && agent?.properties?.sale) {
        return propertiesList(agent.properties.sale);
      }
      return null;
    }, [agent, agentPropertyType, propertiesList]);
    // ------------------------------------------- RENDERS ----------------------------------------

    return (
      <section className="bg-sky-100">
        <div className="container  pb-20 grid rid-cols-1 lg:grid-cols-6 gap-5 ">
          <div className="lg:col-span-4">
            {/* Agent Some Info */}
            <SellerInfo title={"Agent Information"} data={agent} />

            {/* Agent Properties */}

            <div className="mt-10  rounded-md bg-white flex flex-col">
              <div className="py-2 px-4 mb-4 border-b-2 border-slate-200">
                <button
                  className={`${agentPropertiesTypeBtn}   me-2.5 ${
                    agentPropertyType.type === "RENT" ? activeBtn : "scale-75"
                  }`}
                  onClick={() => handlePropertyTypeBtn("RENT")}
                  type="button"
                >
                  Rental
                </button>
                <button
                  className={`${agentPropertiesTypeBtn} ${
                    agentPropertyType.type === "SALE" ? activeBtn : "scale-75"
                  }`}
                  onClick={() => handlePropertyTypeBtn("SALE")}
                  type="button"
                >
                  for sale
                </button>
              </div>
              {returnTargetProperties ? returnTargetProperties : <NoFound />}

              {!noProperties && (
                <div className="mx-auto">
                  <button
                    className="py-2.5 px-12 bg-blue-800 text-white hover:bg-blue-500 rounded-md border-0 transition-all duration-300 ease-linear cursor-pointer text-base capitalize mt-5 mb-6"
                    type="button"
                    onClick={handleClick}
                  >
                    Browse More Properties
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* <div className="lg:col-span-2">
            <AgentContact
              agentImage={agent.agentImage}
              agentName={agentName}
              agentPhone={agentPhone}
            />

            <PropertyDetailFeaturedProperty
              featuredProperty={featuredProperty}
            />
          </div> */}
        </div>
      </section>
    );
  }
);

export default AgentDetailMainContent;
