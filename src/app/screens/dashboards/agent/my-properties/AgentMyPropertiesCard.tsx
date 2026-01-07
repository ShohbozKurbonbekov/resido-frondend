import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultPropertyAvatar, serverAPI } from "@/lib/config";
import { PropertyStatus } from "@/lib/enums/property.enum";
import type { AgentMyProperties } from "@/lib/type/property";
import { customiseAddress, formatCurrency } from "@/lib/utils";
import { CircleX, Eye, SquarePen } from "lucide-react";
import PropertyStatusBadge from "./PropertyStatusBadge";

const subtitleClasses =
  "leading-none capitalize text-xs md:text-sm w-full truncate text-gray-700 font-light";
const tooltipContentClasses =
  "bg-white text-black border-slate-300 border rounded-sm";

const iconClasses = "h-3 w-3";
const iconWrapperClasses = "mt-1 p-1 bg-slate-800 rounded-sm text-white";
interface AgentMyPropertiesCardType {
  property: AgentMyProperties;
}
export default function AgentMyPropertiesCard({
  property,
}: AgentMyPropertiesCardType) {
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
          {property.status === PropertyStatus.DRAFT ||
          property.status === PropertyStatus.REJECTED ? (
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
          ) : null}
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

          {property.status === PropertyStatus.DRAFT ||
          property.status === PropertyStatus.REJECTED ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className={iconWrapperClasses}>
                  <CircleX className={iconClasses} />
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipContentClasses}>
                  <p>Delete property </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
