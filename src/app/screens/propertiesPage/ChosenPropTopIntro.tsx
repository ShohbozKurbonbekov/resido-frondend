import type { Property } from "@/lib/type/property";
import {
  customiseAddress,
  formatCurrency,
  formatPropertyArea,
} from "@/lib/utils";
import { BathIcon, Bed } from "lucide-react";
import React, { useMemo } from "react";

// ---------------------------------- COMPONENT -------------------------------------
interface ChosenPropTopIntroType {
  property: Property;
}

const ChosenPropTopIntro: React.FC<ChosenPropTopIntroType> = React.memo(
  ({ property }) => {
    const { title, sellingOption, address, area, bathrooms, bedrooms } =
      property;
    const iconWrapperClasses = "flex flex-row gap-1 items-center";
    const iconClasses = "h-4 w-4 text-slate-400";
    const iconTitleClasses = "text-slate-500 font-jostFont";

    // ----------------------------------- HANDLERS --------------------------------
    const updatePropertyAddress = useMemo(
      () => customiseAddress(address),
      [address]
    );

    // ---------------------------------------- RENDERS -----------------------------------------
    return (
      <div className="rounded-md bg-slate-50 mb-4 p-6 flex flex-col items-start gap-2 ">
        <span className="py-1 px-3 text-slate-50 bg-green-600 text-size_10 rounded-sm font-bold align-middle leading-none uppercase">
          for{" "}
          {sellingOption?.optionRent?.type
            ? sellingOption.optionRent?.type
            : sellingOption?.optionSell?.type}
        </span>
        <h4 className="text-darkBlue capitalize font-bold text-2xl lg-text-3xl font-jostFont">
          {title}
        </h4>
        <p className="text-slate-400 font-jostFont capitalize">
          {updatePropertyAddress}
        </p>
        <p className="text-blue-600 font-semibold text-xl lg:text-2xl">
          {sellingOption.optionRent?.type === "RENT"
            ? formatCurrency(
                sellingOption.optionRent.monthlyPayment ?? 0,
                "USD"
              )
            : formatCurrency(
                sellingOption.optionSell?.overalAmunt ?? 0,
                "USD"
              )}{" "}
          <sub className="leading-none text-slate-400  text-sm font-normal">
            {sellingOption.optionRent?.type === "RENT"
              ? "/Month"
              : `/Discount ${sellingOption.optionSell?.discount ?? 0}%`}
          </sub>
        </p>
        <div className="flex items-center flex-row justify-start gap-3">
          <div className={iconWrapperClasses}>
            <Bed className={iconClasses} />
            <span className={iconTitleClasses}> {bedrooms} Beds</span>
          </div>
          <div className={iconWrapperClasses}>
            <BathIcon className={iconClasses} />
            <span className={iconTitleClasses}>{bathrooms} Bath</span>
          </div>
          <div className={iconWrapperClasses}>
            <img src="/img/move.svg" className="h-4 w-4" alt="property" />
            <span className={iconTitleClasses}>{formatPropertyArea(area)}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default ChosenPropTopIntro;
