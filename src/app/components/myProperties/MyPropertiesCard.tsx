import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultPropertyAvatar, serverAPI } from "@/lib/config";
import { PropertyStatus } from "@/lib/enums/property.enum";
import { customiseAddress, formatCurrency } from "@/lib/utils";
import { CircleX, Eye, SquarePen } from "lucide-react";
import PropertyStatusBadge from "./PropertyStatusBadge";
import { useMemo } from "react";
import type { MyProperties } from "@/lib/type/property";

const subtitleClasses =
  "leading-none capitalize text-xs md:text-sm w-full truncate text-gray-700 font-light";
const tooltipContentClasses =
  "bg-white text-black border-slate-300 border rounded-sm";

const iconClasses = "h-3 w-3";
const iconWrapperClasses = "mt-1 p-1 bg-slate-800 rounded-sm text-white";
interface MyPropertiesCardType {
  property: MyProperties;
  handleArchive: (id: string) => Promise<void>;
}
export default function MyPropertiesCard({
  property,
  handleArchive,
}: MyPropertiesCardType) {
  const actions = useMemo(() => {
    const canEdit = [PropertyStatus.DRAFT, PropertyStatus.REJECTED].includes(
      property.status
    );

    const canArchive = [PropertyStatus.DRAFT, PropertyStatus.REJECTED].includes(
      property.status
    );
    return { canEdit, canArchive };
  }, [property]);

  const imageUrl = property.images.length
    ? `${serverAPI}/${property.images[0]}`
    : defaultPropertyAvatar;
  return (
    <Card
      className={"shadow-none border-slate-200/90 rounded-sm flex flex-row"}
    >
      <CardHeader className="p-0">
        <div className="max-h-40 max-w-32 sm:max-w-fit aspect-blogCardRatio overflow-hidden w-full h-full ">
          <img
            src={imageUrl}
            alt={property.title}
            className="object-cover h-full w-full rounded-l-sm"
          />
        </div>
      </CardHeader>
      <CardContent className="px-4 py-3 font-jostFont flex flex-col justify-between items-start truncate ">
        <div className="flex flex-col truncate w-full items-start gap-y-2">
          <div className="flex flex-row gap-2">
            <PropertyStatusBadge
              status={property.status}
              contentClasses={tooltipContentClasses}
            />
            <h5 className="md:text-base text-blue-900 truncate font-semibold w-full text-sm leading-none tracking-tight">
              {property.title}
            </h5>
          </div>

          <span className="inline-block py-0.5 px-2.5 border rounded-sm bg-slate-300/40 capitalize text-size_10 font-semibold">
            {property.propertyType}
          </span>

          <p className={subtitleClasses}>
            Price: {formatCurrency(property.priceValue, "USD")}{" "}
            <span className="text-slate-400 text-xs">(overall)</span>
          </p>
          <p className={subtitleClasses}>
            location: {customiseAddress(property.address)}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-x-1">
          {actions.canEdit && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className={iconWrapperClasses}>
                  <SquarePen className={iconClasses} />
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipContentClasses}>
                  <p>edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className={iconWrapperClasses}>
                <Eye className={iconClasses} />
              </TooltipTrigger>
              <TooltipContent side="bottom" className={tooltipContentClasses}>
                <p>{property.views || 0} user view </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {actions.canArchive && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className={iconWrapperClasses}
                  onClick={() => handleArchive(property._id)}
                >
                  <CircleX className={iconClasses} />
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipContentClasses}>
                  <p>Archieve property </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
