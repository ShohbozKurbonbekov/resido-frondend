import type { AppRootState } from "@/lib/type/screen";
import { createSelector } from "@reduxjs/toolkit";

const selectPaymentTariffsPage = (state: AppRootState) =>
  state.paymentTariffsPage;

export const retrieveTariffPlans = createSelector(
  selectPaymentTariffsPage,
  (paymentTariffsPage) => paymentTariffsPage.tariffPlans,
);
