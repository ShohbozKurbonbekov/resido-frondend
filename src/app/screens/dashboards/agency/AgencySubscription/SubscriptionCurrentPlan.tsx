import { SUBSCRIPTION_STATUS_STYLES } from "@/app/data/packages";
import { SubscriptionStatus } from "@/lib/enums/agency.enum";
import type { BillingCycle } from "@/lib/enums/pricing.enum";
import { formatCurrency } from "@/lib/utils";
import React from "react";

interface SubscriptionCurrentPlanType {
  planName: string;
  amount: number;
  currency: string;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  periodStart: string;
  readonly?: boolean;
  periodEnd: string;
  onCancel?: () => void;
  onRenew?: () => void;
}
const SubscriptionCurrentPlan: React.FC<SubscriptionCurrentPlanType> =
  React.memo((props) => {
    const {
      amount,
      billingCycle,
      currency,
      periodEnd,
      periodStart,
      planName,
      status,
      onCancel,
      onRenew,
      readonly,
    } = props;

    return (
      <div className="mt-8 border border-gray-200 p-6 rounded-md">
        {/* Header */}
        <div className="flex items-start justify-between font-jostFont">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 ">
              {readonly ? "Previous" : "Current"} Plan
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your {readonly ? "previus" : "active"} subscription details
            </p>
          </div>

          {/* Status badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${SUBSCRIPTION_STATUS_STYLES[status]}`}
          >
            {status}
          </span>
        </div>

        {/* Plan info */}
        <div className="mt-6 font-jostFont">
          <p className="text-xl font-semibold text-gray-900">{planName}</p>
          <p className="mt-1 text-sm text-gray-600">
            {formatCurrency(amount, currency)} / {billingCycle.toLowerCase()}
          </p>
        </div>

        {/* Billing period */}
        <div className="mt-4 text-sm text-gray-600 font-jostFont">
          <p>Billing period</p>
          <p className="mt-1 font-medium text-gray-900">
            {new Date(periodStart).toLocaleDateString()} →{" "}
            {new Date(periodEnd).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6">
          {status === SubscriptionStatus.ACTIVE && onCancel && (
            <button
              onClick={onCancel}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 font-jostFont"
            >
              Cancel subscription
            </button>
          )}

          {!readonly && status === SubscriptionStatus.EXPIRED && onRenew && (
            <button
              onClick={onRenew}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 font-jostFont"
            >
              Renew subscription
            </button>
          )}

          {readonly ?? (
            <p className="text-sm text-gray-500 font-jostFont">
              This subscription is no loner active
            </p>
          )}
        </div>
      </div>
    );
  });

export default SubscriptionCurrentPlan;
