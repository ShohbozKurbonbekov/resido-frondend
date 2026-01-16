import type { PackagesType } from "@/lib/type/pricing";
import { paymentPackages } from "@/app/data/packages";
import PaymentCard from "@/app/components/Cards/MemberPayPackages";
import { useCallback } from "react";

export default function Packages() {
  const handleClick = useCallback((id: number) => {
    console.log(id);
    // emptyInputAlert("First, You need to apply for agency", true);
    // navigation(`/agencies/apply/agency-role`, { replace: true });
  }, []);
  return (
    <section className="py-20 bg-slate-50 flex justify-center">
      <div className="container flex flex-col gap-y-10 items-center ">
        <div className="max-w-lg flex flex-col items-center gap-y-2 text-darkBlue mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-tight text-3xl">
            See our packages
          </h2>
          <p className="mb-2 leading-onePointEight text-center">
            Explore a variety of property packages tailored to match your needs
            and budget.
          </p>
        </div>

        <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentPackages.map((card: PackagesType) => (
            <PaymentCard
              id={card.id}
              name={card.name}
              price={card.price}
              paymentType={card.paymentType}
              benefits={card?.benefits}
              handleClick={() => handleClick(card.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
