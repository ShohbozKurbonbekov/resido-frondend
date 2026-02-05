import { BillingCycle } from "@/lib/enums/pricing.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ADMIN_TARIFF_FORM_INITIAL,
  adminSubmitTariffSchema,
  adminTariffFormFields,
  type AdminSubmitTariffSchemaInput,
  type AdminSubmitTariffSchemaOutput,
} from "@/app/data/admin";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import RenderField from "../screens/AdminFeaturesPage/RenderField";
import { useCallback } from "react";
import { emptyInputAlert, sweetErrorHandling } from "@/lib/sweetAlerts";
import type { SetStateType } from "@/lib/type/common";
import { inputClasses, rowWrapperClasses } from "@/lib/config";
import { Input } from "@/components/ui/input";
import { CircleX, MessageCircleWarningIcon } from "lucide-react";

// ------------------------ Component ----------------------------
interface AdminTariffSubmitFormType {
  name: string;
  price: string;
  currency: string;
  billingCycle: BillingCycle;
  durationDays: string;
  features: string[];
  limits: {
    agents: string;
    properties: string;
  };
  onAddFeature: () => void;
  onRemoveFeature: (str: string) => void;
  featureInput: string;
  setFeatureInput: SetStateType<string>;
  onSubmit: (values: AdminSubmitTariffSchemaOutput) => Promise<void>;
  containerClasses: string;
}
export default function AdminTariffSubmitForm(
  props: AdminTariffSubmitFormType,
) {
  const {
    billingCycle,
    currency,
    durationDays,
    limits: { agents, properties },
    name,
    price,
    onSubmit,
    containerClasses,
    featureInput,
    features,
    onAddFeature,
    onRemoveFeature,
    setFeatureInput,
  } = props;
  const form = useForm<AdminSubmitTariffSchemaInput>({
    resolver: zodResolver(adminSubmitTariffSchema),
    defaultValues: {
      name,
      price,
      currency,
      billingCycle,
      durationDays,

      limits: {
        agents,
        properties,
      },
    },
  });

  // ------------------------ Handlers ----------------------------
  const handleSubmit = useCallback(
    async (values: AdminSubmitTariffSchemaOutput) => {
      try {
        if (!features.length) {
          return await emptyInputAlert("Please give required features!", true);
        }
        await onSubmit(values);
        form.reset(ADMIN_TARIFF_FORM_INITIAL);
      } catch (error) {
        console.log("Error in AdminTarifSubmitForm: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [onSubmit, form, features],
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className={containerClasses}>
          {/* Header */}
          <div className="my-5 flex flex-col items-center font-jostFont capitalize ">
            <h1 className="text-lg font-medium text-slate-900">Add Tariff</h1>
            <p className="text-xs text-slate-500">
              Pricing and limits configuration
            </p>
          </div>

          {/* Cards */}
          {adminTariffFormFields.map((field) => (
            <RenderField
              control={form.control}
              fieldConfig={field}
              key={field.name}
            />
          ))}

          <div className={rowWrapperClasses}>
            <div className="col-span-2 space-y-2">
              <h5 className="text-base text-gray-600 font-jostFont font-semibold">
                Adding Features is limited — add up to 10
              </h5>

              {/* TAG INPUT */}
              <Input
                type="text"
                className={inputClasses}
                placeholder="Type a feaute and press Enter"
                value={featureInput}
                disabled={features.length >= 10}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddFeature();
                  }
                }}
              />
              {featureInput.length > 100 && (
                <span className="text-amber-400 font-jostFont text-xs flex flex-row gap-x-1 items-start">
                  <MessageCircleWarningIcon className="h-4 w-4" />
                  feature must be shorter than 100 characters
                </span>
              )}

              {/* Helpers */}
              <div className="flex justify-between text-xs text-slate-500">
                <span>add property to 10</span>
                <span>{features.length} / 10</span>
              </div>

              {/* TAG PILLS */}
              <ul className="flex flex-col gap-2 pt-2 w-full">
                {features.map((f) => (
                  <li
                    key={f}
                    className="font-jostFont text-xs  gap-1 flex items-center"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-500"></span>
                    <span className="break-words leading-tight line-clamp-1 text-muted-foreground">
                      {f}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveFeature(f)}
                      className="hover:text-emerald-950 text-red-500"
                    >
                      <CircleX className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/*Submit button*/}
          <Button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium focus-visible:ring-2  focus-visible:ring-emerald-700/30 transition-all duration-200 ease-linear"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
