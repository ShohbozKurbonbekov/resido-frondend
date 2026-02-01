import { AlertCircle, CheckCircle2 } from "lucide-react";

interface MyPropertiesModalTitleType {
  canCheckProperty: boolean;
}

export function MyPropertiesModalTitle({
  canCheckProperty,
}: MyPropertiesModalTitleType) {
  const isAgency = canCheckProperty;

  return (
    <div
      className={`flex gap-4 rounded-lg font-jostFont border p-4  mt-4 ${
        isAgency
          ? "border-blue-200 bg-blue-50"
          : "border-yellow-200 bg-yellow-50"
      }`}
    >
      {/* Icon */}
      <div
        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
          isAgency ? "bg-blue-100" : "bg-yellow-100"
        }`}
      >
        {isAgency ? (
          <CheckCircle2 className="h-5 w-5 text-blue-600" />
        ) : (
          <AlertCircle className="h-5 w-5 text-yellow-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">
          {isAgency ? "Review Property Changes" : "Submit Changes for Approval"}
        </h3>

        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {isAgency ? (
            <>
              This property is awaiting your decision. You may{" "}
              <span className="font-medium text-gray-900">approve</span> or{" "}
              <span className="font-medium text-gray-900">reject</span> the
              submitted changes.
              <br />
              <span className="block mt-1">
                <strong>Approve</strong> → property becomes publicly available
                <br />
                <strong>Reject</strong> → agent can revise and resubmit
              </span>
            </>
          ) : (
            <>
              After you update this property, its status will change to{" "}
              <span className="font-medium text-gray-900">
                Pending Approval
              </span>
              . The agency will review your changes and either approve or reject
              them.
              <br />
              <span className="block mt-1">
                If rejected, you can revise the property and resubmit it for
                review.
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
