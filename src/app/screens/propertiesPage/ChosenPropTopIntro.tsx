import PropertyService from "@/app/services/Property.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { SetStateType } from "@/lib/type/common";
import type { Property } from "@/lib/type/property";
import {
  customiseAddress,
  formatCurrency,
  formatPropertyArea,
} from "@/lib/utils";
import { motion } from "framer-motion";
import { BathIcon, Bed, Heart } from "lucide-react";
import React, { useCallback, useMemo } from "react";

// ---------------------------------- COMPONENT -------------------------------------
interface ChosenPropTopIntroType {
  property: Property;
  setReloadMainPage: SetStateType<boolean>;
}

const ChosenPropTopIntro: React.FC<ChosenPropTopIntroType> = React.memo(
  ({ property, setReloadMainPage }) => {
    const {
      title,
      sellingOption,
      address,
      area,
      bathrooms,
      bedrooms,
      _id,
      meLiked,
    } = property;
    const iconWrapperClasses = "flex flex-row gap-1 items-center";
    const iconClasses = "h-4 w-4 text-slate-400";
    const iconTitleClasses = "text-slate-500 font-jostFont text-xs sm:text-sm";

    // ----------------------------------- HANDLERS --------------------------------
    const updatePropertyAddress = useMemo(
      () => customiseAddress(address),
      [address],
    );

    const handleLike = useCallback(async () => {
      try {
        const property = new PropertyService();
        await property.likeTargetProperty(_id);
        setReloadMainPage((prev) => !prev);
      } catch (error) {
        console.log("Error in liking the Property: ", error);
        await sweetErrorHandling(error!);
      }
    }, [setReloadMainPage, _id]);

    // ---------------------------------------- RENDERS -----------------------------------------
    return (
      <div className="rounded-md bg-slate-50 mb-4 p-6 flex flex-col items-start gap-2 relative">
        <span className="py-1 px-3 text-slate-50 bg-green-600 text-size_10 rounded-sm font-bold align-middle leading-none uppercase">
          for{" "}
          {sellingOption?.optionRent?.type
            ? sellingOption.optionRent?.type
            : sellingOption?.optionSell?.type}
        </span>
        <h4 className="text-darkBlue capitalize font-bold text-xl lg-text-3xl font-jostFont">
          {title}
        </h4>
        <p className="text-slate-400 font-jostFont capitalize text-sm sm:text-base">
          {updatePropertyAddress}
        </p>
        <p className="text-blue-600 font-semibold text-xl lg:text-2xl">
          {sellingOption.optionRent?.type === "RENT"
            ? formatCurrency(
                sellingOption.optionRent.monthlyPayment ?? 0,
                "USD",
              )
            : formatCurrency(
                sellingOption.optionSell?.overalAmunt ?? 0,
                "USD",
              )}{" "}
          <sub className="leading-none text-slate-400  text-xs sm:text-sm font-normal">
            {sellingOption.optionRent?.type === "RENT"
              ? "/ Month"
              : `/ Discount ${sellingOption.optionSell?.discount ?? 0}%`}
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
        <motion.button
          whileTap={{ scale: 1.5 }}
          onClick={handleLike}
          className="ms-auto  p-1 rounded-full bg-black/15 flex flex-row items-center justify-center absolute top-5 right-5"
        >
          <Heart
            className={`sm:w-5 sm:h-5 w-4 h-4 md:w-7 md:h-7 lg:w-8 lg:h-8 ${
              meLiked
                ? "fill-red-500 text-red-500 "
                : "fill-white stroke-white "
            }`}
          />
        </motion.button>
      </div>
    );
  },
);

export default ChosenPropTopIntro;
