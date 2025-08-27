import NoFound from "@/app/components/NoFound";
import SectionIntroductionBackground from "@/app/components/SectionIntroductionBackground";
import type { Agency } from "@/lib/type/agency";
import { useEffect, useState } from "react";
import AgencyCard from "./AgencyCard";
import { MapPin } from "lucide-react";

const agenciesList: Agency[] = [
  {
    agencyName: "Green villa",
    agencyAgentNumbers: 4,
    agencyImage: "/img/ag-1.png",
    agencyLocation: "3599 Huntz Lane",
    agencyPropertyNumbers: 140,
    agencySocialContacts: {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      email: "https://www.gmail.com/",
    },
    agencyOwner: "Mr. Adam Vilawo",
    agencyPhone: "+91 235 658 4758",
    agencyCountry: "United State",
    agencyCity: "New York",
    agencyMemberyear: 2007,
  },
  {
    agencyName: "Muskaan Estate",
    agencyAgentNumbers: 10,
    agencyImage: "/img/ag-2.png",
    agencyLocation: "3599 Huntz Lane",
    agencyPropertyNumbers: 30,
    agencySocialContacts: {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      email: "https://www.gmail.com/",
    },

    agencyOwner: "Mr. Adam Vilawo",
    agencyPhone: "+91 235 658 4758",
    agencyCountry: "United State",
    agencyCity: "New York",
    agencyMemberyear: 2007,
  },
  {
    agencyName: "Red House",
    agencyAgentNumbers: 9,
    agencyImage: "/img/ag-3.png",
    agencyLocation: "3599 Huntz Lane",
    agencyPropertyNumbers: 18,
    agencySocialContacts: {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      email: "https://www.gmail.com/",
    },

    agencyOwner: "Mr. Adam Vilawo",
    agencyPhone: "+91 235 658 4758",
    agencyCountry: "United State",
    agencyCity: "New York",
    agencyMemberyear: 2007,
  },
  {
    agencyName: "Green Villa",
    agencyAgentNumbers: 8,
    agencyImage: "/img/ag-4.png",
    agencyLocation: "3599 Huntz Lane",
    agencyPropertyNumbers: 42,
    agencySocialContacts: {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      email: "https://www.gmail.com/",
    },

    agencyOwner: "Mr. Adam Vilawo",
    agencyPhone: "+91 235 658 4758",
    agencyCountry: "United State",
    agencyCity: "New York",
    agencyMemberyear: 2007,
  },
  {
    agencyName: "Estate City",
    agencyAgentNumbers: 7,
    agencyImage: "/img/ag-5.png",
    agencyLocation: "3599 Huntz Lane",
    agencyPropertyNumbers: 343,
    agencySocialContacts: {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      email: "https://www.gmail.com/",
    },

    agencyOwner: "Mr. Adam Vilawo",
    agencyPhone: "+91 235 658 4758",
    agencyCountry: "United State",
    agencyCity: "New York",
    agencyMemberyear: 2007,
  },
  {
    agencyName: "House Design",
    agencyAgentNumbers: 3,
    agencyImage: "/img/ag-6.png",
    agencyLocation: "3599 Huntz Lane",
    agencyPropertyNumbers: 31,
    agencySocialContacts: {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      email: "https://www.gmail.com/",
    },
    agencyOwner: "Mr. Adam Vilawo",
    agencyPhone: "+91 235 658 4758",
    agencyCountry: "United State",
    agencyCity: "New York",
    agencyMemberyear: 2007,
  },
];

export default function AgenciesList() {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Getting data about agencies from database
  }, []);

  return (
    <>
      <SectionIntroductionBackground
        title={"All Agency"}
        subtitle={"Lists of our all Popular agencies"}
      />
      <section className="bg-sky-100 pb-5">
        <div className="container">
          {/* // Searching Input Element for the agency list */}
          <form
            action="#"
            className="flex flex-col md:items-center items-stretch md:flex-row gap-y-1  p-[10px] rounded-md bg-white shadow-agentSearchForm mb-10 relative -mt-[30px] max-w-[1076px] w-full mx-auto
            "
          >
            <div className="md:flex-1 flex flex-row items-center  px-1 gap-1">
              <MapPin className="stroke-sky-300 h-[20px] w-[20px]" />
              <input
                type="text"
                className="border-0 bg-transparent py-2 pe-6  text-base text-slate-400  shadow-none focus:ring-0 focus:outline-0 flex-1  font-jostFont  font-semibold placeholder:text-slate-300"
                autoFocus
                placeholder="Search for a location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="button"
              className=" bg-darkBlue text-white  rounded-md cursor-pointer p-[10px_40px]  transition-all duration-200 ease-in box-border active:shadow-[0_0_0_0.25rem_rgba(66,70,73,0.5)] font-base font-jostFont "
            >
              Search
            </button>
          </form>

          {!agenciesList.length && <NoFound title={"No Agents Found"} />}

          {agenciesList.length && (
            <>
              {/* // Agencies list */}
              <div className="agents-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10  pt-5">
                {agenciesList.map((agency: Agency) => (
                  <AgencyCard agency={agency} />
                ))}
              </div>
              <div className="flex flex-row items-center justify-center">
                <button
                  type="button"
                  className="bg-blue-800 text-white border-transparent cursor-pointer p-[10px_40px] hover:bg-blue-600 transition-all duration-200 ease-linear mb-14 rounded-md font-jostFont text-base"
                >
                  Explore More Agents
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
