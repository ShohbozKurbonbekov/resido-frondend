import {
  PropertyCooling,
  PropertyFurnature,
  PropertyHeating,
  PropertyMood,
  PropertySecurity,
  PropertyType,
  SellingTypeEnum,
} from "@/lib/enums/property.enum";
import { z } from "zod";

export const propertiesOrder = ["high price", "low price", "most popular"];

export const cityList: string[] = [
  "Seoul",
  "Incheon",
  "Busan",
  "Daegu",
  "Daejeon",
  "Gwangju",
  "Ulsan",
  "Sejong",
  "Jeju",
] as const;

export const propertyType: string[] = [
  "house",
  "office desk",
  "villa",
  "apartment",
  "condo",
  "denver",
  "studio",
];

export const bedrooms: string[] = [
  "1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
  "4 bedrooms",
  "5 bedrooms",
  "6+ bedrooms",
];

export const mood: string[] = [
  "Cozy",
  "Modern",
  "Natural",
  "Urban",
  "Relaxing",
  "Artistic",
  "Professional",
];

export const ameneties: string[] = [
  "air Conditioning",
  "swimming Pool",
  "central Heating",
  "laundry Room",
  "gym",
  "alarm",
  "window Covering",
  "internet",
  "pets Allow",
  "free Wifi",
  "car Parking",
  "spa Massage",
];

/* ----------------------------------
 Address
----------------------------------- */
export const PropertyAddressSchema = z.object({
  street: z.string().trim().min(1, { message: "Street is required" }),
  district: z.string().trim().min(1, { message: "District is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  postalCode: z.string().trim().min(1, { message: "Postal code is required" }),
  country: z.string().trim().min(1, { message: "Country is required" }),
});

/* ----------------------------------
 Selling Options
----------------------------------- */
const RentOptionSchema = z.object({
  type: z.literal(SellingTypeEnum.RENT),
  monthlyPayment: z.number().min(0),
  overalAmount: z.number().min(0),
  devidedMonths: z.number().min(0),
});

const SellOptionSchema = z.object({
  type: z.literal(SellingTypeEnum.SALE),
  overalAmount: z.number().min(0), // fixed typo
  discount: z.number().min(0),
});

export const PropertySellingOptionSchema = z
  .object({
    optionRent: RentOptionSchema.optional(),
    optionSell: SellOptionSchema.optional(),
  })
  .refine((data) => data.optionRent || data.optionSell, {
    message: "Either rent or sell option must be provided",
    path: ["sellingOption"],
  });

/* ----------------------------------
 Amenities
----------------------------------- */
export const PropertyAmenitiesSchema = z.object({
  airConditioning: z.boolean().default(false),
  swimmingPool: z.boolean().default(false),
  centralHeating: z.boolean().default(false),
  laundryRoom: z.boolean().default(false),
  gym: z.boolean().default(false),
  alarm: z.boolean().default(false),
  windowCovering: z.boolean().default(false),
  internet: z.boolean().default(false),
  petsAllow: z.boolean().default(false),
  freeWifi: z.boolean().default(false),
  carParking: z.boolean().default(false),
  spaMassage: z.boolean().default(false),
});

/* ----------------------------------
 Main Property Schema
----------------------------------- */
export const PropertyFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  sellingOption: PropertySellingOptionSchema,
  floors: z.number().int().min(0),
  propertyType: z.nativeEnum(PropertyType),
  area: z.number().positive(),
  images: z
    .array(
      z.union([
        z.instanceof(File),
        z.string().url({ message: "Please provide a valid URL" }),
      ])
    )
    .length(5, "You must provide exactly 5 images"),
  bathrooms: z.number().int().min(0),
  bedrooms: z.number().int().min(0),
  hall: z.number().int().min(0),
  kitchen: z.number().int().min(0),
  address: PropertyAddressSchema,
  description: z.string().trim().min(10, { message: "Description too short" }),
  heating: z.nativeEnum(PropertyHeating),
  cooling: z.nativeEnum(PropertyCooling),
  furnished: z.nativeEnum(PropertyFurnature),
  security: z.nativeEnum(PropertySecurity),
  yearBuilt: z.number().int().min(1800).max(new Date().getFullYear()),
  garageSpace: z.number().int().min(0),
  amenities: PropertyAmenitiesSchema,
  nearBySchools: z.boolean().default(false),
  nearByTransports: z.boolean().default(false),
  mood: z.nativeEnum(PropertyMood),
  firePlace: z.boolean().default(false),
  videos: z
    .array(
      z.union([
        z.instanceof(File),
        z.string().url({ message: "Please provide a valid URL" }),
      ])
    )
    .optional(),
});

/* ----------------------------------
 Types
----------------------------------- */
export type PropertyFormInput = z.infer<typeof PropertyFormSchema>;
