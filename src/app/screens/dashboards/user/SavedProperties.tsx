import { USER_CARDS } from "@/app/data/dashboard/user";
import UserFeaturesCard from "./UserFeaturesCard";
import type { Dispatch } from "@reduxjs/toolkit";
import { setSavedProperties } from "./slice";
import type { Properties, SellingType } from "@/lib/type/property";
import { createSelector } from "reselect";
import { retrieveSavedProperties } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import type { CommonInput } from "@/lib/type/common";
import PropertyService from "@/app/services/PropertyService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { FileChartColumn } from "lucide-react";
import SavedItemsCard from "@/app/components/SavedItemsCard";
import NoFound from "@/app/components/NoFound";
import { customiseAddress, formatCurrency } from "@/lib/utils";
import { SavedTargetType, SellingTypeEnum } from "@/lib/enums/property.enum";
import { PaginationCom } from "@/app/components/PaginationCom";
// ----------------------------------------- REDUX INTEGRATION --------------------------
const savedPropertiesDispatch = (dispatch: Dispatch) => ({
  setSavedProperties: (data: Properties) => dispatch(setSavedProperties(data)),
});

const savedPropertiesRetriever = createSelector(
  retrieveSavedProperties,
  (savedProperties) => ({ savedProperties })
);

// --------------------------------------- COMPONENT --------------------
export default function SavedProperties() {
  const [loading, setLoading] = useState<boolean>(true);
  const { setSavedProperties } = savedPropertiesDispatch(useDispatch());
  const { savedProperties } = useSelector(savedPropertiesRetriever);
  const [reloadMainPage, setReloadMainPage] = useState<boolean>(false);

  const [savedPropertiesInput, setSavedPropertiesInput] = useState<CommonInput>(
    {
      page: 1,
      limit: 4,
    }
  );

  useEffect(() => {
    const property = new PropertyService();
    const fetchSavedProperties = async () => {
      try {
        const result = await property.getSavedProperties(savedPropertiesInput);
        setSavedProperties(result);
      } catch (error) {
        console.log("Error in fetching savedProperties: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [savedPropertiesInput, reloadMainPage]);
  // ----------------------------------------- HANDLERS -------------------
  const handlePrice = useCallback((priceObj: SellingType) => {
    const isSellingTypeRent = priceObj?.optionRent?.type;

    if (isSellingTypeRent === SellingTypeEnum.RENT) {
      return `${formatCurrency(priceObj?.optionRent?.monthlyPayment ?? 0, "USD")} / monthly`;
    }
    return `${formatCurrency(priceObj?.optionSell?.overalAmunt ?? 0, "USD")} / discount (${priceObj.optionSell?.discount}%)`;
  }, []);

  // ---------------------------------------- RENDERS -------------------------
  return (
    <div className="lg:col-span-9 flex flex-col gap-7">
      {loading && !savedProperties.properties.length ? (
        <SpinnerGrids
          columns="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          count={3}
        />
      ) : (
        <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USER_CARDS.map((card, index) => (
            <UserFeaturesCard key={index} values={card} />
          ))}
        </div>
      )}
      {loading ? (
        <SpinnerGrids columns="grid grid-cols-1" cardHeight="h-30" />
      ) : (
        <div className="flex flex-col gap-y-2">
          <div className="header flex flex-col space-y-2 bg-white py-5 px-3 rounded-sm">
            <h4 className="text-lg font-jostFont capitalize text-darkBlue font-semibold">
              Bookmark Property
            </h4>
            <div className="flex flex-row items-center gap-1 py-2 px-4 bg-blue-900 text-white">
              <FileChartColumn />
              Property
            </div>
          </div>
          {savedProperties.properties.length ? (
            <>
              <div className="wrapper grid grid-cols-1 gap-y-2 min-h-80 items-start">
                {savedProperties.properties.map((item) => (
                  <SavedItemsCard
                    key={item._id}
                    {...{
                      address: customiseAddress(item.address),
                      image: item.images[0] ? item.images[0] : "/img/ag-8.png",
                      price: handlePrice(item.sellingOption),
                      title: item.title || "No title",
                      _id: item._id,
                      role: SavedTargetType.PROPERTY,
                      setReloadMainPage,
                    }}
                  />
                ))}
              </div>
              <PaginationCom
                totalPages={Math.ceil(
                  (savedProperties.totalPropertiesNumber[0]?.total ?? 0) /
                    savedPropertiesInput.limit
                )}
                styleclasses="flex flex-row items-center justify-center mt-4 gap-3"
                currentPage={savedPropertiesInput.page}
                onPageChange={setSavedPropertiesInput}
              />
            </>
          ) : (
            <NoFound title="No saved properties found" />
          )}
        </div>
      )}
    </div>
  );
}
