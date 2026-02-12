import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AgencyStatus } from "@/lib/enums/agency.enum";
import { serverAPI } from "@/lib/config";
import { customLetterCustomise } from "@/lib/utils";
import type { Agency } from "@/lib/type/agency";

// --------------------------------- SUB COMPONENT -------------------------
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

// --------------------------------- Classes -------------------------
const textInfoWrapperClasses = "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5";
const btnActiveClasses =
  "active:scale-95 transition-transform duration-150 ease-linear";

// --------------------------------- Component -------------------------
interface AgencyReviewContentType {
  agency: Agency;
  onApprove?: (agencyId: string) => Promise<void>;
  onReject?: (agencyId: string) => Promise<void>;
}

export default function AgencyReviewContent({
  agency,
  onApprove,
  onReject,
}: AgencyReviewContentType) {
  return (
    <Card className="w-full p-5 shadow-none">
      <CardContent className="flex flex-col gap-y-5 p-0">
        {/* Agency Info */}
        <div className="space-y-2 font-jostFont">
          <div className="flex flex-row items-center justify-between gap-2 flex-wrap">
            <h4 className="text-sm font-medium">Agency Information</h4>
            <Badge
              variant={
                agency.currentStatus === AgencyStatus.AVAILABLE
                  ? "default"
                  : agency.currentStatus === AgencyStatus.REJECTED
                    ? "destructive"
                    : "secondary"
              }
            >
              {customLetterCustomise(agency.currentStatus)} Review
            </Badge>
          </div>

          <Separator />

          <div className={textInfoWrapperClasses}>
            <InfoItem label="Agency Name" value={agency.memberName} />
            <InfoItem label="Email" value={agency.memberEmail} />
            <InfoItem label="Phone" value={agency.memberPhone} />
            <InfoItem label="Address" value={agency.address} />
          </div>
        </div>

        {/* Business Details */}
        <div className="space-y-2 font-jostFont">
          <h4 className="text-sm font-medium">Business Details</h4>
          <Separator />

          <div className={textInfoWrapperClasses}>
            <InfoItem
              label="Years of Experience"
              value={`${agency.yearOfExperience}`}
            />
            <InfoItem label="License Number" value={agency.licenseNumber} />
            <InfoItem
              label="Registration Number"
              value={agency.registrationNumber}
            />

            {agency.certificate && (
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Certificate
                </p>
                <iframe
                  src={`${serverAPI}/${agency.certificate}`}
                  className="w-full rounded-md border min-h-48 lg:min-h-96"
                  title="Agency Certificate"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {agency.bioInfo && (
          <div className="space-y-2 font-jostFont">
            <h4 className="text-sm font-medium">Agency Statement</h4>
            <Separator />
            <p className="text-sm text-muted">{agency.bioInfo}</p>
          </div>
        )}

        {/* Actions */}
        {agency.currentStatus === AgencyStatus.PENDING &&
          (onApprove || onReject) && (
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 font-jostFont">
              {onReject && (
                <Button
                  variant="destructive"
                  onClick={() => onReject(agency._id)}
                  className={btnActiveClasses}
                >
                  Reject
                </Button>
              )}
              {onApprove && (
                <Button
                  onClick={() => onApprove(agency._id)}
                  className={btnActiveClasses}
                >
                  Approve
                </Button>
              )}
            </div>
          )}
      </CardContent>
    </Card>
  );
}
