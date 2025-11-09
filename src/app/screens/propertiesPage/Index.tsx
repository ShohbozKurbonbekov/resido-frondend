import { Route, Routes } from "react-router-dom";
import ChoseProduct from "./ChoseProduct";
import PropertiesCom from "./PropertiesCom";

// ------------------------- COMPOENENT ----------------------
export default function PropertiesPage() {
  return (
    <>
      <Routes>
        <Route path={`/:propertyId`} element={<ChoseProduct />}></Route>

        <Route path={`/getAll`} element={<PropertiesCom />}></Route>
      </Routes>
    </>
  );
}
