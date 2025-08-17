import {
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  Percent,
} from "lucide-react";
import { useState } from "react";
import { calculateMortgage, mortgageInputsValid } from "@/utils/properties";
import { Dialog, DialogContent } from "@/components/ui/dialog";
export default function MortageCalculation() {
  const [open, setOpen] = useState<boolean>(false);
  const [inputSales, setInputSales] = useState<number | string>("");
  const [inputPayment, setInputPayment] = useState<number | string>("");
  const [inputLoan, setInputLoan] = useState<number | string>("");
  const [inputInterestRate, setInputInterestRate] = useState<number | string>(
    ""
  );
  const [mortgageValue, setMortgageValue] = useState<number>(0);

  const handleMortgageCalculation = (
    inputSales: number | string,
    inputPayment: number | string,
    inputInterestRate: number | string,
    inputLoan: number | string
  ): void => {
    if (
      !mortgageInputsValid(
        inputSales,
        inputPayment,
        inputInterestRate,
        inputLoan
      )
    ) {
      alert("Please insert valid values there");
      return;
    }

    setOpen(true);
    const totolMortgage = calculateMortgage(
      Number(inputSales),
      Number(inputPayment),
      Number(inputInterestRate),
      Number(inputLoan)
    );
    setMortgageValue(totolMortgage);

    setInputSales("");
    setInputInterestRate("");
    setInputLoan("");
    setInputPayment("");
  };

  return (
    <div className="flex flex-col mb-[30px]">
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
        className="py-6 px-[22.5px] bg-white flex flex-col items-stretch gap-y-[15px] rounded-bl-md rounded-br-md "
      >
        {/* // Sale Price */}
        <article className="w-full flex relative">
          <input
            type="number"
            id="sale"
            className="border-2 rounded-sm  py-3 text-xs ps-8 bg-sky-50 text-slate-400 font-jostFont  font-semibold ring-blue-500 outline-blue-500 flex-1"
            placeholder="Sale Price"
            value={inputSales}
            onChange={(e) => setInputSales(e.target.value)}
          />
          <CircleDollarSign className="absolute top-[50%] -translate-y-[50%] left-2 h-5 w-5 text-slate-400" />
        </article>

        {/* // Down Payment */}
        <article className="w-full flex relative">
          <input
            type="number"
            id="payment"
            className="border-2 rounded-sm  py-3 text-xs ps-8 bg-sky-50 text-slate-400 font-jostFont  font-semibold ring-blue-500 outline-blue-500 flex-1"
            value={inputPayment}
            onChange={(e) => setInputPayment(e.target.value)}
            placeholder="Down Payment"
          />
          <CreditCard className="absolute top-[50%] -translate-y-[50%] left-2 h-5 w-5 text-slate-400" />
        </article>

        {/* // Loan Term */}
        <article className="w-full flex relative">
          <input
            type="number"
            id="loan"
            className="border-2 rounded-sm  py-3 text-xs ps-8 bg-sky-50 text-slate-400 font-jostFont  font-semibold ring-blue-500 outline-blue-500 flex-1"
            placeholder="Loan Term (Years)"
            value={inputLoan}
            onChange={(e) => setInputLoan(e.target.value)}
          />
          <CalendarDays className="absolute top-[50%] -translate-y-[50%] left-2 h-5 w-5 text-slate-400" />
        </article>

        {/* // interest */}
        <article className="w-full flex relative">
          <input
            type="number"
            id="interestRate"
            className="border-2 rounded-sm  py-3 text-xs ps-8 bg-sky-50 text-slate-400 font-jostFont  font-semibold ring-blue-500 outline-blue-500 flex-1"
            value={inputInterestRate}
            onChange={(e) => setInputInterestRate(e.target.value)}
            placeholder="Interest Rate"
          />
          <Percent className="absolute top-[50%] -translate-y-[50%] left-2 h-5 w-5 text-slate-400" />
        </article>

        <Dialog open={open} onOpenChange={setOpen}>
          <button
            className="w-full py-[10px] px-[20px] rounded-sm border-2 border-blue-300 text-blue-700 text-sm capitalize bg-blue-100 hover:bg-blue-800 transition-colors duration-200 ease-linear hover:text-white hover:border-transparent font-semibold"
            type="button"
            onClick={() =>
              handleMortgageCalculation(
                inputSales,
                inputPayment,
                inputInterestRate,
                inputLoan
              )
            }
          >
            Calculate
          </button>

          <DialogContent>
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
