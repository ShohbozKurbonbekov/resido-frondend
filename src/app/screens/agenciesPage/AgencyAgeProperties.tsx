import DetailPageLoading from "@/app/components/loading/DetailPageLoading";
import type { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setChosenAgencyTargetItems } from "./slice";
import type {
  AgencyAgePropertiesInput,
  ChosenAgencyTargetItemsType,
} from "@/lib/type/agency";
import { createSelector } from "reselect";
import { retrieveChosenAgencyTargetItems } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import AgencyService from "@/app/services/AgencyService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { AgencyTargetType } from "@/lib/enums/agency.enum";
import { useParams } from "react-router-dom";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AgentCard from "@/app/components/Cards/AgentCard";
import PropertyCard from "@/app/components/PropertyCard";
import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
const inputClasses = "text-slate-500 font-jostFont text-base ";

// -------------------------------- REDUX INTEGRATION ----------------
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenAgencyTargetItems: (data: ChosenAgencyTargetItemsType) =>
    dispatch(setChosenAgencyTargetItems(data)),
});

const chosenAgencyTargetItemsRetriever = createSelector(
  retrieveChosenAgencyTargetItems,
  (chosenAgencyTargetItems) => ({ chosenAgencyTargetItems })
);

export default function AgencyAgeProperties() {
  const { agencyId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);

  const [agencyItemsSearch, setAgencyItemsSearch] =
    useState<AgencyAgePropertiesInput>({
      page: 1,
      limit: 8,
      agencyTarget: AgencyTargetType.PROPERTIES,
    });
  const [query, setQuery] = useState<string>("");

  const { setChosenAgencyTargetItems } = actionDispatch(useDispatch());
  const {
    chosenAgencyTargetItems: { agency },
  } = useSelector(chosenAgencyTargetItemsRetriever);

  // ---------------------------------------GETING DATA FROM DB ---------------------------
  useEffect(() => {
    if (!agencyId) return;
    setLoading(true);
    setLoading(true);
    const fetchData = async () => {
      const agency = new AgencyService();
      try {
        const result = await agency.getAgencyAgeProperties(
          agencyId,
          agencyItemsSearch
        );
        setChosenAgencyTargetItems(result);
      } catch (error) {
        console.log("Error n fetching chosenAgencyTargetItems: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
        setLoadingResults(false);
      }
    };
    fetchData();
  }, [agencyId, agencyItemsSearch]);
  //-------------------------------------------- HANDLERS --------------------------------------------
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setAgencyItemsSearch((prev) => ({ ...prev, location: query.trim() }));
    },
    [query]
  );

  const handleSelect = useCallback((value: AgencyTargetType) => {
    setAgencyItemsSearch((prev) => ({ ...prev, agencyTarget: value }));
    setLoadingResults(true);
  }, []);

  const content = useMemo(() => {
    if (agencyItemsSearch.agencyTarget === AgencyTargetType.AGENTS) {
      return agency?.paginatedAgents?.map((agent) => (
        <AgentCard agent={agent} key={agent?._id} />
      ));
    }
    if (agencyItemsSearch.agencyTarget === AgencyTargetType.PROPERTIES) {
      return agency?.paginatedProperties?.map((property) => (
        <PropertyCard property={property} key={property?._id} />
      ));
    }
  }, [agencyItemsSearch, agency]);

  const totalPages = useMemo(() => {
    return agencyItemsSearch.agencyTarget === AgencyTargetType.AGENTS
      ? agency?.agentsTotalNumber
      : agency?.propertiesTotalNumber;
  }, [agency, agencyItemsSearch]);
  console.log(content);
  // ------------------------------------------- RENDER  ------------------------------------------
  if (loading && !agency) {
    return <DetailPageLoading />;
  }
  return (
    <>
      <SectionIntroNoBackground
        title={agency?.memberName || "Agency detail"}
        subtitle={"agency's agents and properties"}
      />
      <section>
        <div className="container mx-auto py-10">
          <form
            onSubmit={handleSearch}
            className="lg:max-w-screen-lg flex flex-col  items-stretch md:flex-row md:items-center gap-4 p-6 md:p-10 bg-white shadow-addAgentForm rounded-lg mx-auto"
          >
            {/* Search input */}
            <input
              placeholder="Search by place name..."
              value={query}
              onChange={handleInput}
              className={`flex-1 border-blue-400 border rounded-md py-2 px-5   focus:ring-0 outline-none  ${inputClasses}`}
              autoFocus
            />

            {/* Select input */}
            <Select
              value={agencyItemsSearch.agencyTarget}
              onValueChange={(value: AgencyTargetType) => handleSelect(value)}
            >
              <SelectTrigger
                className={`max-w-52 focus:ring-blue-400 py-5 ${inputClasses} focus:outline-none focus:ring-0 border-blue-400 mx-auto`}
              >
                <SelectValue placeholder={agencyItemsSearch.agencyTarget} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={AgencyTargetType.AGENTS}
                  className={inputClasses}
                >
                  Agents
                </SelectItem>
                <SelectItem
                  value={AgencyTargetType.PROPERTIES}
                  className={inputClasses}
                >
                  Properties
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Search button */}
            <Button
              type="submit"
              className="mt-2 md:mt-0 bg-blue-400 py-5 hover:bg-blue-700 transition-all ease-linear duration-200 active:scale-95"
            >
              Search
            </Button>
          </form>

          {loadingResults ? (
            <SpinnerGrids count={3} />
          ) : content?.length ? (
            <>
              <div className="py-10 grid grid-cols-1 max-w-[500px] mx-auto md:grid-cols-2 md:max-w-full  gap-5 lg:grid-cols-3 lg:max-w-full">
                {content}
              </div>
              <PaginationCom
                totalPages={Math.ceil(
                  (totalPages ?? 0) / agencyItemsSearch.limit
                )}
                currentPage={agencyItemsSearch.page}
                styleclasses="flex flex-row items-center justify-center gap-3"
                onPageChange={setAgencyItemsSearch}
              />
            </>
          ) : (
            <NoFound />
          )}
        </div>
      </section>
    </>
  );
}
