import {
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  Percent,
} from "lucide-react";
import { useCallback, useState } from "react";
import { calculateMortgage, mortgageInputsValid } from "@/utils/properties";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { ErrorMessages } from "@/lib/config";
import type { MortageInputs } from "@/lib/type/property";

// ----------------------------------------------- CLASSES ----------------------------------------
const articleClasses = "w-full flex relative";
const inputClasses =
  "border-2 rounded-sm  py-3 text-xs ps-8 bg-sky-50 text-slate-400 font-jostFont  font-semibold ring-blue-500 outline-blue-500 flex-1";
const iconClasses =
  "absolute top-1/2 -translate-y-1/2 left-2 h-5 w-5 text-slate-400";
const initialValues: MortageInputs = {
  inputSales: "",
  inputPayment: "",
  inputLoan: "",
  inputInterestRate: "",
  mortgageValue: 0,
};
// ---------------------------------------------- COMPONENT ------------------------------
export default function MortageCalculation() {
  const [mortageInputs, setMortageInputs] =
    useState<MortageInputs>(initialValues);
  const {
    inputInterestRate,
    inputLoan,
    inputPayment,
    inputSales,
    mortgageValue,
  } = mortageInputs;

  // ----------------------------------------- HANLDERS --------------------------------------

  const inputHandlers = useCallback(
    (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      switch (type) {
        case "sales_price":
          setMortageInputs((prev) => ({ ...prev, inputSales: input }));
          break;
        case "down_price":
          setMortageInputs((prev) => ({ ...prev, inputPayment: input }));
          break;
        case "loan_term":
          setMortageInputs((prev) => ({ ...prev, inputLoan: input }));
          break;
        default:
          setMortageInputs((prev) => ({ ...prev, inputInterestRate: input }));
          break;
      }
    },
    []
  );
  const handleMortgageCalculation = useCallback(async () => {
    try {
      if (!mortgageInputsValid(mortageInputs))
        throw new Error(ErrorMessages.error3);

      // setOpen(true);
      const totolMortgage = calculateMortgage(mortageInputs);
      setMortageInputs((prev) => ({ ...prev, mortgageValue: totolMortgage }));
    } catch (error) {
      console.log("Error in MortageCalculation: ", error);
      await sweetErrorHandling(error!);
    }
  }, [mortageInputs]);

  return (
    <div className="flex flex-col mb-7">
      <div className="rounded-tl-md rounded-tr-md bg-blue-800 py-6 px-5 flex flex-col items-start justify-center">
        <div className="flex flex-col  ps-5">
          <h4 className="font-bold font-jostFont text-xl text-white capitalize  leading-tight">
            Mortage Calculator
          </h4>
          <p className="text-slate-300 text-base font-light font-jostFont">
            View your Interest Rate
          </p>
        </div>
      </div>
      <form
        action="#"
        className="p-6 bg-white flex flex-col items-stretch gap-y-[15px] rounded-bl-md rounded-br-md "
      >
        {/* // Sale Price */}
        <article className={articleClasses}>
          <input
            type="number"
            id="sale"
            className={inputClasses}
            placeholder="Sale Price"
            value={inputSales}
            onChange={(e) => inputHandlers("sales_price", e)}
          />
          <CircleDollarSign className={iconClasses} />
        </article>

        {/* // Down Payment */}
        <article className={articleClasses}>
          <input
            type="number"
            id="payment"
            className={inputClasses}
            value={inputPayment}
            onChange={(e) => inputHandlers("down_price", e)}
            placeholder="Down Payment"
          />
          <CreditCard className={iconClasses} />
        </article>

        {/* // Loan Term */}
        <article className={articleClasses}>
          <input
            type="number"
            id="loan"
            className={inputClasses}
            placeholder="Loan Term (Years)"
            value={inputLoan}
            onChange={(e) => inputHandlers("loan_term", e)}
          />
          <CalendarDays className={iconClasses} />
        </article>

        {/* // interest */}
        <article className={articleClasses}>
          <input
            type="number"
            id="interestRate"
            className={inputClasses}
            value={inputInterestRate}
            onChange={(e) => inputHandlers("interest_rate", e)}
            placeholder="Interest Rate"
          />
          <Percent className={iconClasses} />
        </article>

        <Dialog>
          <DialogTrigger asChild>
            <button
              className="w-full py-2.5 px-5 rounded-sm border-2 border-blue-300 text-blue-700 text-sm capitalize bg-blue-100 hover:bg-blue-800 transition-colors duration-200 ease-linear hover:text-white hover:border-transparent font-semibold"
              type="button"
              onClick={handleMortgageCalculation}
            >
              Calculate
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-md text-slate-500 text-center font-jostFont">
                See your mortage
              </DialogTitle>
            </DialogHeader>
            <p className="flex flex-col items-center gap-2">
              <span className="text-green-700 font-bold">Monthly payment</span>
              <span className="py-1 px-3 rounded-sm border border-red-300 text-red-500 font-bold">
                ${mortgageValue}
              </span>
            </p>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}
