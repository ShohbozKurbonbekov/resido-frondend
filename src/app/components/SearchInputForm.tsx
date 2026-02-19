import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import React, { useCallback, useState } from "react";

interface SearchInputFormType {
  placeholderInput?: string;
  setAgenciesSearchInput: (searchInput: string) => void;
}
const SearchInputForm: React.FC<SearchInputFormType> = React.memo(
  ({ placeholderInput = "Search by location", setAgenciesSearchInput }) => {
    const [searchInput, setSearchInput] = useState<string>("");

    // --------------------------------------- HANDLERS -------------------------------
    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAgenciesSearchInput(searchInput.trim());
      },
      [searchInput, setAgenciesSearchInput],
    );
    return (
      <form
        className="flex flex-col md:items-center items-stretch md:flex-row gap-y-2  p-2.5 rounded-md bg-white shadow-agentSearchForm mb-10 relative -mt-7 max-w-screen-lg w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="md:flex-1 flex flex-row items-center  px-1 gap-1">
          <MapPin className="stroke-sky-300 h-5 w-5" />
          <Input
            type="text"
            className="border-0 bg-transparent py-2 pe-6  text-base text-gray-800  shadow-none  flex-1  focus-visible:ring-emerald-600 font-jostFont  placeholder:text-gray-600"
            placeholder={placeholderInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className=" bg-darkBlue text-white  rounded-md cursor-pointer py-2.5 px-10  transition-all duration-200 ease-in box-border active:shadow-[0_0_0_0.25rem_rgba(66,70,73,0.5)] font-base font-jostFont"
        >
          Search
        </button>
      </form>
    );
  },
);

export default SearchInputForm;
