import { Route, Routes } from "react-router-dom";
import AdminAddTariff from "./AdminAddTariff";

export default function AdminFeaturesPage() {
  return (
    <Routes>
      <Route path={`/add/tariff-form`} element={<AdminAddTariff />}></Route>
    </Routes>
  );
}
