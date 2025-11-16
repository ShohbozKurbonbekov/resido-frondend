import type { T } from "@/lib/type/common";
import type { MortageInputs } from "@/lib/type/property";

export const calculateMortgage = (mortageInputs: MortageInputs): number => {
  const { inputInterestRate, inputLoan, inputPayment, inputSales } =
    mortageInputs;
  const principal = Number(inputSales) - Number(inputPayment);
  const monthlyRate = Number(inputInterestRate) / 12 / 100;
  const totalPayments = Number(inputLoan) * 12;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  return +monthlyPayment.toFixed(2);
};

export const mortgageInputsValid = (mortageInputs: T): boolean => {
  const values = Object.values(mortageInputs).every(
    (el) => String(el).trim() !== ""
  );

  return values;
};
