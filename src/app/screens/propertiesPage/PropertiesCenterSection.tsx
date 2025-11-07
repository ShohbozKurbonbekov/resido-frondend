import { Flashlight } from "lucide-react";
import NoFound from "@/app/components/NoFound";
import PropertiesCard from "./PropertiesCard";
import type {
  Properties,
  PropertiesSearchInput,
  Property,
} from "@/lib/type/property";
import type { SetStateType } from "@/lib/type/common";
import SideBarCom from "@/app/components/SideBarCom";
import Divider from "@/app/components/Divider";
import PropertiesFilterPanel from "./PropertiesFilterPanel";
import { PaginationCom } from "@/app/components/PaginationCom";

//------------------------- COMPONENT -------------------
interface PropertiesCenterSectionType {
  propertiesData: Properties;
  setPropertiesSearch: SetStateType<PropertiesSearchInput>;
  propertiesSearch: PropertiesSearchInput;
}

const PropertiesCenterSection: React.FC<PropertiesCenterSectionType> = ({
  propertiesData,
  propertiesSearch,
  setPropertiesSearch,
}) => {
  const { page } = propertiesSearch;

  //--------------------------------------- RENDERS -----------------------------

  return (
    <section className="px-6 pb-3 bg-sky-100">
      <div className="container px-0 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="hidden md:block md:columns-1 border-2  rounded-sm p-6 bg-white ">
          <PropertiesFilterPanel
            propertiesSearch={propertiesSearch}
            setPropertiesSearch={setPropertiesSearch}
          />
        </div>
        {/*-------------------------------  SIDE BAR COMPONENT ------------------------------ */}
        <div className="w-full block md:hidden">
          <SideBarCom
            triggeredBtn={
              <button className="w-full py-3  bg-darkBlue text-white text-sm rounded-md font-jostFont hover:bg-blue-800 transition-colors duration-100 ease-in outline-none focus-visible:ring-0 flex flex-row item-center justify-center gap-2 shadow-[0_0_0_2px_rgba(135,206,235,0.8)] capitalize">
                <Flashlight />
                Open Filter option
              </button>
            }
            headerTitle={"Close Filter"}
            renderedContent={
              <PropertiesFilterPanel
                propertiesSearch={propertiesSearch}
                setPropertiesSearch={setPropertiesSearch}
              />
            }
            headerDecription={
              <Divider
                height="2px"
                bgColor="rgba(0,0,0,0.4)"
                width="100%"
                marginTop="10px"
              />
            }
          />
        </div>

        <div className="md:col-span-2 bg-sky-100 rounded-sm pb-5">
          {propertiesData?.properties.length ? (
            <>
              <div className="flex flex-col gap-y-4 min-h-screen">
                {propertiesData.properties.map((property: Property) => (
                  <PropertiesCard key={property._id} property={property} />
                ))}
              </div>

              {/* // pagination */}
              <PaginationCom
                totalPages={Math.ceil(
                  (propertiesData.totalPropertiesNumber[0].total || 0) /
                    propertiesSearch.limit
                )}
                currentPage={page}
                onPageChange={setPropertiesSearch}
                styleclasses="flex flex-row mt-5 w-full items-center justify-center gap-2 overflow-hidden py-1"
              />
            </>
          ) : (
            <NoFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertiesCenterSection;
