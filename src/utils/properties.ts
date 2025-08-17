export const calculateMortgage = (
  salePrice: number,
  downPayment: number,
  interestRate: number,
  loanTermYear: number
): number => {
  const principal = salePrice - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const totalPayments = loanTermYear * 12;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  return +monthlyPayment.toFixed(2);
};

export const mortgageInputsValid = (
  salePrice: number | string,
  downPayment: number | string,
  interestRate: number | string,
  loanTermYear: number | string
): boolean => {
  const values = [salePrice, downPayment, interestRate, loanTermYear].map(
    (str) => Number(str)
  );

  return values.every((val) => !isNaN(val) && val >= 0);
};
