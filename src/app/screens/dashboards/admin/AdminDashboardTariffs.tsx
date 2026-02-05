import { useCallback, useEffect, useState } from "react";
import AdminTariffContent from "./tariff/AdminTariffContent";
import AdminTariffHeader from "./tariff/AdminTariffHeader";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import type { CommonInput } from "@/lib/type/common";
import { setAdminTariffPlans } from "./slice";
import type { PaymentTariffsType } from "@/lib/type/pricing";
import { retrieveAdminTariffPlans } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { TarrifStatus } from "@/lib/enums/pricing.enum";
import { SortOrder } from "@/lib/enums/blog.enum";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import AdminService from "@/app/services/Admin.service";

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
  const { setAdminTariffPlans } = adminTariffPlansDispatch(useDispatch());

  const { adminTariffPlans } = useSelector(adminTariffPlansRetriever);

  const [loading, setLoading] = useState<boolean>(true);
  const [adminTariffInput, setAdminTariffInput] = useState<
    CommonInput & { status?: TarrifStatus; sort?: SortOrder }
  >({
    page: 1,
    limit: 4,
    status: TarrifStatus.ACTIVE,
    sort: SortOrder.DESC,
  });

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

  // --------------------------------------- HANLDERS --------------------
  const onStatusChange = useCallback(
    (status: TarrifStatus) => {
      setAdminTariffInput((prev) => ({ ...prev, page: 1, status }));
    },
    [setAdminTariffInput],
  );
  const onSort = useCallback((sort: SortOrder) => {
    setAdminTariffInput((prev) => ({ ...prev, page: 1, sort }));
  }, []);
  // --------------------------------------- RENDER --------------------
  return (
    <div className="h-full flex flex-col gap-5">
      <AdminTariffHeader />
      <AdminTariffContent
        onSort={onSort}
        onStatusChange={onStatusChange}
        adminTariffPlans={adminTariffPlans}
        loading={loading}
        adminTariffInput={adminTariffInput}
        setAdminTariffInput={setAdminTariffInput}
      />
    </div>
  );
}
