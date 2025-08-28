import AgentContact from "@/app/components/AgentContact";
import AgentCard from "@/app/components/Cards/AgentCard";
import NoFound from "@/app/components/NoFound";
import PropertyCard from "@/app/components/PropertyCard";
import type { Agency } from "@/lib/type/agency";
import type { T } from "@/lib/type/common";
import { useNavigate } from "react-router-dom";
import PropertyDetailFeaturedProperty from "../../components/PropertyDetailFeaturedProperty";
import type { PropertyDetailFeaturedPropertyType } from "@/lib/type/property";
import SomeInfoSection from "@/app/components/someInfoSection";

interface AgencyDetailMainContentProp {
  agency: Agency;
  handleTab: (str: "agents" | "properties") => void;
  activeTab: string;
  featuredProperty: PropertyDetailFeaturedPropertyType[];
  agencyInfo:
    | T
    | {
        agentImage: string;
        agentName: string;
        agentProperties: number;
        agentPhone: string;
        agentRating: number;
        agentReviews: number;
      }[];
}

export default function AgencyDetailMainContent({
  agency,
  handleTab,
  activeTab,
  agencyInfo,
  featuredProperty,
}: AgencyDetailMainContentProp) {
  const navigation = useNavigate(); // For pushing into an url

  return (
    <section className="bg-sky-100">
      <div className="container  pb-20 grid grid-cols-1 lg:grid-cols-6 gap-5 ">
        <div className="lg:col-span-4">
          {/* Agent Some Info */}
          <SomeInfoSection
            title="Agency Info"
            extraFeature={
              <button
                type="button"
                className="list-none text-base text-white capitalize font-jostFont py-[10px] px-5 rounded-md bg-green-800 leading-tight hover:bg-green-700 active:scale-95 transition-all duration-300 ease-linear"
                onClick={() => {
                  navigation(
                    `/agents/become-an-agent?agencyId=${agency.agencyLocation}&agencyName=${agency.agencyName}`
                  );
                }}
              >
                Add New Agent
              </button>
            }
            data={{
              valName: agency.agencyName,
              valEmail: agency.agencySocialContacts.email,
              valPhone: agency.agencyPhone,
              valSkype: agency.agencySocialContacts.skype,
              valAddress: agency.agencyLocation,
              valCountry: agency.agencyCountry,
              valCity: agency.agencyCity,
              valMemberyear: agency.agencyMemberyear,
            }}
          />

          {/* Agent Properties */}

          <div className="mt-10  rounded-md bg-white flex flex-col">
            <div className="py-4 px-4 mb-4 border-s-0 border-t-0 border-e-0 border-2 border-slate-200 space-x-3">
              <button
                className={`rounded-md p-[17px_24px] bg-blue-950 capitalize text-[13px] font-bold  text-white hover:bg-blue-800 transition-all duration-300 ease-linear active:scale-95 me-[5px] ${
                  activeTab === "agents"
                    ? "scale-100 shadow-[0_0_2px_4px_rgba(0,0,0,0.2)]"
                    : "scale-95"
                }`}
                onClick={() => handleTab("agents")}
              >
                agents
              </button>
              <button
                className={`rounded-md p-[17px_24px] bg-green-700  capitalize text-[13px] font-bold  text-white hover:bg-green-500 transition-all duration-300 ease-linear active:scale-95 ${
                  activeTab === "properties"
                    ? "scale-100 shadow-[0_0_2px_4px_rgba(0,0,0,0.2)]"
                    : "scale-95 "
                }`}
                onClick={() => handleTab("properties")}
              >
                Property
              </button>
            </div>

            {/* No found  */}
            {activeTab === "agents" && !agencyInfo.length && (
              <NoFound title="No agents Found" />
            )}
            {activeTab === "properties" && !agencyInfo.length && (
              <NoFound title="No properties Found" />
            )}

            {/* Info  */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2  gap-5">
              {activeTab === "agents"
                ? agencyInfo.map(
                    (
                      agent: {
                        agentImage: string;
                        agentName: string;
                        agentProperties: number;
                        agentPhone: string;
                        agentRating: number;
                        agentReviews: number;
                      },
                      index: number
                    ) => <AgentCard key={index} agent={agent} />
                  )
                : agencyInfo.map((property: T, index: number) => (
                    <PropertyCard key={index} property={property} />
                  ))}
            </div>

            {/* // Button  */}
            {agencyInfo.length > 0 ? (
              <div className="mx-auto">
                <button
                  className="p-[10px_48px] bg-blue-800 text-white hover:bg-blue-500 rounded-md border-0 transition-all duration-300 ease-linear cursor-pointer text-base capitalize mt-5 mb-6"
                  type="button"
                >
                  {activeTab === "properties"
                    ? "Browse More Properties"
                    : "Browse More Agents"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="lg:col-span-2">
          <AgentContact
            agentImage={agency.agencyImage}
            agentName={agency.agencyName}
            agentPhone={agency.agencyPhone}
          />

          <PropertyDetailFeaturedProperty featuredProperty={featuredProperty} />
        </div>
      </div>
    </section>
  );
}
