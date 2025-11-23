import NoFound from "@/app/components/NoFound";
import SectionIntroductionBackground from "@/app/components/SectionIntroductionBackground";
import type { AgenciesListPage, Agency } from "@/lib/type/agency";
import { useEffect, useMemo, useState } from "react";
import AgencyCard from "./AgencyCard";
import SearchInputForm from "@/app/components/SearchInputForm";
import type { Dispatch } from "@reduxjs/toolkit";
import { setAgenciesListPage } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AgencyService from "@/app/services/AgencyService";
import type { SellersSearchInput } from "@/lib/type/common";
import { createSelector } from "reselect";
import { retrieveAgenciesListPage } from "./selector";
import { PaginationCom } from "@/app/components/PaginationCom";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";

// -------------------------------- REDUX INTEGRATION ----------------
const actionDispatch = (dispatch: Dispatch) => ({
  setAgenciesListPage: (data: AgenciesListPage) =>
    dispatch(setAgenciesListPage(data)),
});

const agenciesListPageRetriever = createSelector(
  retrieveAgenciesListPage,
  (agenciesListPage) => ({ agenciesListPage })
);
// -------------------------------- COMPONENT ------------------------
export default function AgenciesList() {
  const { setAgenciesListPage } = actionDispatch(useDispatch());
  const [loading, setLoading] = useState<boolean>(true);
  const { agenciesListPage } = useSelector(agenciesListPageRetriever);

  const [agenciesSearchInput, setAgenciesSearchInput] =
    useState<SellersSearchInput>({
      page: 1,
      limit: 8,
    });

  const totalPages = useMemo(() => {
    return Math.ceil(
      (agenciesListPage?.totalNumbers[0]?.total ?? 0) /
        agenciesSearchInput?.limit
    );
  }, [agenciesListPage, agenciesSearchInput]);

  // ---------------------------------------------- HANDLERS ------------------------------------------

  useEffect(() => {
    // ---------------------------- FETCHING DATA --------------
    setLoading(true);
    const fetchData = async () => {
      const agency = new AgencyService();
      try {
        const result = await agency.getAgencyByLocation(agenciesSearchInput);
        setAgenciesListPage(result);
      } catch (error) {
        console.log("Error in fetching agenciesListPage data: ", error);
        sweetErrorHandling(error!);
      }
      setLoading(false);
    };
    fetchData();
  }, [agenciesSearchInput]);

  return (
    <>
      <SectionIntroductionBackground
        title={"All Agency"}
        subtitle={"Lists of our all Popular agencies"}
      />
      <section className="bg-sky-100 pb-5">
        <div className="container">
          {/* // Searching Input Element for the agency list */}
          <SearchInputForm
            setAgenciesSearchInput={(searchInput) =>
              setAgenciesSearchInput((prev) => ({
                ...prev,
                location: searchInput,
              }))
            }
          />
          {loading ? (
            <SpinnerGrids />
          ) : agenciesListPage?.totalNumbers[0]?.total ? (
            <>
              <div className="agents-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10  pt-5">
                {agenciesListPage.agencies.map((agency: Agency) => (
                  <AgencyCard agency={agency} key={agency._id} />
                ))}
              </div>
              <PaginationCom
                styleclasses="flex flex-row items-center justify-center gap-3 max-auto"
                totalPages={totalPages}
                currentPage={agenciesSearchInput.page}
                onPageChange={setAgenciesSearchInput}
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
