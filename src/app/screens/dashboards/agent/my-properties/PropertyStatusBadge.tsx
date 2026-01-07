import { STATUS_META } from "@/app/data/properties";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PropertyStatus } from "@/lib/enums/property.enum";

interface PropertyStatusBadgeType {
  status: PropertyStatus;
  contentClasses: string;
}
export default function PropertyStatusBadge({
  status,
  contentClasses,
}: PropertyStatusBadgeType) {
  const meta = STATUS_META[status];
  if (!meta) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={meta.variant} className="cursor-default rounded-sm">
            {meta.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" className={contentClasses}>
          <p>{meta.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
