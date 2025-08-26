import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (num: number, currencyName: string): string => {
  const userLocale: string = navigator.language || "en-US";
  const currency = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: currencyName,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
  return currency;
};

export const formatPropertyArea = (num: number): string => {
  const userLocale: string = navigator.language || "en-US";
  const area = new Intl.NumberFormat(userLocale, {
    style: "decimal",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
  return area + " M²";
};
