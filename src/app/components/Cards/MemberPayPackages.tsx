import type { BillingCycle } from "@/lib/enums/pricing.enum";
import { customLetterCustomise, formatCurrency } from "@/lib/utils";

interface PaymentCardType {
  id: string;
  name: string;
  price: number;
  paymentType: BillingCycle;
  benefits: string[];
  currency: string;
  handleClick: (id: string) => void;
}

export default function PaymentCard({
  id,
  name,
  price,
  paymentType,
  benefits,
  currency,
  handleClick,
}: PaymentCardType) {
  return (
    <div
      className={`group relative   w-full max-w-sm rounded-lg border border-slate-300 bg-white p-6 transition-all duration-300  hover:shadow-[0px_0px_1px_3px_rgba(0,0,0,0.2)] font-jostFont mx-auto `}
    >
      <div className="flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex flex-col gap-1 pt-2">
          <h3 className="text-lg font-semibold tracking-tight text-darkBlue">
            {name}
          </h3>
          <p className="text-sm text-slate-500">
            Billed {customLetterCustomise(paymentType)}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold tracking-tight text-slate-800">
            {formatCurrency(price, String(currency))}
          </span>
          <span className="pb-1 text-sm text-slate-500">
            /{customLetterCustomise(paymentType)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Features */}
        <ul className="space-y-4 text-sm text-slate-600">
          {benefits.map((list) => (
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              {list}
            </li>
          ))}
        </ul>

        {/* Action */}
        <div className="flex-1 flex flex-col justify-end h-full">
          <button
            onClick={() => handleClick(id)}
            className="w-full flex items-center justify-center rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300 active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
