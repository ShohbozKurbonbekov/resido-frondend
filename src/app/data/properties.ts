import {
  PropertyCooling,
  PropertyFurnature,
  PropertyHeating,
  PropertyMood,
  PropertySecurity,
  PropertyStatus,
  PropertyType,
  SellingTypeEnum,
} from "@/lib/enums/property.enum";
import { z } from "zod";

export const STATUS_META: Record<
  PropertyStatus,
  {
    label: string;
    tooltip: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  [PropertyStatus.DRAFT]: {
    label: "Draft",
    tooltip: "Not submitted for review yet",
    variant: "secondary",
  },

  [PropertyStatus.PENDING_APPROVAL]: {
    label: "Under Review",
    tooltip: "The agency is reviewing this listing",
    variant: "outline",
  },

  [PropertyStatus.REJECTED]: {
    label: "Needs Fix",
    tooltip: "Changes are required before approval",
    variant: "destructive",
  },

  [PropertyStatus.AVAILABLE]: {
    label: "Live",
    tooltip: "This property is visible to users",
    variant: "default",
  },

  [PropertyStatus.RENTED]: {
    label: "Rented",
    tooltip: "This property has been rented",
    variant: "secondary",
  },

  [PropertyStatus.SOLD]: {
    label: "Sold",
    tooltip: "This property has been sold",
    variant: "secondary",
  },

  [PropertyStatus.ARCHIVED]: {
    label: "Archived",
    tooltip: "This listing is no longer active",
    variant: "outline",
  },
};
// ----------------------------------- INITIAL STATES --------------------

export const IMAGES_PATH_INITIAL = {
  image1: "Upload first image",
  image2: "Upload second image",
  image3: "Upload third image",
  image4: "Upload fourth image",
  image5: "Upload fifth image",
};

export const INITIAL_VIDEO_PATH = "Upload a video";
export const PROPERTY_IMAGES_INITIAL = {
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
};

export const PROPERTY_ADDRESS = [
  "street",
  "district",
  "city",
  "postalCode",
  "country",
] as const;

export const PROPERTY_FEATURES = [
  { name: "floors", label: "Floors" },
  { name: "bathrooms", label: "Bathrooms" },
  { name: "bedrooms", label: "Bedrooms" },
  { name: "hall", label: "Hall" },
  { name: "kitchen", label: "Kitchen" },
  { name: "garageSpace", label: "Garage Space" },
  { name: "area", label: "Area (sq.m)" },
  { name: "yearBuilt", label: "Year Built" },
] as const;

export const PROPERTY_OPTIONS = [
  {
    name: "propertyType",
    enumObj: PropertyType,
    label: "Property Type",
  },
  { name: "heating", enumObj: PropertyHeating, label: "Heating" },
  { name: "cooling", enumObj: PropertyCooling, label: "Cooling" },
  {
    name: "furnished",
    enumObj: PropertyFurnature,
    label: "Furnished",
  },
  {
    name: "security",
    enumObj: PropertySecurity,
    label: "Security",
  },
  { name: "mood", enumObj: PropertyMood, label: "Mood" },
] as const;

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

export const RENT_OPTION = [
  { name: "monthlyPayment", label: "Monthly Payment" },
  { name: "totalAmount", label: "Total Amount" },
  { name: "dividedMonths", label: "Divided Months" },
] as const;

export const SALE_OPTION = [
  { name: "totalAmount", label: "Total Amount" },
  { name: "discount", label: "Discount" },
] as const;

export const PROPERTY_AMENITIES = [
  { name: "airConditioning", label: "Air Conditioning" },
  { name: "swimmingPool", label: "Swimming Pool" },
  { name: "centralHeating", label: "Central Heating" },
  { name: "laundryRoom", label: "Laundry Room" },
  { name: "gym", label: "Gym" },
  { name: "alarm", label: "Alarm" },
  { name: "windowCovering", label: "Window Covering" },
  { name: "internet", label: "Internet" },
  { name: "petsAllow", label: "Pets Allowed" },
  { name: "freeWifi", label: "Free Wi-Fi" },
  { name: "carParking", label: "Car Parking" },
  { name: "spaMassage", label: "Spa / Massage" },
] as const;

export const PROPERTY_OTHER_FEATURES = [
  { name: "nearBySchools", label: "NearBy schools" },
  { name: "nearByTransports", label: "NearBy transports" },
  { name: "firePlace", label: "firePlace" },
] as const;

export const OPTION_RENT = [
  { name: "monthlyPayment", label: "Monthly Payment" },
  { name: "overalAmount", label: "Overal Amount" },
  { name: "devidedMonths", label: "Devided Months" },
] as const;
export const OPTION_SELL = [
  { name: "overalAmunt", label: "Overal Amount" },
  { name: "discount", label: "Discount" },
] as const;

export const PROPERTY_IMAGES = [
  "image1",
  "image2",
  "image3",
  "image4",
  "image5",
] as const;
// -------------------------------- helper function --------------

/* ----------------------------------
  FILE
----------------------------------- */
const fileRequired = z.union([z.instanceof(File), z.string().url()]);

const fileOptional = z
  .union([z.instanceof(File), z.string().url(), z.literal("")])
  .optional();

/* ----------------------------------
 Selling options
----------------------------------- */

export const decimalStringRequired = z
  .string()
  .trim()
  .min(1, "Required")
  .refine((val) => !Number.isNaN(Number(val)), {
    message: "Must be a number",
  });

export const decimalStringOptional = z
  .string()
  .trim()
  .refine((val) => val === "" || !Number.isNaN(Number(val)), {
    message: "Must be a number",
  })
  .optional();

const optionRentSchema = z.object({
  type: z.literal(SellingTypeEnum.RENT),
  monthlyPayment: decimalStringRequired,
  overalAmount: decimalStringRequired,
  devidedMonths: decimalStringRequired,
});

const optionSellSchema = z.object({
  type: z.literal(SellingTypeEnum.SALE),
  overalAmunt: decimalStringRequired,
  discount: decimalStringRequired,
});

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
 Amenities
----------------------------------- */
export const PropertyAmenitiesSchema = z.object({
  airConditioning: z.boolean(),
  swimmingPool: z.boolean(),
  centralHeating: z.boolean(),
  laundryRoom: z.boolean(),
  gym: z.boolean(),
  alarm: z.boolean(),
  windowCovering: z.boolean(),
  internet: z.boolean(),
  petsAllow: z.boolean(),
  freeWifi: z.boolean(),
  carParking: z.boolean(),
  spaMassage: z.boolean(),
});

/* ----------------------------------
 Main Property Schema
----------------------------------- */
export const PropertyFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  address: PropertyAddressSchema,
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(200, { message: "Description must be max 200 characters" }),

  // NUMBERS
  floors: decimalStringRequired,
  bathrooms: decimalStringRequired,
  bedrooms: decimalStringRequired,
  hall: decimalStringRequired,
  kitchen: decimalStringRequired,
  garageSpace: decimalStringRequired,
  area: decimalStringRequired,
  yearBuilt: decimalStringRequired,

  // SELECT OPTIONS
  propertyType: z.nativeEnum(PropertyType),
  heating: z.nativeEnum(PropertyHeating),
  cooling: z.nativeEnum(PropertyCooling),
  furnished: z.nativeEnum(PropertyFurnature),
  security: z.nativeEnum(PropertySecurity),
  mood: z.nativeEnum(PropertyMood),

  // AMENETIES
  amenities: PropertyAmenitiesSchema,

  // CHECKBOX OPTIONS
  nearBySchools: z.boolean(),
  nearByTransports: z.boolean(),
  firePlace: z.boolean(),

  // SELLING OPTIONS
  sellingOption: z.discriminatedUnion("type", [
    optionRentSchema,
    optionSellSchema,
  ]),

  // IMAGES
  images: z.object({
    image1: fileRequired,
    image2: fileRequired,
    image3: fileRequired,
    image4: fileRequired,
    image5: fileRequired,
  }),

  // VIDEO
  videos: fileOptional,
});

/* ----------------------------------
 Types
----------------------------------- */

export type PropertyFormInputType = z.input<typeof PropertyFormSchema>;
export type PropertyFormType = z.infer<typeof PropertyFormSchema>;
