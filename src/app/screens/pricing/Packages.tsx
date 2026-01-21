import PricingDynamicHeaderSection from "@/app/components/PricingDynamicHeaderSection";
import { useCallback } from "react";

export default function Packages() {
  const pricingHeader = (
    <div className="text-center">
      <h2 className="font-bold capitalize font-jostFont leading-tight text-3xl">
        See our packages
      </h2>
      <p className="mb-2 leading-onePointEight text-center">
        Explore a variety of property packages tailored to match your needs and
        budget.
      </p>
    </div>
  );

  const handleClick = useCallback((id: string) => {
    console.log(id);
  }, []);
  return (
    <PricingDynamicHeaderSection
      handleClick={handleClick}
      sectionClasses="py-20 bg-slate-50 flex justify-center"
      pricingHeader={pricingHeader}
    />
  );
}
