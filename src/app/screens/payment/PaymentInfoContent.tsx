import {
  AGENCY_SUBSCRIPTION_FIELDS,
  AgencySubscriptionSchema,
  paymentPackages,
  type AgencySubscriptionInput,
  type AgencySubscriptionType,
} from "@/app/data/packages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCallback, useMemo, useState } from "react";
import AgencyService from "@/app/services/AgencyService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { inputClasses, textClasses } from "@/lib/config";
import type { AgencyPaymentSubmit } from "@/lib/type/agency";
import { SubscriptionTarrif } from "@/lib/enums/agency.enum";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AgencyPaymentSuccessModal } from "./AgencyPaymentSuccessModal";
import { useGlobals } from "@/app/hooks/useGlobals";

//////////////////////////////////////// CLASSES ///////////////////////////
const gridContainerClasses =
  "border border-slate-300/60 py-6 px-4 rounded-md w-full max-w-sm mx-auto md:max-w-full";
const titleClasses =
  "text-slate-700 font-jostFont text-sm md:text-lg leading-relaxed font-semibold";
const subtitleWrapperClasses =
  "flex flex-row items-center justify-between gap-3 flex-wrap";
const subtitleClasses =
  "text-xs md:text-sm font-jostFont font-semibold capitalize ";
const lightSubtitleClasses =
  "text-slate-500 font-light font-jostFont text-xs md:text-sm";

/////////////////////////////////  COMPONENT //////////////////////////////
interface PaymentInfoContentType {
  id: number;
}

export default function PaymentInfoContent({ id }: PaymentInfoContentType) {
  const { setAuthMember } = useGlobals();
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isIdValid = paymentPackages.some((tarrif) => tarrif.id === Number(id));

  const currentPlan = paymentPackages.find((tarrif) => tarrif.id === id);

  const form = useForm<AgencySubscriptionInput>({
    resolver: zodResolver(AgencySubscriptionSchema),
    defaultValues: {
      billingAddress: "",
      billingCountry: "",
      billingEmail: "",
      billingName: "",
    },
  });

  const planTarrif = useMemo(() => {
    const planId = Number(id);
    if (planId === 1) {
      return SubscriptionTarrif.BASIC;
    }
    if (planId === 2) {
      return SubscriptionTarrif.STANDART;
    }
    return SubscriptionTarrif.PLATINUM;
  }, [id]);

  ////////////////////////////////////// HANDLERS ////////////////////
  const onSubmit = useCallback(
    async (values: AgencySubscriptionType) => {
      const agencyService = new AgencyService();

      try {
        const input: AgencyPaymentSubmit = {
          billingAddress: values.billingAddress,
          billingCountry: values.billingCountry,
          billingEmail: values.billingEmail,
          billingName: values.billingName,
          planName: planTarrif,
        };
        const result = await agencyService.proceedPayment(input);

        form.reset();
        setAuthMember(result);
        setIsOpen(true);
      } catch (error) {
        console.log("Error in PaymentinfoContent onSubmit: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [form, planTarrif, setAuthMember]
  );

  if (!isIdValid) {
    navigation("/", { replace: true });
    return null;
  }
  return (
    <>
      <div className="container ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div
              className={`w-full max-w-screen-lg mx-auto grid  grid-cols-1 md:grid-cols-12 gap-3 mt-5 items-start`}
            >
              <div className={`${gridContainerClasses} md:col-span-7`}>
                <div className="space-y-6 rounded-md p-2">
                  {AGENCY_SUBSCRIPTION_FIELDS.map(
                    ({ label, name, placeholder, type }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-1">
                            <FormLabel className={textClasses}>
                              {label}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type={type}
                                className={inputClasses}
                                placeholder={placeholder}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  )}
                </div>
              </div>
              <div
                className={`${gridContainerClasses} md:col-span-5 flex flex-col`}
              >
                <div className="pb-3 border-t-0 border-l-0 border-r-0 border border-b-slate-300/40">
                  <h5 className={titleClasses}>
                    {currentPlan?.name}
                    <div className={subtitleWrapperClasses}>
                      <span className={subtitleClasses}>total:</span>

                      <span className={lightSubtitleClasses}>
                        {currentPlan?.price}$
                      </span>
                    </div>
                    <div className={subtitleWrapperClasses}>
                      <span className={subtitleClasses}>payment type:</span>

                      <span className={lightSubtitleClasses}>
                        {currentPlan?.paymentType}
                      </span>
                    </div>
                  </h5>
                </div>

                <div className="mt-3">
                  <h4 className={titleClasses}>Your features</h4>
                  <ul className="list-none flex flex-col space-y-2 mt-2 w-full truncate">
                    {currentPlan?.benefits.map((benefit) => (
                      <li
                        className="flex flex-row  gap-2 items-center font-jostFont text-xs md:text-sm text-gray-500 w-full truncate"
                        key={benefit}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 mt-5 pt-3 border border-t-slate-300/40 border-l-0 border-r-0  border-b-0 flex flex-col justify-end">
                  <Button
                    type="submit"
                    className="py-5 px-2 text-center bg-blue-500 hover:bg-blue-700 transition-colors duration-200 ease-linear text-white hover:text-white font-jostFont font-normal"
                  >
                    Proceed Payment
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <AgencyPaymentSuccessModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
