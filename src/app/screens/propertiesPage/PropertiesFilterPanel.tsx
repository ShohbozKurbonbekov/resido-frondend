import { BadgeCheck, CircleX, Search, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AccordionCom from "@/app/components/AccordionCom";
import {
  ameneties,
  bedrooms,
  cityList,
  mood,
  propertyType,
} from "@/app/data/properties";
import AccordionPriceAndAmenetiesCom from "./AccordionPriceAndAmenetiesCom";
import AccordionPriceAndAmenitiesCom from "./AccordionPriceAndAmenetiesCom";
import { usePropertiesFilter } from "@/app/hooks/usePropertiesFilter";
import type { PropertiesSearchInput } from "@/lib/type/property";
import type { SetStateType } from "@/lib/type/common";

// ------------------------------- COMPONENT ----------------------------------
interface PropertiesFilterPanelType {
  setPropertiesSearch: SetStateType<PropertiesSearchInput>;
  propertiesSearch: PropertiesSearchInput;
}

const PropertiesFilterPanel: React.FC<PropertiesFilterPanelType> = ({
  propertiesSearch,
  setPropertiesSearch,
}) => {
  // CUSTOM HOOK
  const {
    handleClearInput,
    handleInput,
    handleSwitch,
    propertiesFilter,
    handleAddKeys,
    handlePrice,
    handleAmenitites,
  } = usePropertiesFilter({
    propertySearch: "",
    propertyVerified: false,
    propertyAgentLevel: false,
    propertyLocation: "",
    propertyType: "",
    propertyBedrooms: "",
    propertyPriceRange: { min: "", max: "" },
    propertyMood: "",
    propertyAmenities: {},
  });

  // ------------------------------ HANDLERS ------------------------------------
  const searchBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const start: number = Number(propertiesFilter.propertyPriceRange?.min || 0);
    const end: number = Number(propertiesFilter.propertyPriceRange?.max) || 0;

    const updated: PropertiesSearchInput = {
      ...propertiesSearch,
      search: {
        propertySearch: propertiesFilter.propertySearch.trim(),
        propertyVerified: propertiesFilter.propertyVerified,
        propertyAgentLevel: propertiesFilter.propertyAgentLevel
          ? "superAgent"
          : null,
        propertyLocation: propertiesFilter.propertyLocation,
        propertyType: propertiesFilter.propertyType,
        propertyBedrooms: parseInt(propertiesFilter.propertyBedrooms) || 0, // 1 - 2 - 3 - 4 - 5 - 6
        propertyAmenities: Object.keys(propertiesFilter.propertyAmenities)
          .length
          ? propertiesFilter.propertyAmenities
          : null,
        propertyMood: propertiesFilter.propertyMood,
        propertyPriceRange: start >= 0 && end ? { start, end } : null,
      },
    };
    setPropertiesSearch((prev) => ({ ...prev, ...updated }));
  };
  // ------------------------------- RENDER -------------------------------------------
  return (
    <div className="w-full">
      <form className="flex flex-col gap-y-3">
        {/* --------------------- INPUT SEARCH ELEMENT------------------ */}
        <div className="w-full border-2  py-1 px-2 bg-sky-50 flex flex-row  items-center gap-2 text-sm rounded-sm ">
          <Search className="text-sky-600 self-center" />
          <Input
            className="flex-1 text-slate-400 font-semibold font-jostFont border-none shadow-none outline-none focus-visible:ring-0 border-2 placeholder:text-size_10 ps-0 placeholder:text-slate-400"
            name="searchInput"
            placeholder="Search By Name"
            value={propertiesFilter?.propertySearch}
            onChange={handleInput}
          />
          <CircleX
            className="text-slate-400   hover:text-slate-500 text-size_10 transition-colors duration-200"
            onClick={handleClearInput}
          />
        </div>
        {/*-------------------- VERIFIED  SWITCH INPUT --------------------- */}
        <div className="w-full border-2  py-3  px-2 bg-white flex flex-row  items-center space-x-1 text-sm rounded-sm">
          <div className="flex-1 text-start flex flex-row space-x-2 items-center">
            <ShieldCheck className="h-6 w-6" fill="green" stroke="white" />
            <span className="text-size_10 tracking-wide font-bold text-slate-400">
              Verified
            </span>
          </div>
          <Switch
            checked={propertiesFilter?.propertyVerified}
            onCheckedChange={(checked) => handleSwitch(checked, "isVerified")}
            className=" data-[state=checked]:bg-green-500 bg-gray-300 data-[state=checked]:shadow-switchCheckedShadow"
            name="verifiedInput"
          />
        </div>
        {/*---------------------  SUPERAGENT SWITCH INPUT ---------------------- */}
        <div className="w-full border-2  py-3  px-2 bg-white flex flex-row  items-center space-x-1 text-sm rounded-sm">
          <div className="flex-1 text-start flex flex-row space-x-2 items-center">
            <BadgeCheck className="h-6 w-6" fill="yellow" stroke="white" />
            <span className="text-size_10 tracking-wide font-bold text-slate-400">
              SuperAgent
            </span>
          </div>
          <Switch
            className=" data-[state=checked]:bg-green-500 bg-gray-300 data-[state=checked]:shadow-switchCheckedShadow"
            name="superAgent"
            checked={propertiesFilter.propertyAgentLevel}
            onCheckedChange={(checked) => handleSwitch(checked, "isSuperAgent")}
          />
        </div>

        {/*---------------------------- LOCATION OPTION  ---------------------- */}
        <AccordionCom
          valueKey="propertyLocation"
          data={cityList}
          selected={propertiesFilter.propertyLocation}
          setSelected={handleAddKeys}
        />

        {/*---------------------- PROPERTY TYPE OPTION ------------------------------------*/}
        <AccordionCom
          valueKey="propertyType"
          title="Property types"
          data={propertyType}
          selected={propertiesFilter.propertyType}
          setSelected={handleAddKeys}
        />

        {/*------------------------ BEDROOMS------------------*/}
        <AccordionCom
          valueKey="propertyBedrooms"
          title="Bedrooms"
          data={bedrooms}
          selected={propertiesFilter.propertyBedrooms}
          setSelected={handleAddKeys}
        />

        {/*---------------------------- PROPERTY PRICE OPTION----------------------- */}
        <AccordionPriceAndAmenetiesCom
          valueKey="propertyPriceRange"
          type={"price"}
          title="Price Range"
          setSelected={handlePrice}
          data={propertiesFilter.propertyPriceRange}
          selected={""}
        />

        {/* --------------------------- PROPERTY MOOD OPTION---------------------- */}
        <AccordionCom
          title="Mood"
          data={mood}
          selected={propertiesFilter.propertyMood}
          setSelected={handleAddKeys}
          valueKey={"propertyMood"}
        />

        {/*---------------------------- PROPERTY AMENITES------------------------------- */}
        <AccordionPriceAndAmenitiesCom
          valueKey="propertyAmenities"
          type={"amenities"}
          title={"Amenities"}
          data={ameneties}
          selected={propertiesFilter.propertyAmenities}
          setSelected={handleAmenitites}
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white text-sm font-jostFont text-center rounded-md  py-3 mt-2 hover:bg-blue-500 transition-colors duration-75 ease-linear"
          onClick={searchBtnHandler}
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default PropertiesFilterPanel;
