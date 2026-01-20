import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectPaymentTarrif() {
  const navigation = useNavigate();

  const handleClick = useCallback(
    (id: number) => {
      navigation(`/agencies/payment-info/${id}`, { replace: true });
    },
    [navigation],
  );
  return (
    <section className="py-20">
      <div className="mb-8 text-center container font-jostFont">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
          Step 2 of 3
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Choose your plan
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Select a plan to continue. You’ll review your details and complete
          billing on the next step.
        </p>

        <p className="mt-2 text-xs text-slate-500">
          No charges yet. You’ll confirm before payment.
        </p>

        <div className="mx-auto mt-4 h-px w-16 bg-slate-200" />
      </div>

      <div className="container ">
        <div className="w-full max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {paymentPackages.map((card) => (
            <PaymentCard
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              paymentType={card.paymentType}
              benefits={card.benefits}
              handleClick={(id: number) => handleClick(id)}
            />
          ))} */}
        </div>
      </div>
    </section>
  );
}
