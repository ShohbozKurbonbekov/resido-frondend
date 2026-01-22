import type {
  Agency,
  AgencyPaymentSubmit,
  AgencySubscriptionInfoType,
} from "@/lib/type/agency";
import type { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setAgencySubscriptionInfo } from "./slice";
import { retrieveAgencySubscriptionInfo } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { sweetCancelSubscription, sweetErrorHandling } from "@/lib/sweetAlerts";
import AgencyService from "@/app/services/Agency.service";
import SubscriptionHeader from "./AgencySubscription/SubscriptionHeader";
import SubscriptionCurrentPlan from "./AgencySubscription/SubscriptionCurrentPlan";
import SubscriptionUsage from "./AgencySubscription/SubscriptionUsage";
import SubscriptionHistory from "./AgencySubscription/SubscriptionHistory";
import { useGlobals } from "@/app/hooks/useGlobals";
import SubscriptionPlans from "./AgencySubscription/SubscriptionPlans";
import { SubscriptionStatus } from "@/lib/enums/agency.enum";
// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencySubscriptionInfoDispatch = (dispatch: Dispatch) => ({
  setAgencySubscriptionInfo: (data: AgencySubscriptionInfoType) =>
    dispatch(setAgencySubscriptionInfo(data)),
});

const agencySubscriptionInfoRetriever = createSelector(
  retrieveAgencySubscriptionInfo,
  (agencySubscriptionInfo) => ({ agencySubscriptionInfo }),
);

// ----------------------------------------- COMPONENT ----------------------------------
export default function AgencyDashboardBilling() {
  const { setAgencySubscriptionInfo } =
    agencySubscriptionInfoDispatch(useDispatch());
  const {
    agencySubscriptionInfo: { agencySubscription, tariffPlans },
  } = useSelector(agencySubscriptionInfoRetriever);
  const { authmember } = useGlobals();
  const agency = authmember as Agency;

  useEffect(() => {
    (async () => {
      try {
        const agency = new AgencyService();
        const result = await agency.getSubscriptionInfo();
        setAgencySubscriptionInfo(result);
      } catch (error) {
        console.log("Error in AgencySubscriptionInfo: ", error);
        await sweetErrorHandling(error!);
      }
    })();
  }, []);

  // ----------------------------------------- HANDLERS ----------------------------------
  const onSubscribe = useCallback(
    async (id: string) => {
      if (!id || !agencySubscription) {
        return null;
      }
      try {
        const agencyService = new AgencyService();
        const entityInput: AgencyPaymentSubmit = {
          billingCity: agencySubscription?.billingCity,
          billingPostalCode: agencySubscription.billingPostalCode,
          billingCountry: agencySubscription.billingCountry,
          billingEmail: agencySubscription.billingEmail,
          billingName: agencySubscription.billingName,
          billingTariffId: id,
        };
        const result = await agencyService.reProceedPayment(entityInput);
        setAgencySubscriptionInfo({
          agencySubscription: result,
          tariffPlans,
        });
      } catch (error) {
        console.log("Error in PaymentinfoContent onSubmit: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [setAgencySubscriptionInfo, tariffPlans, agencySubscription],
  );

  const onCancel = useCallback(async () => {
    try {
      const agency = new AgencyService();
      const confirmed = await sweetCancelSubscription(
        "Your plan will remain active until the end of the billing period.",
      );
      if (!confirmed) {
        return;
      }
      const result = await agency.cancelSubscription();
      setAgencySubscriptionInfo({ agencySubscription: result, tariffPlans });
    } catch (error) {
      console.log("Error in onCancel of AgencyDashboardBilling: ", error);
      await sweetErrorHandling(error!);
    }
  }, [setAgencySubscriptionInfo, tariffPlans]);

  const onRenew = useCallback(() => {
    console.log("It is running onRenew");
  }, []);
  // ----------------------------------------- RENDER ----------------------------------
  if (!agencySubscription) return null;
  console.log(agencySubscription);
  return (
    <div className="bg-white rounded-md px-3 py-5">
      {/* HEADER*/}
      <SubscriptionHeader />

      {/* CURRENT PLAN*/}
      <SubscriptionCurrentPlan
        planName={agencySubscription.billingSnapshot.name}
        amount={agencySubscription.amount}
        currency={agencySubscription.currency}
        billingCycle={agencySubscription.billingCyle}
        status={agencySubscription.subscriptionStatus}
        periodStart={agencySubscription.currentPeriodStart}
        periodEnd={agencySubscription.currentPeriodEnd}
        onCancel={!agencySubscription.cancelledAt ? onCancel : undefined}
        onRenew={onRenew}
        readonly={
          agencySubscription.subscriptionStatus === SubscriptionStatus.CANCELLED
        }
      />

      {/* USAGE*/}
      {agencySubscription.subscriptionStatus !==
        SubscriptionStatus.CANCELLED && (
        <SubscriptionUsage
          agentsUsed={agency.agentsTotalNumber}
          agentsLimit={agencySubscription.billingSnapshot.limit.agents}
          propertiesUsed={agency.propertiesTotalNumber}
          propertiesLimit={agencySubscription.billingSnapshot.limit.properties}
        />
      )}

      {/* HISTORY*/}
      <SubscriptionHistory
        billingName={agencySubscription.billingName}
        billingEmail={agencySubscription.billingEmail}
        billingCountry={agencySubscription.billingCountry}
        paymentProvider={agencySubscription.paymentProvider}
        lastPaymentAt={agencySubscription.lastPaymentAt}
        nextPaymentAt={agencySubscription.nextPaymentAt}
      />
      {agencySubscription.subscriptionStatus ===
        SubscriptionStatus.CANCELLED && (
        <SubscriptionPlans
          onSubscribe={onSubscribe}
          plans={tariffPlans}
          currentTariff={agencySubscription.billingTariffId}
        />
      )}
    </div>
  );
}
