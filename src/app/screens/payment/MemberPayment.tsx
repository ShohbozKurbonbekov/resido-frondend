import { useEffect, useState } from "react";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { useNavigate } from "react-router-dom";
import AgencyService from "@/app/services/AgencyService";
import ValidationModel from "@/app/components/dialog/ValidationModel";
import SelectPaymentTarrif from "./SelectPaymentTarrif";

export default function MemberPayment() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [memberAllowed, setMemberAllowed] = useState<boolean>(false);

  const navigation = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const agency = new AgencyService();
      try {
        const result = await agency.validatePrePayment();
        setIsOpen(false);

        setMemberAllowed(result);
      } catch (error) {
        setIsOpen(false);
        console.log("Error in validateAgency: ", error);
        await sweetErrorHandling(error!);
        navigation("/", { replace: true });
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <>
      {memberAllowed && <SelectPaymentTarrif />}

      <ValidationModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
