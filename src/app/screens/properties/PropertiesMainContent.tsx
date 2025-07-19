import { Flashlight } from "lucide-react";
import PropertiesCategory from "./PropertiesCategory";
import SideBarCom from "../../components/SideBar";

import Divider from "@/app/components/Divider";
import { useState } from "react";
import NoFound from "@/app/components/NoFound";
import PropertiesCard from "./PropertiesCard";

export default function PropertiesMainContent() {
  const [properties, setProperties] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  return (
    <section className="properties px-6 pb-3 bg-sky-100">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 items-start px-0 bg-sky-100">
        <div className="hidden md:block md:columns-1 border-2  rounded-sm p-[25px] bg-white ">
          <PropertiesCategory />
        </div>

        <div className="w-full block md:hidden">
          <SideBarCom
            triggeredBtn={
              <button className="w-full py-5 text-center bg-darkBlue text-white text-sm rounded-md font-jostFont hover:bg-blue-800 transition-colors duration-100 ease-in outline-none focus-visible:ring-0 flex flex-row item-center justify-center gap-2 shadow-[0_0_0_2px_rgba(135,206,235,0.8)] capitalize">
                <Flashlight />
                Open Filter option
              </button>
            }
            headerTitle={"Close Filter"}
            renderedContent={<PropertiesCategory />}
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
          {properties.length ? (
            <div className="flex flex-col space-y-4">
              {properties.map((el: number) => (
                <PropertiesCard key={el} />
              ))}
            </div>
          ) : (
            <NoFound title="No Properties Found !" borderColor="transparent" />
          )}
        </div>
      </div>
    </section>
  );
}
