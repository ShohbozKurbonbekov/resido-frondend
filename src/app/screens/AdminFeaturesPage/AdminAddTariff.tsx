import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import AdminTariffSubmitForm from "@/app/components/AdminTariffSubmitForm";
import { useCallback, useState } from "react";
import {
  ADMIN_TARIFF_FORM_INITIAL,
  type AdminSubmitTariffSchemaOutput,
} from "@/app/data/admin";
import { sweetTopSmallSuccessAlert } from "@/lib/sweetAlerts";
import AdminService from "@/app/services/Admin.service";

// --------------------------- Classes ------------------------
const containerClasses = `w-full max-w-screen-md mx-auto grid grid-cols-1 gap-y-2 my-10 py-5 sm:py-8 px-5 sm:px-5 border  border-slate-300/60 rounded-md`;

// ------------------------ Component ----------------------------
export default function AdminAddTariff() {
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  // ------------------------ Handlers ----------------------------
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

  const onSubmit = useCallback(
    async (values: AdminSubmitTariffSchemaOutput) => {
      if (!values) return;
      try {
        const admin = new AdminService();
        await admin.adminAddTariff(values, features);
        await sweetTopSmallSuccessAlert("Tariff successfully created");
      } catch (error) {
        console.log("Error in AdminAddTariff: ", error);
        throw error;
      }
    },
    [features],
  );
  // ------------------------ Render ----------------------------
  return (
    <main>
      <SectionIntroNoBackground
        title="Create Payment Tariff"
        subtitle="Define pricing, limits, and features to add a new tariff plan to the system."
      />
      <section>
        <div className="container">
          <AdminTariffSubmitForm
            setFeatureInput={setFeatureInput}
            featureInput={featureInput}
            onAddFeature={onAddFeatures}
            onRemoveFeature={onRemoveFeature}
            features={features}
            containerClasses={containerClasses}
            {...ADMIN_TARIFF_FORM_INITIAL}
            onSubmit={onSubmit}
          />
        </div>
      </section>
    </main>
  );
}
