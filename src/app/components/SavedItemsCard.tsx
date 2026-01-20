import { Card } from "@/components/ui/card";
import React, { useCallback } from "react";
import { CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { serverAPI } from "@/lib/config";
import type { SavedTargetType } from "@/lib/enums/property.enum";
import { useNavigate } from "react-router-dom";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import PropertyService from "../services/Property.service";
import type { SetStateType } from "@/lib/type/common";

interface SavedItemsCardType {
  role: SavedTargetType;
  image: string;
  title: string;
  address: string;
  price: string | number;
  createdAt?: string;
  _id: string;
  setReloadMainPage: SetStateType<boolean>;
}

// ---------------------------------------- COMPONENT --------------------------------------------
const SavedItemsCard: React.FC<SavedItemsCardType> = React.memo(
  ({ image, address, _id, price, title, setReloadMainPage }) => {
    const navigation = useNavigate();
    // -------------------------------------- HANDLERS --------------------------------------------
    const handleDelete = useCallback(async () => {
      const property = new PropertyService();
      try {
        await property.saveToggleProperty(_id);
        setReloadMainPage((prev) => !prev);
        await sweetTopSmallSuccessAlert("Successfully deleted", 1400);
      } catch (error) {
        console.log("Error in deleting savedProperty: ", error);
        await sweetErrorHandling(error!);
      }
    }, [_id, setReloadMainPage]);

    const handleVisit = () => {
      navigation(`/property/${_id}`);
    };
    // -------------------------------------- RENDER --------------------------------------------
    return (
      <Card className={"w-full rounded-sm border"}>
        <CardContent className="p-2">
          <div className="flex w-full max-h-28 flex-row items-stretch">
            <div className="w-1/5">
              {image ? (
                <img
                  src={`${serverAPI}/${image}`}
                  alt={title}
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            <div className="w-4/5 flex items-center justify-between px-4">
              <div className="flex-1 truncate py-3 flex flex-col items-start">
                <h3 className="text-base font-semibold  font-jostFont leading-5 truncate">
                  {title}
                </h3>
                {address && (
                  <p className="text-xs text-muted-foreground mt-1 truncate font-jostFont">
                    {address}
                  </p>
                )}
                {price !== undefined && (
                  <p className="text-sm font-medium mt-2 bg-slate-200 py-1 px-2 font-jostFont text-darkBlue rounded-[2px]">
                    {typeof price === "number" ? price.toLocaleString() : price}
                  </p>
                )}
              </div>

              <div className="flex items-center md:flex-row flex-col justify-center pl-3 gap-2 ">
                <button
                  className="text-sm px-3 py-1 bg-green-700 text-white rounded-sm font-jostFont hover:bg-green-500 transition-all duration-200 active:scale-105"
                  onClick={handleVisit}
                >
                  visit
                </button>
                <button
                  onClick={handleDelete}
                  aria-label="Delete saved property"
                  className="p-2 rounded-md hover:bg-destructive/10 focus:outline-none transition-all duration-200 ease-linear active:shadow-[0_0_2px_1px_rgba(255,0,0,0.3)] active:scale-105"
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);
export default SavedItemsCard;
