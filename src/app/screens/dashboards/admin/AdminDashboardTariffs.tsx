import { useCallback, useEffect, useState } from "react";
import AdminTariffContent from "./tariff/AdminTariffContent";
import AdminTariffHeader from "./tariff/AdminTariffHeader";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import type { CommonInput } from "@/lib/type/common";
import { setAdminTariffPlans } from "./slice";
import type { PaymentTariffsType, TarrifOutputType } from "@/lib/type/pricing";
import { retrieveAdminTariffPlans } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { TarrifStatus } from "@/lib/enums/pricing.enum";
import { SortOrder } from "@/lib/enums/blog.enum";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import AdminService from "@/app/services/Admin.service";
import MemberService from "@/app/services/Member.service";
import type { AdminSubmitTariffSchemaOutput } from "@/app/data/admin";
import { setTariffPlans } from "../../pricing/slice";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const adminTariffPlansDispatch = (dispatch: Dispatch) => ({
  setAdminTariffPlans: (data: PaymentTariffsType) =>
    dispatch(setAdminTariffPlans(data)),
});

const adminTariffPlansRetriever = createSelector(
  retrieveAdminTariffPlans,
  (adminTariffPlans) => ({ adminTariffPlans }),
);

// --------------------------------------- COMPONENT --------------------

export default function AdminDashboardTariffs() {
  // Fetch and Set REDUX
  const { setAdminTariffPlans } = adminTariffPlansDispatch(useDispatch());
  const { adminTariffPlans } = useSelector(adminTariffPlansRetriever);

  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fetchedTariff, setFetchedTariff] = useState<null | TarrifOutputType>(
    null,
  );
  const [tariffId, setTariffId] = useState<null | string>(null);
  const [adminTariffInput, setAdminTariffInput] = useState<
    CommonInput & { status?: TarrifStatus; sort?: SortOrder }
  >({
    page: 1,
    limit: 4,
    status: TarrifStatus.ACTIVE,
    sort: SortOrder.DESC,
  });

  const [features, setFeatures] = useState<string[]>(
    fetchedTariff?.features || [],
  );

  const [featureInput, setFeatureInput] = useState("");

  // Fetch Tariffs
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const admin = new AdminService();
        const result = await admin.adminTariffPlans(adminTariffInput);
        setAdminTariffPlans(result);
      } catch (error) {
        console.log("Error in AdminDashboardTariffs: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [adminTariffInput]);

  // Fetch a specific tariff
  useEffect(() => {
    if (!tariffId) return;
    (async () => {
      try {
        const member = new MemberService();
        const result = await member.getTariff(tariffId);
        setOpenModal(true);
        setFetchedTariff(result);
      } catch (error) {
        setTariffId(null);
        console.log(
          "Error in fetching tariff data in AdminDashboardTariff: ",
          error,
        );
        await sweetErrorHandling(error!);
      }
    })();
  }, [tariffId]);

  // Reset features
  useEffect(() => {
    if (fetchedTariff?.features) {
      setFeatures(fetchedTariff.features);
    } else {
      setFeatures([]);
    }
  }, [fetchedTariff]);
  // --------------------------------------- HANLDERS --------------------
  const onAddFeatures = useCallback(() => {
    const value = featureInput.trim();

    if (!value) return;
    if (value.length > 100) return;
    if (features.includes(value)) return;
    if (features.length >= 10) return;

    setFeatures((prev) => [...prev, value]);
    setFeatureInput("");
  }, [featureInput, features]);

  const onRemoveFeature = useCallback((f: string) => {
    setFeatures((prev) => prev.filter((feature) => feature !== f));
  }, []);

  const onStatusChange = useCallback(
    (status: TarrifStatus) => {
      setAdminTariffInput((prev) => ({ ...prev, page: 1, status }));
    },
    [setAdminTariffInput],
  );
  const onSort = useCallback((sort: SortOrder) => {
    setAdminTariffInput((prev) => ({ ...prev, page: 1, sort }));
  }, []);

  const onEdit = useCallback(
    async (values: AdminSubmitTariffSchemaOutput) => {
      // Check canSubmit
      if (!tariffId) return;

      // Prepare valid input
      const normalizedInput: Partial<TarrifOutputType> = {
        ...(values?.billingCycle ? { billingCycle: values.billingCycle } : {}),
        ...(values?.currency ? { currency: values.currency } : {}),
        ...(values?.durationDays
          ? { durationDays: Number(values.durationDays) }
          : {}),
        ...(features.length ? { features } : {}),
        ...(Object.keys(values?.limits).length
          ? {
              limits: {
                agents: Number(values.limits.agents),
                properties: Number(values.limits.properties),
              },
            }
          : {}),

        ...(values?.price ? { price: Number(values.price) } : {}),
        _id: tariffId,
        status: fetchedTariff?.status,
        name: values.name,
      };

      // Update REDUX
      const prevTariffs = adminTariffPlans;
      const updatedTariffs = prevTariffs.paymentTariffs.map((tariff) =>
        tariff._id === tariffId ? normalizedInput : tariff,
      );

      setAdminTariffPlans({
        metaCounter: prevTariffs.metaCounter,
        paymentTariffs: updatedTariffs as TarrifOutputType[],
      });

      try {
        const admin = new AdminService();
        await admin.adminEditTariff(tariffId, values, features);
        await sweetTopSmallSuccessAlert("Tariff successfully edited");
        setOpenModal(false);
        setFetchedTariff(null);
        setTariffId(null);
      } catch (error) {
        setTariffPlans(prevTariffs);
        console.log("Error in onEdit of AdminDashboardTariffs: ", error);
        throw error;
      }
    },
    [features, tariffId, fetchedTariff, adminTariffPlans, setAdminTariffPlans],
  );

  const onAdminStatusChange = useCallback(
    async (id: string, status: TarrifStatus) => {
      const prevTariffs = adminTariffPlans;

      const uptdatedTariffs = prevTariffs.paymentTariffs.filter(
        (t) => t._id !== id,
      );

      setAdminTariffPlans({
        metaCounter: prevTariffs.metaCounter,
        paymentTariffs: uptdatedTariffs,
      });

      try {
        const admin = new AdminService();
        await admin.adminChangeTariffStatus(id, status);
      } catch (error) {
        setAdminTariffPlans(prevTariffs);
        console.log("Error in onAdminStatusChange: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [adminTariffPlans, setAdminTariffPlans],
  );
  // --------------------------------------- RENDER --------------------
  return (
    <div className="h-full flex flex-col gap-5">
      <AdminTariffHeader />
      <AdminTariffContent
        onAdminStatusChange={onAdminStatusChange}
        features={features}
        setFetchedTariff={setFetchedTariff}
        tariffId={tariffId}
        onSort={onSort}
        onStatusChange={onStatusChange}
        adminTariffPlans={adminTariffPlans}
        loading={loading}
        adminTariffInput={adminTariffInput}
        setAdminTariffInput={setAdminTariffInput}
        fetchedTariff={fetchedTariff}
        onEdit={onEdit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setTariffId={setTariffId}
        featureInput={featureInput}
        onAddFeature={onAddFeatures}
        onRemoveFeature={onRemoveFeature}
        setFeatureInput={setFeatureInput}
      />
    </div>
  );
}
