import type { Agent } from "@/lib/type/agent";
import type { T } from "@/lib/type/common";
import PropertyCard from "../../components/PropertyCard";
import AgentContact from "../../components/AgentContact";
import type { PropertyDetailFeaturedPropertyType } from "@/lib/type/property";
import PropertyDetailFeaturedProperty from "../../components/PropertyDetailFeaturedProperty";
import SomeInfoSection from "@/app/components/someInfoSection";

interface AgentDetailMainContentProp {
  agent: Agent;
  agentProperties: T[];
  featuredProperty: PropertyDetailFeaturedPropertyType[];
}

export default function AgentDetailMainContent({
  agent,
  agentProperties,
  featuredProperty,
}: AgentDetailMainContentProp) {
  const {
    agentPhone,
    agentLocation,
    agentCountry,
    agentContacts,
    agentCity,
    agentMemberYear,
    agentName,
  } = agent;

  const handleSaleProperties = (id: string): void => {
    // Searching Sale-related Properties with  the given id
    console.log(id);
  };

  const handleRentProperties = (id: string): void => {
    // Searching rent-related properties from the given id
    console.log(id);
  };

  return (
    <section className="bg-sky-100">
      <div className="container  pb-20 grid rid-cols-1 lg:grid-cols-6 gap-5 ">
        <div className="lg:col-span-4">
          {/* Agent Some Info */}
          <SomeInfoSection
            title={"Agent Info"}
            data={{
              valName: agentName,
              valEmail: agentContacts.email,
              valPhone: agentPhone,
              valSkype: agentContacts.skype,
              valAddress: agentLocation,
              valCountry: agentCountry,
              valCity: agentCity,
              valMemberyear: agentMemberYear,
            }}
          />

          {/* Agent Properties */}

          <div className="mt-10  rounded-md bg-white flex flex-col">
            <div className="py-2 px-4 mb-4 border-s-0 border-t-0 border-e-0 border-2 border-slate-200">
              <button
                className="rounded-md p-[17px_24px] bg-blue-950 capitalize text-[13px] font-bold  text-white hover:bg-blue-800 transition-all duration-300 ease-linear active:scale-95 me-[5px]"
                onClick={() => handleRentProperties("agentId:jjsbg84skd")}
                type="button"
              >
                Rental
              </button>
              <button
                className="rounded-md p-[17px_24px] bg-green-700  capitalize text-[13px] font-bold  text-white hover:bg-green-500 transition-all duration-300 ease-linear active:scale-95"
                onClick={() => handleSaleProperties("agentId:230752385wf")}
                type="button"
              >
                for sale
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2  gap-5">
              {agentProperties.map((property: T, index: number) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
            {/* // Button  */}
            <div className="mx-auto">
              <button
                className="p-[10px_48px] bg-blue-800 text-white hover:bg-blue-500 rounded-md border-0 transition-all duration-300 ease-linear cursor-pointer text-base capitalize mt-5 mb-6"
                type="button"
              >
                Browse More Properties
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <AgentContact
            agentImage={agent.agentImage}
            agentName={agentName}
            agentPhone={agentPhone}
          />

          <PropertyDetailFeaturedProperty featuredProperty={featuredProperty} />
        </div>
      </div>
    </section>
  );
}
