import AgencyService from "@/app/services/Agency.service";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { useEffect, useState } from "react";
import PaymentInfoHeader from "./PaymentInfoHeader";
import ValidationModel from "@/app/components/dialog/ValidationModel";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentInfo() {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [memberAllowed, setMemberAllowed] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const agency = new AgencyService();
      try {
        const result = await agency.validatePrePayment();
        setIsOpen(false);

        setMemberAllowed(result);
      } catch (error) {
        setIsOpen(false);
        console.log("Error in PaymentInfo: ", error);
        await sweetErrorHandling(error!);
        navigation(`/`, { replace: true });
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  //   );
  if (!id) return;
  return (
    <section className="py-20">
      <PaymentInfoHeader />

      {memberAllowed && (
        // <PaymentInfoContent id={Number(id)} />
        <div></div>
      )}
      <ValidationModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
