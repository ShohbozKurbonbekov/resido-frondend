import React from "react";
import SubscriptionHistoryRow from "./SubscriptionHistroyRow";

interface SubscriptionHistoryType {
  billingName: string;
  billingEmail: string;
  billingCountry: string;
  paymentProvider: string;
  lastPaymentAt: string; // ISO
  nextPaymentAt: string; // ISO
}
const SubscriptionHistory: React.FC<SubscriptionHistoryType> = React.memo(
  (props) => {
    const {
      billingCountry,
      billingEmail,
      billingName,
      lastPaymentAt,
      nextPaymentAt,
      paymentProvider,
    } = props;
    return (
      <div className="border border-gray-200 p-6 rounded-md mt-8">
        {/* Header */}
        <div className="font-jostFont">
          <h2 className="text-lg font-semibold text-gray-900">
            Billing Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Details used for billing and payments
          </p>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <SubscriptionHistoryRow label="Company name" value={billingName} />
          <SubscriptionHistoryRow label="Billing email" value={billingEmail} />
          <SubscriptionHistoryRow label="Country" value={billingCountry} />
          <SubscriptionHistoryRow
            label="Payment method"
            value={paymentProvider}
          />

          <div className="pt-4 border-t border-gray-100 space-y-4 font-jostFont">
            <SubscriptionHistoryRow
              label="Last payment"
              value={new Date(lastPaymentAt).toLocaleDateString()}
            />
            <SubscriptionHistoryRow
              label="Next payment"
              value={new Date(nextPaymentAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    );
  },
);

export default SubscriptionHistory;
