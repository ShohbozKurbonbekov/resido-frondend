import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { setProperties } from "./slice";
import {
  type Properties,
  type PropertiesSearchInput,
} from "@/lib/type/property";

import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { retrieveProperties } from "./selector";
import { PropertySortOrder } from "@/lib/enums/property.enum";
import PropertyService from "@/app/services/PropertyService";
import PropertiesTopSection from "./PropertiesTopSection.tsx";
import PropertiesCenterSection from "./PropertiesCenterSection.tsx";

// -------------------------- REDUX SELECTOR AND REDUX SLICE --------------------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setProperties: (data: Properties) => dispatch(setProperties(data)),
});

const propertiesRetriever = createSelector(
  retrieveProperties,
  (properties) => ({ properties })
);

// ------------------------- COMPONENT ------------------
export default function PropertiesCom() {
  const { setProperties } = actionDispatch(useDispatch());
  const { properties } = useSelector(propertiesRetriever);

  const [propertiesSearch, setPropertiesSearch] =
    useState<PropertiesSearchInput>({
      page: 1,
      limit: 4,
      order: PropertySortOrder.LOW_PRICE,
    });

  const [reLoadProperties, setreLoadProperties] = useState<boolean>(false);
  // ------------------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchDataFromDB = () => {
      const property = new PropertyService();
      property
        .getAllProperties(propertiesSearch)
        .then((data) => {
          setProperties(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchDataFromDB();
  }, [propertiesSearch, reLoadProperties]);
  //------------------------- HANDLERS -------------------
  console.log("PROPERTIES: ", properties);
  // ------------------------- RENDER  -------------------
  return (
    <>
      {/* --------------------TOP HEADER -----------------*/}
      <PropertiesTopSection
        properties={properties}
        setPropertiesSearch={setPropertiesSearch}
        propertiesSearch={propertiesSearch}
      />

      {/*----------------------CENTER MAIN PROPERTIES -------------*/}

      <PropertiesCenterSection
        propertiesData={properties}
        setPropertiesSearch={setPropertiesSearch}
        propertiesSearch={propertiesSearch}
        setreLoadProperties={setreLoadProperties}
      />
    </>
  );
}
