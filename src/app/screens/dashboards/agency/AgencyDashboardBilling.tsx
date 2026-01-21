import type { Agency, AgencySubscriptionInfoType } from "@/lib/type/agency";
import type { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setAgencySubscriptionInfo } from "./slice";
import { retrieveAgencySubscriptionInfo } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AgencyService from "@/app/services/Agency.service";
import SubscriptionHeader from "./AgencySubscription/SubscriptionHeader";
import SubscriptionCurrentPlan from "./AgencySubscription/SubscriptionCurrentPlan";
import SubscriptionUsage from "./AgencySubscription/SubscriptionUsage";
import SubscriptionHistory from "./AgencySubscription/SubscriptionHistory";
import { useGlobals } from "@/app/hooks/useGlobals";
import SubscriptionPlans from "./AgencySubscription/SubscriptionPlans";
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

  // ----------------------------------------- RENDER ----------------------------------
  if (!agencySubscription) return null;
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
        onCancel={() => {}}
        onRenew={() => {}}
      />

      {/* USAGE*/}
      <SubscriptionUsage
        agentsUsed={agency.agentsTotalNumber}
        agentsLimit={agencySubscription.billingSnapshot.limit.agents}
        propertiesUsed={agency.propertiesTotalNumber}
        propertiesLimit={agencySubscription.billingSnapshot.limit.properties}
      />

      {/* HISTORY*/}
      <SubscriptionHistory
        billingName={agencySubscription.billingName}
        billingEmail={agencySubscription.billingEmail}
        billingCountry={agencySubscription.billingCountry}
        paymentProvider={agencySubscription.paymentProvider}
        lastPaymentAt={agencySubscription.lastPaymentAt}
        nextPaymentAt={agencySubscription.nextPaymentAt}
      />
      <SubscriptionPlans
        plans={tariffPlans}
        currentTariff={agencySubscription.billingTariffId}
      />
    </div>
  );
}
