import type {
  PropertyCooling,
  PropertyFurnature,
  PropertyHeating,
  PropertyMood,
  PropertySecurity,
  PropertySortOrder,
  PropertyStatus,
  PropertyType,
  SellingTypeEnum,
} from "../enums/property.enum";
import type { AgentData } from "./agent";
import type { CommonInput, TotalCounter } from "./common";

// BACK END PART
interface PropertyAuthor {
  _id: string;
  fullName: string;
  rank: string;
}
interface SellingType {
  optionRent?: {
    type?: SellingTypeEnum.RENT;
    overalAmount?: number;
    monthlyPayment?: number;
    devidedMonths?: number;
  };
  optionSell?: {
    type?: SellingTypeEnum.SALE;
    overalAmunt?: number;
    discount?: string;
  };
}
interface GeocodeType {
  lat?: number;
  long?: number;
}

export interface PropertyAddress {
  street?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  country?: string;
  geoCode?: GeocodeType;
}

export interface PropertyAmenities {
  airConditioning?: boolean;
  swimmingPool?: boolean;
  centralHeating?: boolean;
  laundryRoom?: boolean;
  gym?: boolean;
  alarm?: boolean;
  windowCovering?: boolean;
  internet?: boolean;
  petsAllow?: boolean;
  freeWifi?: boolean;
  carParking?: boolean;
  spaMassage?: boolean;
}

export interface Property {
  _id: string;
  agencyId: string;
  agentId: string;
  title: string;
  status: PropertyStatus;
  sellingOption: SellingType;
  floors: number;
  propertyType: PropertyType;
  area: number;
  images: string[];
  bathrooms: number;
  bedrooms: number;
  hall: number;
  kitchen: number;
  author?: PropertyAuthor;
  agentData: AgentData;
  priceValue?: number;
  address: PropertyAddress;
  meLiked?: boolean;
  description: string;
  heating: PropertyHeating;
  cooling: PropertyCooling;
  furnished: PropertyFurnature;
  security: PropertySecurity;
  yearBuilt: number;
  garageSpace: number;
  amenities: PropertyAmenities;
  views: number;
  averageRating: number;
  totalLikes: number;
  featuredScore: number;
  totalComments: number;
  nearBySchools: boolean;
  nearByTransports: boolean;
  firePlace: boolean;
  videos: string[];
  recentBoost: number;
  comments?: [];
  daysSinceCreated: number;
  mood?: PropertyMood;
  totalSavings: number;
  meSaved?: boolean;
}

export interface CommonPropertyResults {
  properties: Property[];
  totalPropertiesNumber: TotalCounter[];
}

export interface ChosenProperty {
  mainProperty: Property[];
  trendingProperties: Property[];
}
// RECENT PROPERTY  TYPES
export type RecentPropertyForRent = CommonInput;
export type RecentPropertyResult = CommonPropertyResults;

// FEATURED PROPERTY TYPES
export type FeaturedPropertyInput = CommonInput;
export type FeaturedPropertyResults = CommonPropertyResults;

export interface PropertyPriceRange {
  start: number;
  end: number;
}
export interface PropertySearchFeatures {
  propertySearch?: string;
  propertyVerified?: boolean;
  propertyAgentLevel?: string | null;
  propertyLocation?: string;
  propertyType?: string;
  propertyBedrooms?: number;
  propertyAmenities?: PropertyAmenities | null;
  propertyMood?: string;
  propertyPriceRange?: PropertyPriceRange | null;
}
export type Properties = CommonPropertyResults;
export interface PropertiesSearchInput extends CommonInput {
  // 1. page:number
  // 2. limit:number
  order?: PropertySortOrder;
  search?: PropertySearchFeatures;
}

export interface ChosenPropertyStateType {
  propertyId: string;
  reLoadPropertyPage: boolean;
}

export interface MortageInputs {
  inputSales: string | number;
  inputPayment: string | number;
  inputLoan: string | number;
  inputInterestRate: string | number;
  mortgageValue: number;
}
/////////////////////////
// FRONT END TYPE
export type PropertyDetailReviewType = {
  reviewImage: string;
  reviewDate: string;
  reviewName: string;
  reviewDescription: string;
};

export type NearbySchoolsType = {
  schoolName: string;
  schoolDistanceFromProperty: string;
  schoolRatings: number;
  schoolReviewAmount: number;
};

export type PropertyDetailFeaturedPropertyType = {
  featuredPropertyImage: string;
  featuredPropertyName: string;
  featuredPropertyLocation: string;
  featuredPropertyState?: string;
  featuredPropertyPrice: string;
};

export type NearbyFoodRestaurantType = {
  restaurantName: string;
  restaurantDistanceFromProperty: string;
  restaurantRatings: number;
  restaurantReviewAmount: number;
};
