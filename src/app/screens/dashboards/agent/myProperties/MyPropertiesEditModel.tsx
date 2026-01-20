import type { SetStateType } from "@/lib/type/common";
import type {
  CommonPropertyResults,
  MyProperties,
  Property,
  PropertyImagesType,
  SellingOptionUnion,
} from "@/lib/type/property";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AgentPropertyFormContent from "../AgentPropertyFormContent";
import { useCallback, useMemo, useState } from "react";
import {
  IMAGES_PATH_INITIAL,
  INITIAL_VIDEO_PATH,
  type PropertyFormInputType,
  type PropertyFormType,
} from "@/app/data/properties";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { SellingTypeEnum } from "@/lib/enums/property.enum";
import { serverAPI } from "@/lib/config";
import type { Dispatch } from "@reduxjs/toolkit";
import { setAgentMyProperties } from "../slice";
import { retrieveAgentMyProperties } from "../selector";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import AgentService from "@/app/services/Agent.service";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agentMyPropertiesDispatch = (dispatch: Dispatch) => ({
  setAgentMyProperties: (data: CommonPropertyResults<MyProperties>) =>
    dispatch(setAgentMyProperties(data)),
});

const agentMyPropertieRetriever = createSelector(
  retrieveAgentMyProperties,
  (agentMyProperties) => ({ agentMyProperties }),
);

////////////////////////////////// COMPONENT ///////////////////////
interface MyPropertiesEditModelType {
  setOpenModal: SetStateType<boolean>;
  fetchedProperty: Property;
  openModal: boolean;
  setFetchedProperty: SetStateType<Property | null>;
  setSelectedId: SetStateType<string>;
}

export default function MyPropertiesEditModel({
  openModal,
  fetchedProperty,
  setSelectedId,
  setOpenModal,
  setFetchedProperty,
}: MyPropertiesEditModelType) {
  const { setAgentMyProperties } = agentMyPropertiesDispatch(useDispatch());
  const { agentMyProperties } = useSelector(agentMyPropertieRetriever);

  //////////////////////////////////////// PROPERTY FORM INTITIALS ////////////////////////////
  const [propertyImages, setPropertyImages] = useState<PropertyImagesType>({
    image1: `${serverAPI}/${fetchedProperty.images[0]}`,
    image2: `${serverAPI}/${fetchedProperty.images[1]}`,
    image3: `${serverAPI}/${fetchedProperty.images[2]}`,
    image4: `${serverAPI}/${fetchedProperty.images[3]}`,
    image5: `${serverAPI}/${fetchedProperty.images[4]}`,
  });

  const [imagesPath, setImagesPath] =
    useState<PropertyImagesType>(IMAGES_PATH_INITIAL);
  const [propertyVideo, setPropertyVideo] = useState<string>(
    fetchedProperty.videos.length
      ? `${serverAPI}/${fetchedProperty.videos[0]}`
      : "",
  );
  const [videoPath, setVideoPath] = useState<string>(INITIAL_VIDEO_PATH);

  const findSellingOption = useMemo<SellingOptionUnion | null>(() => {
    const selling = fetchedProperty.sellingOption;

    if (!selling) return null;

    if (selling.optionRent?.type === SellingTypeEnum.RENT) {
      const option = selling?.optionRent;
      return {
        type: SellingTypeEnum.RENT,
        monthlyPayment: String(option.monthlyPayment),
        overalAmount: String(option.overalAmount),
        devidedMonths: String(option.devidedMonths),
      };
    }

    if (selling.optionSell?.type === SellingTypeEnum.SALE) {
      const option = selling?.optionSell;

      return {
        type: SellingTypeEnum.SALE,
        overalAmunt: String(option.overalAmunt),
        discount: String(option.discount),
      };
    }
    return null;
  }, [fetchedProperty.sellingOption]);

  const propertyValues: PropertyFormInputType = {
    address: fetchedProperty.address,
    amenities: fetchedProperty.amenities,
    area: String(fetchedProperty.area),
    bathrooms: String(fetchedProperty.bathrooms),
    bedrooms: String(fetchedProperty.bedrooms),
    cooling: fetchedProperty.cooling,
    description: fetchedProperty.description,
    firePlace: fetchedProperty.firePlace,
    floors: String(fetchedProperty.floors),
    furnished: fetchedProperty.furnished,
    garageSpace: String(fetchedProperty.garageSpace),
    hall: String(fetchedProperty.hall),
    heating: fetchedProperty.heating,
    images: {
      image1: `${serverAPI}/${fetchedProperty.images[0]}`,
      image2: `${serverAPI}/${fetchedProperty.images[1]}`,
      image3: `${serverAPI}/${fetchedProperty.images[2]}`,
      image4: `${serverAPI}/${fetchedProperty.images[3]}`,
      image5: `${serverAPI}/${fetchedProperty.images[4]}`,
    },
    kitchen: String(fetchedProperty.kitchen),
    mood: fetchedProperty.mood,
    nearBySchools: fetchedProperty.nearBySchools,
    nearByTransports: fetchedProperty.nearByTransports,
    propertyType: fetchedProperty.propertyType,
    security: fetchedProperty.security,
    sellingOption: findSellingOption ?? {
      type: SellingTypeEnum.RENT,
      devidedMonths: "",
      monthlyPayment: "",
      overalAmount: "",
    },
    title: fetchedProperty.title,
    yearBuilt: String(fetchedProperty.yearBuilt),
    videos: fetchedProperty.videos.length
      ? `${serverAPI}/${fetchedProperty.videos[0]}`
      : "",
  };
  console.log(fetchedProperty);

  ///////////////////////////////////////////////  HANDLERS //////////////////////////////
  const handleSubmit = useCallback(
    async (values: PropertyFormType) => {
      const snaptShot = agentMyProperties;
      console.log("VALUES: ", values);
      const agent = new AgentService();

      try {
        const result = await agent.updatePublisherProperty(
          fetchedProperty._id,
          values,
        );
        await sweetTopSmallSuccessAlert("Property updated!");
        setAgentMyProperties({
          properties: snaptShot.properties.map((property) =>
            property._id === result._id ? result : property,
          ),
          totalPropertiesNumber: snaptShot.totalPropertiesNumber,
        });
        setOpenModal(false);
        setFetchedProperty(null);
      } catch (error) {
        console.log("Error in handleSubmit: ", error);
        await sweetErrorHandling(error!);
        setAgentMyProperties(snaptShot);
      } finally {
        setSelectedId("");
      }
    },
    [
      setOpenModal,
      agentMyProperties,
      setAgentMyProperties,
      fetchedProperty._id,
      setFetchedProperty,
      setSelectedId,
    ],
  );

  return (
    <Dialog
      open={openModal}
      onOpenChange={(value) => {
        if (value === false) {
          setFetchedProperty(null);
          setSelectedId("");
        }

        setOpenModal(value);
      }}
    >
      <DialogContent className="h-5/6 w-11/12 max-w-6xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-jostFont text-slate-800 text-lg text-center">
            Edit your property here
          </DialogTitle>
        </DialogHeader>
        <AgentPropertyFormContent
          handleSubmit={handleSubmit}
          propertyImages={propertyImages}
          setPropertyImages={setPropertyImages}
          setImagesPath={setImagesPath}
          imagesPath={imagesPath}
          propertiesValues={propertyValues}
          propertyVideo={propertyVideo}
          setPropertyVideo={setPropertyVideo}
          setVideoPath={setVideoPath}
          videoPath={videoPath}
        />
      </DialogContent>
    </Dialog>
  );
}
