import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import AdminTariffCard from "./AdminTariffCard";
import type { PaymentTariffsType, TarrifOutputType } from "@/lib/type/pricing";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import AdminTariffCategory from "./AdminTariffCategory";
import type { TarrifStatus } from "@/lib/enums/pricing.enum";
import type { SortOrder } from "@/lib/enums/blog.enum";
import { AdminTariffModal } from "./AdminTariffModal";
import type { AdminSubmitTariffSchemaOutput } from "@/app/data/admin";

// --------------------- Classes ------------------
const leftContainerClasses = "md:col-span-8 rounded-md order-4 md:order-0";

const adminTariffWrapperClasses = "grid grid-cols-1 md:grid-cols-2 gap-3";

interface AdminTariffContentType {
  setAdminTariffInput: SetStateType<
    CommonInput & { status?: TarrifStatus; sort?: SortOrder }
  >;
  adminTariffInput: CommonInput & { status?: TarrifStatus; sort?: SortOrder };
  loading: boolean;
  adminTariffPlans: PaymentTariffsType;
  onStatusChange: (status: TarrifStatus) => void;
  onSort: (status: SortOrder) => void;
  onEdit: (values: AdminSubmitTariffSchemaOutput) => Promise<void>;
  fetchedTariff: TarrifOutputType | null;
  setFetchedTariff: SetStateType<null | TarrifOutputType>;
  setTariffId: SetStateType<null | string>;
  tariffId: string | null;
  openModal: boolean;
  setOpenModal: SetStateType<boolean>;

  onAddFeature: () => void;
  features: string[];
  onRemoveFeature: (str: string) => void;
  featureInput: string;
  setFeatureInput: SetStateType<string>;
  onAdminStatusChange: (id: string, status: TarrifStatus) => Promise<void>;
}
export default function AdminTariffContent({
  adminTariffInput,
  setAdminTariffInput,
  adminTariffPlans,
  loading,
  onStatusChange,
  onSort,
  fetchedTariff,
  setFetchedTariff,
  onEdit,
  openModal,
  setOpenModal,
  setTariffId,
  tariffId,
  featureInput,
  onAddFeature,
  onRemoveFeature,
  setFeatureInput,
  features,
  onAdminStatusChange,
}: AdminTariffContentType) {
  return (
    <div className="flex-1 flex flex-col justify-between gap-y-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start justify-start ">
        {loading ? (
          <div className={leftContainerClasses}>
            <SpinnerGrids
              columns={adminTariffWrapperClasses}
              count={3}
              cardRadius="rounded-md"
            />
          </div>
        ) : adminTariffPlans.paymentTariffs.length ? (
          <div
            className={`${leftContainerClasses} ${adminTariffWrapperClasses}`}
          >
            {adminTariffPlans.paymentTariffs.map((tariff) => (
              <AdminTariffCard
                onAdminStatusChange={onAdminStatusChange}
                key={tariff._id}
                tariff={tariff}
                setTariffId={setTariffId}
              />
            ))}
          </div>
        ) : (
          <div className={`${leftContainerClasses} bg-white`}>
            <NoFound title="No Tariff Plans" />
          </div>
        )}

        <div className="md:col-span-4 order-1 md:order-5 bg-white rounded-md p-4 w-full max-w-2xl mx-auto">
          <AdminTariffCategory
            onSort={onSort}
            onStatusChange={onStatusChange}
            adminTariffInput={adminTariffInput}
            setAdminTariffInput={setAdminTariffInput}
          />
        </div>
      </div>
      {!!adminTariffPlans.paymentTariffs.length && (
        <PaginationCom
          totalPages={Math.ceil(
            (adminTariffPlans.metaCounter[0]?.total || 0) /
              adminTariffInput.limit,
          )}
          styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
          currentPage={adminTariffInput.page}
          onPageChange={setAdminTariffInput}
        />
      )}

      {fetchedTariff && tariffId && setFetchedTariff && (
        <AdminTariffModal
          fetchedTariff={fetchedTariff}
          onEdit={onEdit}
          openModal={openModal}
          setFetchedTariff={setFetchedTariff}
          setModalOpen={setOpenModal}
          setTariffId={setTariffId}
          featureInput={featureInput}
          onAddFeature={onAddFeature}
          onRemoveFeature={onRemoveFeature}
          setFeatureInput={setFeatureInput}
          features={features}
        />
      )}
    </div>
  );
}
