// interface AgencyReviewContentType {}

import type { Agency } from "@/lib/type/agency";

interface AgencyReviewContentType {
  agency: Agency;
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
}
export default function AgencyReviewContent({
  agency,
}: AgencyReviewContentType) {
  return <div>AgencyReviewContent</div>;
}
