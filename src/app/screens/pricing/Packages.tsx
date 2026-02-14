import PricingDynamicHeaderSection from "@/app/components/PricingDynamicHeaderSection";
import { confirmAgencyStepOne } from "@/app/data/packages";
import { useGlobals } from "@/app/hooks/useGlobals";
import { ErrorMessages } from "@/lib/config";
import { MemberType } from "@/lib/enums/agent.enum";
import { sweetConfirmHandling, sweetFailureProvider } from "@/lib/sweetAlerts";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const { authmember } = useGlobals();
  const navigation = useNavigate();
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

  const handleClick = useCallback(async () => {
    if (!authmember) {
      return sweetFailureProvider(ErrorMessages.error2, true, "/");
    }

    if (authmember.role !== MemberType.USER) {
      return sweetFailureProvider(
        "Only common users are allowed for agency position",
        true,
      );
    }

    if (await sweetConfirmHandling(confirmAgencyStepOne))
      return navigation("/agencies/apply/agency-role");
  }, [authmember, navigation]);
  return (
    <PricingDynamicHeaderSection
      handleClick={handleClick}
      sectionClasses="py-20 bg-slate-50 flex justify-center"
      pricingHeader={pricingHeader}
    />
  );
}
