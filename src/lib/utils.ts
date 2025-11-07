import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TeamMemberType } from "./type/about-us";
import moment from "moment";
import type { BlogType } from "./type/blogs";

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
export const chunkingArray = (arr: BlogType[], size: number): BlogType[][] => {
  const result: BlogType[][] = [];
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
