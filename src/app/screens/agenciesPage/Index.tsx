import { Route, Routes } from "react-router-dom";
import ChooseAgency from "./ChooseAgency";
import AgenciesList from "./AgenciesList";
import AgencyAgeProperties from "./AgencyAgeProperties";

export default function AgenciesPage() {
  return (
    <>
      <Routes>
        <Route path={`/:agencyId`} element={<ChooseAgency />}></Route>
        <Route
          path={`/:agencyId/agents-properties`}
          element={<AgencyAgeProperties />}
        ></Route>

        <Route path={`/`} element={<AgenciesList />}></Route>
      </Routes>
    </>
  );
}
