import type { AgentData } from "@/lib/type/agent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AgentStatus } from "@/lib/enums/agent.enum";
import { serverAPI } from "@/lib/config";
import { customLetterCustomise } from "@/lib/utils";

const textInfoWrapperClasses = "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 ";
const btnActiveClasses =
  "active:scale-95 transition-transform duration-150 ease-linear";
// --------------------------------- COMPONENT -------------------------
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

// --------------------------------- COMPONENT -------------------------
interface AgentReviewContentType {
  agent: AgentData;
  onApprove?: (agentId: string) => Promise<void>;
  onReject?: (agentId: string) => Promise<void>;
}
export default function AgentReviewContent({
  agent,
  onApprove,
  onReject,
}: AgentReviewContentType) {
  return (
    <Card className="w-full p-5">
      <CardContent className="flex flex-col gap-y-5 p-0">
        {/* Applicant Info */}
        <div className="space-y-1 font-jostFont">
          <div className="flex flex-row items-center justify-between gap-2 flex-wrap">
            <h4 className="text-sm font-medium ">Applicant Information</h4>
            <Badge
              variant={
                agent.currentStatus === AgentStatus.AVAILABLE
                  ? "default"
                  : agent.currentStatus === "rejected"
                    ? "destructive"
                    : "secondary"
              }
            >
              {customLetterCustomise(agent.currentStatus)} Review
            </Badge>
          </div>
          <Separator />
          <div className={textInfoWrapperClasses}>
            <InfoItem label="Full Name" value={agent.fullName} />
            <InfoItem label="Nickname" value={agent.nickname} />
            <InfoItem label="Phone" value={agent.phone} />
            <InfoItem label="Address" value={agent.address} />
          </div>
        </div>

        {/* Professional Info */}
        <div className="space-y-1  font-jostFont">
          <h4 className="text-sm font-medium">Professional Details</h4>
          <Separator />
          <div className={textInfoWrapperClasses}>
            <InfoItem
              label="Years of Experience"
              value={`${agent.yearOfExperience} years`}
            />
            <InfoItem label="License Number" value={agent.licenseNumber} />
            {agent.certificate && (
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Certificate
                </p>
                <iframe
                  src={`${serverAPI}/${agent.certificate}` as string}
                  className="w-full rounded-md border min-h-48 lg:min-h-96"
                  title="PDF Viewer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1 font-jostFont">
          <h4 className="text-sm font-medium">Applicant Statement</h4>
          <Separator />
          <p className={"text-sm"}>{agent.bioInfo}</p>
        </div>

        {/* Actions */}
        {agent.currentStatus === AgentStatus.PENDING &&
          (onApprove || onReject) && (
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 font-jostFont">
              {onReject && (
                <Button
                  variant="destructive"
                  onClick={() => onReject(agent._id)}
                  className={btnActiveClasses}
                >
                  Reject
                </Button>
              )}
              {onApprove && (
                <Button
                  onClick={() => onApprove(agent._id)}
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
