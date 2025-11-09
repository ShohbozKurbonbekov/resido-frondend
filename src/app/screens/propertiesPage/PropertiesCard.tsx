import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  SunSnow,
  Siren,
  CircleParking,
  Waves,
  Heater,
  Shirt,
  Dumbbell,
  Globe,
  PawPrint,
  Wifi,
  Flower,
  PanelsTopLeft,
  Bed,
  Hotel,
  ShieldCheck,
  Copy,
  Ban,
} from "lucide-react";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { carouselAutoPlayDelay, serverAPI } from "@/lib/config";
import { formatCurrency, formatPropertyArea } from "@/lib/utils";
import type { Properties, Property } from "@/lib/type/property";
import React from "react";
import { useNavigate } from "react-router-dom";
import PropertyService from "@/app/services/PropertyService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { type Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setProperties } from "./slice";
import { retrieveProperties } from "./selector";
import { useDispatch, useSelector } from "react-redux";

const options: EmblaOptionsType = {
  duration: 40,
  loop: true,
  align: "start",
  slidesToScroll: 1,
};

// ------------------------------- REDUX SETTER ----------------------
const actionDispatch = (dispatch: Dispatch) => ({
  setProperties: (data: Properties) => dispatch(setProperties(data)),
});

const propertiesRetriever = createSelector(
  retrieveProperties,
  (properties) => ({ properties })
);

// ---------------------------------------------- COMPONENT ---------------------------------------
interface PropertiesCardType {
  property: Property;
}

const PropertiesCard: React.FC<PropertiesCardType> = React.memo(
  ({ property }) => {
    const {
      _id,
      status,
      meLiked,
      agentData,
      sellingOption,
      propertyType,
      priceValue,
      address: { city, country, street },
      bedrooms,
      hall,
      kitchen,
      area,
      amenities,
      title,
    } = property;

    const { setProperties } = actionDispatch(useDispatch());
    const { properties } = useSelector(propertiesRetriever);
    const navigation = useNavigate();
    const autoPlay = useRef(Autoplay({ delay: carouselAutoPlayDelay }));
    const [carouselRef, carouselApi] = useEmblaCarousel(options, [
      autoPlay.current,
    ]);

    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [AllSlideNumbers, setAllSlideNumbers] = useState<number[]>([]);

    const propertyIconWrapperClasses = "flex flex-row gap-1 items-center";
    const propertyIconClasses =
      "bg-blue-100 box-content rounded-full border-1 p-2  h-4 md:h-3 lg:h-5 w-4 md:w-3 lg:w-5";
    const amenitiesClasses = "stroke-slate-400";

    // --------------------------------- HANDLERS -------------------------------------
    const handleChosenProperty = useCallback(
      (propertyId: string) => {
        navigation(`/property/${propertyId}`);
      },
      [navigation]
    );

    const handleDataUpdate = useCallback(
      (properties: Properties, propertyId: string): Properties => {
        const shallowProperties = { ...properties };
        const updatedProperties = shallowProperties.properties.map(
          (property) => {
            if (property._id !== propertyId) {
              return property;
            }

            return { ...property, meLiked: !property.meLiked };
          }
        );

        return {
          totalPropertiesNumber: shallowProperties.totalPropertiesNumber,
          properties: updatedProperties,
        };
      },
      []
    );

    // ----------------------------------------- INSERTING DATA INTO DB ------------------------------------
    const handleLikebtn = (
      e: React.MouseEvent<HTMLButtonElement>,
      propertyId: string
    ) => {
      e.stopPropagation();

      const property = new PropertyService();
      property
        .likeTargetProperty(propertyId)
        .then(() => {
          setProperties(handleDataUpdate(properties, propertyId));
        })

        .catch((error) => {
          sweetErrorHandling(error).then();
        });
    };

    // ----------------------------- CAROUSEL SETUP ------------------------
    const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
      setCarouselIndex(carouselApi.selectedScrollSnap());
    }, []);

    const scrollTo = useCallback(
      (index: number) => carouselApi && carouselApi.scrollTo(index),
      [carouselApi]
    );

    useEffect(() => {
      if (!carouselApi) return;
      setAllSlideNumbers(carouselApi.scrollSnapList());
      carouselApi.on("select", () => onSelect(carouselApi));
      onSelect(carouselApi);
    }, [carouselApi, onSelect]);
    /* CAROUSEL SETUP */
    // ---------------------------------- RENDER --------------------------

    return (
      <Card
        className="grid grid-cols-5 items-stretch shadow-none cursor-pointer "
        onClick={() => handleChosenProperty(_id)}
      >
        {/* HEADER */}
        <CardHeader className="col-span-2 p-2 ">
          <div className="w-full relative h-full">
            <div className="wrapper h-full">
              <div className="overflow-hidden h-full" ref={carouselRef}>
                <div className="flex h-full ">
                  {/* HEADER IMAGE SLIDES */}
                  {property.images.map((image: string) => {
                    const imageUrl = `${serverAPI}/${image}`;
                    return (
                      <div
                        className="flex-[0_0_100%] max-h-56 min-h-36"
                        key={imageUrl}
                      >
                        <img
                          src={imageUrl}
                          alt="Property Image"
                          className="w-full h-full  object-cover rounded-sm"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* // DOTS */}
              <div className="absolute bottom-1 flex justify-center w-full mt-4 gap-1">
                {AllSlideNumbers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === carouselIndex
                        ? "bg-green-600 scale-110"
                        : "bg-gray-50"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="absolute w-full  top-1 sm:top-3 md:top-2  lg:top-4 flex flex-col gap-y-0.5 px-3">
              <div className=" flex flex-row items-start justify-between  w-full  gap-2">
                {agentData?.isVerified ? (
                  <span className="px-3 py-1.5 bg-green-600 text-white font-normal text-size_10 rounded-sm flex flex-row  items-center gap-1 mr-auto">
                    <ShieldCheck className="w-3 h-3 fill-green-800 " />
                    <span className="leading-none">verified</span>
                  </span>
                ) : null}

                <motion.button
                  whileTap={{ scale: 1.5 }}
                  onClick={(e) => handleLikebtn(e, _id)}
                  className="ms-auto  p-1 rounded-full bg-black/35 flex flex-row items-center justify-center"
                >
                  <Heart
                    className={`w-5 lg:w-7  h-5 lg:h-7 ${
                      meLiked
                        ? "fill-red-500 text-red-500 "
                        : "fill-white stroke-white "
                    }`}
                  />
                </motion.button>
              </div>
              {agentData?.rank ? (
                <span className="px-3 py-1.5 bg-green-600 text-white font-normal text-size_10  rounded-sm flex flex-row  items-center gap-1 mr-auto -mt-1 lg:-mt-2.5">
                  <img src={"/img/svg/user-1.svg"} alt="agent type" />
                  <span className="leading-none">{agentData.rank}</span>
                </span>
              ) : null}
            </div>
          </div>
        </CardHeader>
        {/*END HEADER*/}

        {/*CONTENT*/}
        <CardContent className="col-span-3 pt-2 pr-2 pb-2 pl-0 lg:pl-2 flex flex-col space-y-3">
          <div className="flex flex-row">
            <span className="flex flex-row space-x-1 ">
              <span
                className="text-sm  sm:text-xs md:text-size_10 lg:text-sm py-2 px-3 md:py-1 md:mx-2 lg:py-2 lg:px-3 bg-green-100 text-green-600 lowercase rounded-sm font-bold "
                style={{ margin: 0 }}
              >
                For{" "}
                {sellingOption?.optionRent?.type ??
                  sellingOption?.optionSell?.type}
              </span>
              <span className="text-sm sm:text-xs md:text-size_10 lg:text-sm py-2 px-3 md:py-1 md:mx-2 lg:py-2 lg:px-3 capitalize bg-blue-100 text-blue-600 rounded-sm font-bold">
                {propertyType}
              </span>
            </span>
            <h4 className="font-bold text-blue-900 text-xs md:text-sm font-jostFont flex-1 lg:text-2xl text-end">
              {formatCurrency(Number(priceValue), "USD")}
            </h4>
          </div>
          <h5 className="font-bold font-jostFont text-blue-900 text-xs md:text-size_10 lg:text-xl">
            {`${street ?? null}, ${city ?? null}, ${country ?? null},`}
          </h5>
          <p className="truncate text-sm text-darkBlue font-jostFont font-semibold">
            {title}
          </p>

          <div className=" w-full flex flex-row justify-between items-center text-stone-400 text-sm font-jostFont my-3">
            <span className={propertyIconWrapperClasses}>
              <Hotel className={propertyIconClasses} />
              <span>
                {bedrooms}B{hall}H{kitchen}K
              </span>
            </span>

            <span className={propertyIconWrapperClasses}>
              <Bed className={propertyIconClasses} />
              <span>
                {bedrooms} Bed{bedrooms > 1 ? "s" : ""}
              </span>
            </span>

            <span className={propertyIconWrapperClasses}>
              <Copy className={propertyIconClasses} />
              <span className="">{formatPropertyArea(area)}</span>
            </span>
          </div>

          <div className="flex-1 flex flex-row  content-end  gap-x-3  items-end justify-between">
            {amenities ? (
              <div className=" flex  gap-3 mt-auto bg-slate-200 p-2 truncate rounded-sm flew-row justify-around">
                {amenities.airConditioning && (
                  <SunSnow className={amenitiesClasses} />
                )}
                {amenities.alarm && <Siren className={amenitiesClasses} />}
                {amenities.carParking && (
                  <CircleParking className={amenitiesClasses} />
                )}
                {amenities.swimmingPool && (
                  <Waves className={amenitiesClasses} />
                )}
                {amenities.centralHeating && (
                  <Heater className={amenitiesClasses} />
                )}
                {amenities.laundryRoom && (
                  <Shirt className={amenitiesClasses} />
                )}
                {amenities.gym && <Dumbbell className={amenitiesClasses} />}
                {amenities.windowCovering && (
                  <PanelsTopLeft className={amenitiesClasses} />
                )}
                {amenities.internet && <Globe className={amenitiesClasses} />}
                {amenities.petsAllow && (
                  <PawPrint className={amenitiesClasses} />
                )}
                {amenities.freeWifi && <Wifi className={amenitiesClasses} />}
                {amenities.spaMassage && (
                  <Flower className={amenitiesClasses} />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <Ban className="w-5 h-5" />
                <span className="text-size_10">No amenities available</span>
              </div>
            )}

            <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm capitalize font-jostFont">
              {status}
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default PropertiesCard;
