import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TeamMemberType } from "./type/about-us";
import moment from "moment";
import type { PropertyAddress } from "./type/property";

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

export const findContactMemberRole = (
  members: TeamMemberType[],
  role: string
): TeamMemberType | null => {
  const member = members.find(
    (member: TeamMemberType) =>
      member.memberRole.toLowerCase() === role.toLowerCase()
  );
  if (!member) return null;
  return member;
};

// Date converter funtion
export const dateConverter = (str: string, format: string): string => {
  return moment(str).format(format);
};

// Chunk array
export const chunkingArray = (arr: string[], size: number): string[][] => {
  const result: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    // i => 0 => 4 => 8 => 12 => 16 => 20
    result.push(arr.slice(i, i + size)); // [[],[],[],[],[]]
  }
  return result;
};

// CALCULATE TOTAL PAGES
export const calculateTotalPages = (
  page: number,
  limit: number,
  total: number
) => {
  const start: number = (page - 1) * limit + 1;
  const end: number = Math.min(page * limit, total);
  return { start, end };
};

// ARRANGED ADDRESS
export const customiseAddress = (address: PropertyAddress) => {
  return `${address.street ?? ""}, ${address.city ?? ""}, ${
    address.country ?? ""
  }`;
};

// CUSTOMISE TIME
export const customiseTime = (timeString: string) => {
  const noramizedTime = new Date(timeString).getTime();
  const daysSinceCreated = Math.floor(
    (Date.now() - noramizedTime) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceCreated <= 7 && daysSinceCreated >= 2) {
    if (daysSinceCreated === 0) {
      return "commented Today";
    } else {
      return `commented ${daysSinceCreated} days ago`;
    }
  } else if (daysSinceCreated === 1) {
    return `commented yesterday`;
  } else {
    return `commented on ${moment(timeString).format("MMMM, Do YYYY")}`;
  }
};
