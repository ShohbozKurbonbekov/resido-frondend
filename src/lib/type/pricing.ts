import type { BillingCycle, TarrifStatus } from "../enums/pricing.enum";
import type { TotalCounter } from "./common";

export interface TarrifLimitsType {
  properties: number;
  agents: number;
}

export interface TarrifOutputType {
  _id: string;
  name: string;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
  limits: TarrifLimitsType;
  currency: string;
  durationDays: number;
  status: TarrifStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentTariffsType {
  paymentTariffs: TarrifOutputType[];
  metaCounter: TotalCounter[];
}
export interface BillingSnapShotType {
  name: string;
  features: string[];
  limit: TarrifLimitsType;
  usage: TarrifLimitsType;
}

export interface TariffInputType {
  name: string;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
  limits: TarrifLimitsType;
  currency: string;
}
