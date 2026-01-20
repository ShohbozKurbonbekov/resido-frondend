import { useCallback, useEffect, useMemo, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { retrieveTariffPlans } from "./selector";
import NoFound from "@/app/components/NoFound";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import type { CommonInput } from "@/lib/type/common";
import { PaginationCom } from "@/app/components/PaginationCom";
import { setTariffPlans } from "./slice";
import type { PaymentTariffsType, TarrifOutputType } from "@/lib/type/pricing";
import PaymentCard from "@/app/components/Cards/MemberPayPackages";
import MemberService from "@/app/services/Member.service";

const wrapperClasses =
  "w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const tariffPlansDispatch = (dispatch: Dispatch) => ({
  setTariffPlans: (data: PaymentTariffsType) => dispatch(setTariffPlans(data)),
});

const tariffPlansRetriever = createSelector(
  retrieveTariffPlans,
  (tariffPlans) => ({ tariffPlans }),
);

export default function Packages() {
  const { setTariffPlans } = tariffPlansDispatch(useDispatch());
  const { tariffPlans } = useSelector(tariffPlansRetriever);

  const [tariffInputs, setTariffInputs] = useState<CommonInput>({
    page: 1,
    limit: 3,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const totalPages = useMemo(() => {
    return Math.ceil(
      (tariffPlans.metaCounter[0]?.total ?? 0) / tariffInputs.limit,
    );
  }, [tariffPlans.metaCounter, tariffInputs.limit]);

  useEffect(() => {
    (async () => {
      const member = new MemberService();
      try {
        const result = await member.paymentTariffs(tariffInputs);
        setTariffPlans(result);
      } catch (error) {
        console.log("Error in fetching paymentTariffs: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [tariffInputs]);

  const handleClick = useCallback((id: string) => {
    console.log(id);
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

        {loading ? (
          <SpinnerGrids columns={wrapperClasses} />
        ) : tariffPlans.paymentTariffs.length ? (
          <>
            <div className={wrapperClasses}>
              {tariffPlans.paymentTariffs.map((card: TarrifOutputType) => (
                <PaymentCard
                  key={card._id}
                  currency={card.currency}
                  id={card._id}
                  name={card.name}
                  price={card.price}
                  paymentType={card.billingCycle}
                  benefits={card?.features}
                  handleClick={() => handleClick(card._id)}
                />
              ))}
            </div>
            {totalPages > 1 ? (
              <PaginationCom
                totalPages={totalPages}
                styleclasses="flex flex-row items-center justify-center  gap-3"
                currentPage={tariffInputs.page}
                onPageChange={setTariffInputs}
              />
            ) : null}
          </>
        ) : (
          <NoFound title="No Tariff Plans for now" />
        )}
      </div>
    </section>
  );
}
