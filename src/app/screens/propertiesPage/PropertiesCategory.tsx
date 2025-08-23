import { Input } from "@/components/ui/input";
import { BadgeCheck, CircleX, Search, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Accordion } from "@/components/ui/accordion";
import AccordionItemCom from "@/app/components/AccordtionItem";
import { useState } from "react";

interface CategoriesType {
  itemTitle: string;
  itemSubtitle: string;
  itemNameAttribute: string;
  itemData: string[];
}

const categoriesData: CategoriesType[] = [
  {
    itemTitle: "where",
    itemSubtitle: "Chicogo",
    itemNameAttribute: "locationInput",
    itemData: [
      "Atlanta",
      "Chicago",
      "Denvar",
      "Dallas",
      "Housten",
      "JacksonWile",
      "Austin",
    ],
  },
  {
    itemTitle: "Property types",
    itemSubtitle: "Apartment",
    itemNameAttribute: "propertyTypeInput",
    itemData: [
      "House",
      "Office Desk",
      "Villa",
      "Apartment",
      "Condo",
      "Denver",
      "Studio",
    ],
  },
  {
    itemTitle: "Bedrooms",
    itemSubtitle: "2 Beds",
    itemNameAttribute: "bedroomQuantityInput",
    itemData: [
      "01 Bedroom",
      "02 Bedroom",
      "03 Bedroom",
      "04 Bedroom",
      "05 Bedroom",
      "06+ Bedroom",
    ],
  },
  {
    itemTitle: "Price range",
    itemSubtitle: "$10,000 - $15,000",
    itemNameAttribute: "priceInput",
    itemData: [
      "Less Then $10,000",
      "$10,000 - $15,000",
      "$12,000 - $25,000",
      "$30,000 - $35,000",
      "$40,000 - $45,000",
      "$50,000 - $55,000",
      "$60,000 - $65,000",
    ],
  },
  {
    itemTitle: "Mood",
    itemSubtitle: "Any Mood",
    itemNameAttribute: "moodInput",
    itemData: [
      "Any Mood",
      "Professional",
      "Essentials",
      "Unique",
      "Lively",
      "Luxe",
    ],
  },
  {
    itemTitle: "ameneties",
    itemSubtitle: "ADA Compliant",
    itemNameAttribute: "amenetiesInput",
    itemData: [
      "ADA Compliant",
      "Parking Options",
      "Mother's Room",
      "Outdoor Space",
      "Pet Friendly",
      "Bike Parking",
      "Phone Line",
      "Private Areas",
      "Free WiFi",
      "Swiming Pool",
    ],
  },
];

export default function PropertiesCategory() {
  const [categoryText, setCategoryText] = useState<string>("");

  return (
    <div className="w-full">
      <form action="/properties" className="">
        {/* input element */}
        <div className="w-full border-2  py-1 px-2 bg-sky-100 flex flex-row  items-center gap-2 text-sm rounded-sm ">
          <Search className="text-sky-600 self-center " />
          <Input
            className="flex-[1_1_0%] text-slate-400 font-semibold font-jostFont border-none shadow-none outline-none focus-visible:ring-0 border-2 placeholder:text-xs ps-0 placeholder:text-slate-400"
            name="searchInput"
            placeholder="Search By Name"
            value={categoryText}
            onChange={(e): void => setCategoryText(e.target.value)}
          />
          <CircleX
            className="text-slate-400   hover:text-slate-500 text-size_10 transition-colors duration-100"
            onClick={() => setCategoryText("")}
          />
        </div>

        {/* // verified element */}
        <div className="w-full border-2  py-3  px-2 bg-white flex flex-row  items-center space-x-1 text-sm rounded-sm mt-3">
          <div className="flex-[1_1_0%] text-start flex flex-row space-x-2 items-center">
            <ShieldCheck className="text-green-600 h-5 w-5" />
            <span className="text-[10px] tracking-wide font-bold text-slate-400">
              Verified
            </span>
          </div>
          <Switch
            className=" data-[state=checked]:bg-green-500 bg-gray-300 data-[state=checked]:shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"
            name="verifiedInput"
          />
        </div>

        {/* superAgent element */}
        <div className="w-full border-2  py-3  px-2 bg-white flex flex-row  items-center space-x-1 text-sm rounded-sm mt-3">
          <div className="flex-[1_1_0%] text-start flex flex-row space-x-2 items-center">
            <BadgeCheck className="text-amber-300 h-5 w-5" />
            <span className="text-[10px] tracking-wide font-bold text-slate-400">
              SuperAgent
            </span>
          </div>
          <Switch
            className=" data-[state=checked]:bg-green-500 bg-gray-300 data-[state=checked]:shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"
            name="verifiedInput"
          />
        </div>

        {/* // options  */}
        <Accordion type="single" collapsible className="w-full" defaultValue="">
          {/* // location */}
          {categoriesData.map((data: CategoriesType, index: number) => (
            <AccordionItemCom
              key={index}
              accordionNumber={`${index + 1}`}
              accordionTitle={data.itemTitle}
              accordionSubtitle={data.itemSubtitle}
              accordionData={data.itemData}
              accordionNameAttribute={data.itemNameAttribute}
            />
          ))}
        </Accordion>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white text-sm font-jostFont text-center rounded-md  py-3 mt-2 hover:bg-blue-500 transition-colors duration-75 ease-linear"
        >
          Search
        </button>
      </form>
    </div>
  );
}
