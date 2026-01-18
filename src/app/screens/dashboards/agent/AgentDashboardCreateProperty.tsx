import { useCallback, useState } from "react";
import AgentCreatePropertyHeader from "./AgentCreatePropertyHeader";
import AgentPropertyFormContent from "./AgentPropertyFormContent";
import {
  IMAGES_PATH_INITIAL,
  INITIAL_VIDEO_PATH,
  PROPERTY_IMAGES_INITIAL,
  type PropertyFormInputType,
  type PropertyFormType,
} from "@/app/data/properties";
import type { PropertyImagesType } from "@/lib/type/property";
import {
  PropertyCooling,
  PropertyFurnature,
  PropertyHeating,
  PropertyMood,
  PropertySecurity,
  PropertyType,
  SellingTypeEnum,
} from "@/lib/enums/property.enum";
import AgentService from "@/app/services/AgentService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";

export default function AgentDashboardCreateProperty() {
  const propertiesValues: PropertyFormInputType = {
    // FIRST ROW
    title: "",
    address: {
      street: "",
      district: "",
      city: "",
      postalCode: "",
      country: "",
    },
    description: "",

    // NUMBERS
    floors: "",
    bathrooms: "",
    bedrooms: "",
    hall: "",
    kitchen: "",
    garageSpace: "",
    area: "",
    yearBuilt: "",

    // SELECT OPTIONS
    propertyType: PropertyType.APARTMENT,
    heating: PropertyHeating.CENTRAL,
    cooling: PropertyCooling.NONE,
    furnished: PropertyFurnature.NONE,
    security: PropertySecurity.None,
    mood: PropertyMood.Artistic,

    // AMENETIES
    amenities: {
      airConditioning: false,
      alarm: false,
      carParking: false,
      centralHeating: false,
      freeWifi: false,
      gym: false,
      internet: false,
      laundryRoom: false,
      petsAllow: false,
      spaMassage: false,
      swimmingPool: false,
      windowCovering: false,
    },

    // CHECKBOX OPTIONS
    nearBySchools: false,
    nearByTransports: false,
    firePlace: false,

    // SELLING OPTIONS
    sellingOption: {
      type: SellingTypeEnum.RENT,
      overalAmount: "",
      devidedMonths: "",
      monthlyPayment: "",
    },

    // IMAGES
    images: {
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
    },
    videos: "",
  };
  const [propertyVideoValue, setPropertyVideo] = useState<string>("");
  const [propertyImages, setPropertyImages] = useState<PropertyImagesType>(
    PROPERTY_IMAGES_INITIAL,
  );
  const [imagesPath, setImagesPath] = useState(IMAGES_PATH_INITIAL);
  const [videoPath, setVideoPath] = useState(INITIAL_VIDEO_PATH);

  // -------------------------------------------- HANDLERS --------------------------
  const handleSubmit = useCallback(async (values: PropertyFormType) => {
    const agent = new AgentService();

    try {
      await agent.createProperty(values);
      await sweetTopSmallSuccessAlert("You have created a property");
      // IMAGES RESET
      setPropertyImages(PROPERTY_IMAGES_INITIAL);
      setImagesPath(IMAGES_PATH_INITIAL);

      // VIDEOS RESET
      setPropertyVideo("");
      setVideoPath(INITIAL_VIDEO_PATH);
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
      await sweetErrorHandling(error!);
    }
  }, []);
  return (
    <div className="flex flex-col gap-y-5">
      <AgentCreatePropertyHeader />
      <AgentPropertyFormContent
        handleSubmit={handleSubmit}
        imagesPath={imagesPath}
        setImagesPath={setImagesPath}
        setVideoPath={setVideoPath}
        videoPath={videoPath}
        propertiesValues={propertiesValues}
        setPropertyVideo={setPropertyVideo}
        setPropertyImages={setPropertyImages}
        propertyImages={propertyImages}
        propertyVideo={propertyVideoValue}
      />
    </div>
  );
}
