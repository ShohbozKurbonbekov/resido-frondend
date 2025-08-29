import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { T } from "./type/common";

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

// Chunk array
export const chunkingArray = (arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    // i => 0 => 4 => 8 => 12 => 16 => 20
    result.push(arr.slice(i, i + size)); // [[],[],[],[],[]]
  }
  return result;
};
