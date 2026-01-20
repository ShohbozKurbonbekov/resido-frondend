import type {
  BillingCycle,
  TarrifCurrencyType,
  TarrifName,
  TarrifStatus,
} from "../enums/pricing.enum";
import type { TotalCounter } from "./common";

export interface TarrifLimitsType {
  properties: number;
  agents: number;
}

export interface TarrifOutputType {
  _id: string;
  name: TarrifName;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
  limits: TarrifLimitsType;
  currency: TarrifCurrencyType;
  durationDays: number;
  status: TarrifStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentTariffsType {
  paymentTariffs: TarrifOutputType[];
  metaCounter: TotalCounter[];
}
