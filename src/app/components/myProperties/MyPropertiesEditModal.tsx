import type { SetStateType } from "@/lib/type/common";
import type {
  MemberPropertyActionsType,
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
import { useMemo, useState } from "react";
import {
  IMAGES_PATH_INITIAL,
  INITIAL_VIDEO_PATH,
  type PropertyFormInputType,
  type PropertyFormType,
} from "@/app/data/properties";
import { SellingTypeEnum } from "@/lib/enums/property.enum";
import { serverAPI } from "@/lib/config";
import { MyPropertiesModalTitle } from "@/app/components/myProperties/MyPropertiesModalTitle";
import AgentPropertyFormContent from "@/app/screens/dashboards/agent/AgentPropertyFormContent";

////////////////////////////////// COMPONENT ///////////////////////
interface MyPropertiesEditModalType {
  setModal: SetStateType<boolean>;
  fetchedProperty: Property;
  openModal: boolean;
  setFetchedProperty: SetStateType<Property | null>;
  setSelectedPropertyId: SetStateType<string | null>;
  onUpdate?: (values: PropertyFormType) => Promise<void>;
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
  propertyActions: MemberPropertyActionsType;
}

export default function MyPropertiesEditModal({
  openModal,
  fetchedProperty,
  setModal,
  setSelectedPropertyId,
  setFetchedProperty,
  propertyActions,
  onApprove,
  onReject,
  onUpdate,
}: MyPropertiesEditModalType) {
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
      const option = selling.optionRent;
      return {
        type: SellingTypeEnum.RENT,
        monthlyPayment: String(option.monthlyPayment),
        overalAmount: String(option.overalAmount),
        devidedMonths: String(option.devidedMonths),
      };
    }

    if (selling.optionSell?.type === SellingTypeEnum.SALE) {
      const option = selling.optionSell;

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

  ///////////////////////////////////////////////  HANDLERS //////////////////////////////

  return (
    <Dialog
      open={openModal}
      onOpenChange={(value) => {
        if (value === false) {
          setFetchedProperty(null);
          setSelectedPropertyId(null);
        }

        setModal(value);
      }}
    >
      <DialogContent className="h-5/6 w-11/12 max-w-6xl overflow-auto">
        <DialogHeader>
          <DialogTitle>
            <MyPropertiesModalTitle
              canCheckProperty={propertyActions.canCheckProperty}
            />
          </DialogTitle>
        </DialogHeader>
        {
          <AgentPropertyFormContent
            propertyUpdate={true}
            propertyActions={propertyActions}
            onApprove={onApprove}
            onReject={onReject}
            onUpdate={onUpdate}
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
        }
      </DialogContent>
    </Dialog>
  );
}
