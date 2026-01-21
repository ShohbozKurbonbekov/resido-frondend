import type { TarrifOutputType } from "@/lib/type/pricing";
import { customLetterCustomise, formatCurrency } from "@/lib/utils";
import React from "react";

interface SubscriptionPlansCardType {
  data: TarrifOutputType;
  isCurrent: boolean;
}

const limitNumClasses =
  "mt-1 text-lg font-semibold  bg-green-300 text-white  flex items-center justify-center p-1 rounded-2xl";
const SubscriptionPlansCard: React.FC<SubscriptionPlansCardType> = React.memo(
  ({ data, isCurrent }) => {
    const { name, price, billingCycle, currency, features, limits } = data;

    return (
      <div
        className={`flex flex-col 
          relative rounded-2xl border bg-white
          p-6 md:p-8
          transition-all
          ${
            isCurrent
              ? "border-blue-500 shadow-md"
              : "border-gray-200 hover:shadow-md"
          }
        `}
      >
        {/* Current badge */}
        {isCurrent && (
          <span className="font-jostFont absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
            Current plan
          </span>
        )}

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-gray-900 font-jostFont">
            {name}
          </h3>

          <div className="text-left sm:text-right font-jostFont">
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(price, currency)}
              </span>
              <span className="text-sm text-gray-500">
                / {customLetterCustomise(billingCycle)}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-gray-100" />

        {/* Limits */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-sm font-jostFont">
          <div>
            <p className="text-gray-500 font-semibold">Agents</p>
            <p className={limitNumClasses}>{limits.agents}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Properties</p>
            <p className={limitNumClasses}>{limits.properties}</p>
          </div>
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3 text-sm text-gray-700 font-jostFont">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-8 flex-1  flex items-end">
          {isCurrent ? (
            <button className="rounded-lg bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-700 w-full truncate">
              You are currently on this plan
            </button>
          ) : (
            <button
              disabled
              className="
                w-full rounded-lg border border-gray-300
                px-4 py-3 text-sm font-medium
                text-gray-400
                cursor-not-allowed
                bg-gray-50 truncate
              "
            >
              Switch plan (coming soon)
            </button>
          )}
        </div>
      </div>
    );
  },
);

export default SubscriptionPlansCard;
