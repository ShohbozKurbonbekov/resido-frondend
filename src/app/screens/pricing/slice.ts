import type { PaymentTariffsPage } from "@/lib/type/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PaymentTariffsPage = {
  tariffPlans: { paymentTariffs: [], metaCounter: [{ total: 0 }] },
};

const paymentTariffsPageSlice = createSlice({
  name: "paymentTariffsPage",
  initialState,
  reducers: {
    setTariffPlans: (state, action) => {
      state.tariffPlans = action.payload;
    },
  },
});

export const { setTariffPlans } = paymentTariffsPageSlice.actions;

const PaymentTariffsPageSliceReducer = paymentTariffsPageSlice.reducer;
export default PaymentTariffsPageSliceReducer;
