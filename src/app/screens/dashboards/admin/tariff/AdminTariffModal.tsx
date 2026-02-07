import AdminTariffSubmitForm from "@/app/components/AdminTariffSubmitForm";
import type {
  AdminSubmitTariffSchemaInput,
  AdminSubmitTariffSchemaOutput,
} from "@/app/data/admin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SetStateType } from "@/lib/type/common";
import type { TarrifOutputType } from "@/lib/type/pricing";

interface AdminTariffModalType {
  setModalOpen: SetStateType<boolean>;
  openModal: boolean;
  fetchedTariff: TarrifOutputType;
  setFetchedTariff: SetStateType<TarrifOutputType | null>;
  onEdit: (values: AdminSubmitTariffSchemaOutput) => Promise<void>;
  setTariffId: SetStateType<null | string>;

  onAddFeature: () => void;
  onRemoveFeature: (str: string) => void;
  featureInput: string;
  setFeatureInput: SetStateType<string>;
  features: string[];
}

export function AdminTariffModal({
  fetchedTariff,
  onEdit,
  openModal,
  setFetchedTariff,
  setModalOpen,
  setTariffId,
  featureInput,
  onAddFeature,
  onRemoveFeature,
  setFeatureInput,
  features,
}: AdminTariffModalType) {
  const { billingCycle, currency, durationDays, limits, name, price } =
    fetchedTariff;

  const INITIAL_INPUT: AdminSubmitTariffSchemaInput = {
    billingCycle,
    currency,
    durationDays: String(durationDays),
    limits: {
      agents: String(limits.agents),
      properties: String(limits.properties),
    },
    name,
    price: String(price),
  };
  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        if (!open) {
          setFetchedTariff(null);
          setTariffId(null);
        }

        setModalOpen(open);
      }}
    >
      <DialogContent className="w-11/12 max-w-screen-lg h-5/6 overflow-auto">
        <DialogHeader>
          <DialogTitle className="absolute -left-[2000px]">
            Edit Your Tariff Plan
          </DialogTitle>
        </DialogHeader>

        <AdminTariffSubmitForm
          featureInput={featureInput}
          features={features}
          onAddFeature={onAddFeature}
          onRemoveFeature={onRemoveFeature}
          onSubmit={onEdit}
          setFeatureInput={setFeatureInput}
          {...INITIAL_INPUT}
          containerClasses="w-full h-full flex flex-col items-stretch"
        />
      </DialogContent>
    </Dialog>
  );
}
