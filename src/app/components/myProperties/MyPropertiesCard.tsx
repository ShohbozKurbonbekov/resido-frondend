import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultPropertyAvatar, serverAPI } from "@/lib/config";
import { PropertyStatus, SellingTypeEnum } from "@/lib/enums/property.enum";
import {
  customiseAddress,
  customizePropertyPrice,
  formatCurrency,
} from "@/lib/utils";
import { CircleQuestionMark, CircleX, Eye, SquarePen } from "lucide-react";
import PropertyStatusBadge from "./PropertyStatusBadge";
import { useMemo } from "react";
import type { MyProperties } from "@/lib/type/property";
import type { CommonUsers, SetStateType } from "@/lib/type/common";
import { MemberType } from "@/lib/enums/agent.enum";

const subtitleClasses =
  "leading-none capitalize text-xs md:text-sm w-full truncate text-gray-700 font-light";
const tooltipContentClasses =
  "bg-white text-black border-slate-300 border rounded-sm";

const iconClasses = "h-3 w-3";
const iconWrapperClasses = "mt-1 p-1 bg-slate-800 rounded-sm text-white";

interface MyPropertiesCardType {
  setModal: SetStateType<boolean>;
  property: MyProperties;
  setSelectedPropertyId: SetStateType<string | null>;
  onArchive?: (id: string) => Promise<void>;
  authmember: CommonUsers;
}
export default function MyPropertiesCard({
  property,
  setModal,
  setSelectedPropertyId,
  onArchive,
  authmember,
}: MyPropertiesCardType) {
  const getPropertyPermissions = useMemo(() => {
    const canEdit =
      authmember.role === MemberType.AGENT &&
      [PropertyStatus.DRAFT, PropertyStatus.REJECTED].includes(property.status);

    const canArchive =
      authmember.role === MemberType.AGENCY &&
      property.status === PropertyStatus.AVAILABLE;

    const canApproveReject =
      authmember.role === MemberType.AGENCY &&
      property.status === PropertyStatus.PENDING_APPROVAL;
    return { canEdit, canArchive, canApproveReject };
  }, [property.status, authmember.role]);

  const imageUrl = property.images.length
    ? property.images[0].startsWith("blob")
      ? property.images[0]
      : `${serverAPI}/${property.images[0]}`
    : defaultPropertyAvatar;

  return (
    <Card
      className={
        "shadow-none border-slate-200/90 rounded-sm flex flex-row h-auto"
      }
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
        <div className="flex flex-col truncate  items-start gap-y-2">
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
            Price:{" "}
            {formatCurrency(
              customizePropertyPrice(property.sellingOption)?.sellingPrice ?? 0,
              "USD",
            )}{" "}
            <span className="text-slate-400 text-xs">
              (
              {customizePropertyPrice(property.sellingOption)?.type ===
              SellingTypeEnum.RENT
                ? "monthly"
                : "overall"}
              )
            </span>
          </p>
          <p className={subtitleClasses}>
            location: {customiseAddress(property.address)}
          </p>
        </div>
        <TooltipProvider>
          <div className="flex flex-row flex-wrap gap-x-1">
            {getPropertyPermissions.canEdit && (
              <Tooltip>
                <TooltipTrigger
                  className={iconWrapperClasses}
                  onClick={() => {
                    setModal(true);
                    setSelectedPropertyId(property._id);
                  }}
                >
                  <SquarePen className={iconClasses} />
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipContentClasses}>
                  <p>edit</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger className={iconWrapperClasses}>
                <Eye className={iconClasses} />
              </TooltipTrigger>
              <TooltipContent side="bottom" className={tooltipContentClasses}>
                <p>{property.views || 0} user view </p>
              </TooltipContent>
            </Tooltip>

            {getPropertyPermissions.canArchive && onArchive && (
              <Tooltip>
                <TooltipTrigger
                  className={iconWrapperClasses}
                  onClick={() => onArchive(property._id)}
                >
                  <CircleX className={iconClasses} />
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipContentClasses}>
                  <p>Archieve property </p>
                </TooltipContent>
              </Tooltip>
            )}
            {getPropertyPermissions.canApproveReject && (
              <Tooltip>
                <TooltipTrigger
                  className={iconWrapperClasses}
                  onClick={() => {
                    setModal(true);
                    setSelectedPropertyId(property._id);
                  }}
                >
                  <CircleQuestionMark className={iconClasses} />
                </TooltipTrigger>
                <TooltipContent side="bottom" className={tooltipContentClasses}>
                  <p>Approve or reject</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
