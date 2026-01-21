import PricingDynamicHeaderSection from "@/app/components/PricingDynamicHeaderSection";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PricingHeader from "./PricingHeader";

export default function SelectPaymentTarrif() {
  const navigation = useNavigate();
  const handleClick = useCallback(
    (id: string) => {
      navigation(`/agencies/payment-info/${id}`, { replace: true });
    },
    [navigation],
  );
  return (
    <PricingDynamicHeaderSection
      pricingHeader={<PricingHeader />}
      handleClick={handleClick}
    />
  );
}
