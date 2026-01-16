import { Route, Routes } from "react-router-dom";
import ChooseAgency from "./ChooseAgency";
import AgenciesList from "./AgenciesList";
import AgencyAgeProperties from "./AgencyAgeProperties";
import ApplyAgency from "./ApplyAgency";
import PaymentInfo from "../payment/PaymentInfo";

export default function AgenciesPage() {
  return (
    <>
      <Routes>
        <Route path={`/:agencyId`} element={<ChooseAgency />}></Route>
        <Route path={`/apply/agency-role`} element={<ApplyAgency />}></Route>
        <Route path={`/payment-info/:id`} element={<PaymentInfo />}></Route>
        <Route
          path={`/:agencyId/agents-properties`}
          element={<AgencyAgeProperties />}
        ></Route>

        <Route path={`/`} element={<AgenciesList />}></Route>
      </Routes>
    </>
  );
}
