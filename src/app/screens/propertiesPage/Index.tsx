import { Route, Routes } from "react-router-dom";
import PropertiesMainContent from "./PropertiesMainContent";
import PropertiesResultSection from "./PropertiesResultSection";
import ChoseProduct from "./ChoseProduct";

export default function Properties() {
  return (
    <>
      <Routes>
        <Route path={`/:propertyId`} element={<ChoseProduct />}></Route>

        <Route
          path={`/`}
          element={
            <>
              <PropertiesResultSection />
              <PropertiesMainContent />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}
