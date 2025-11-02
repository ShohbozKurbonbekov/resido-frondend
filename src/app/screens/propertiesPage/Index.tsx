import { Route, Routes } from "react-router-dom";
// import PropertiesMainContent from "./PropertiesMainContent";
// import PropertiesResultSection from "./PropertiesResultSection";
import ChoseProduct from "./ChoseProduct";
import PropertiesCom from "./PropertiesCom";

// ------------------------- COMPOENENT ----------------------
export default function PropertiesPage() {
  return (
    <>
      <Routes>
        <Route path={`/:propertyId`} element={<ChoseProduct />}></Route>

        <Route
          path={`/getAll`}
          element={
            <>
              <PropertiesCom />
              {/* <PropertiesResultSection />
              <PropertiesMainContent /> */}
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}
