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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useState } from "react";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { useNavigate } from "react-router-dom";
import {
  AGENCY_FORM_FIELDS,
  agencyRequiredInputSchema,
  type AgencyFormInputType,
  type AgencyFormType,
} from "@/app/data/agency";
import AgencyService from "@/app/services/AgencyService";
import { inputClasses, rowWrapperClasses, textClasses } from "@/lib/config";

export default function ApplyAgency() {
  const [certificateFileName, setCertificateFileName] =
    useState<string>("Choose a PDF file");

  const navigation = useNavigate();

  const form = useForm<AgencyFormInputType>({
    resolver: zodResolver(agencyRequiredInputSchema),
    defaultValues: {
      memberName: "",
      memberEmail: "",
      memberPhone: "",
      yearOfExperience: "",
      address: "",
      agencyOwner: "",
      licenseNumber: "",
      certificate: "",
    },
  });

  const onSubmit = useCallback(
    async (values: AgencyFormType) => {
      try {
        const agencyService = new AgencyService();
        await agencyService.registerAgency(values);

        await sweetTopSmallSuccessAlert("Agency registered successfully");
        navigation("/dashboard");
      } catch (error) {
        await sweetErrorHandling(error!);
      }
    },
    [navigation]
  );

  return (
    <section className="bg-sky-50 py-20">
      <div className="container max-w-3xl w-full">
        <h4 className="text-center mb-2 leading-relaxed font-jostFont tracking-tight text-lg capitalize text-darkBlue font-semibold lg:text-xl">
          Agency registration form
        </h4>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-md  p-2"
          >
            <div className={rowWrapperClasses}>
              {AGENCY_FORM_FIELDS.map(({ name, label, placeholder, type }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => {
                    if (type === "textarea") {
                      return (
                        <FormItem className="md:col-span-2">
                          <FormLabel className={textClasses}>{label}</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className={`${inputClasses} grid col-span-2 w-full`}
                              placeholder={placeholder}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }
                    return (
                      <FormItem>
                        <FormLabel className={textClasses}>{label}</FormLabel>
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
                    );
                  }}
                />
              ))}
            </div>

            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/40">
              <FormField
                control={form.control}
                name="certificate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className={textClasses}>
                      Registration Certificate (PDF)
                    </FormLabel>

                    <FormControl>
                      <div className="relative border border-slate-300 bg-slate-50 py-1.5 px-2 rounded-md truncate">
                        <Input
                          type="file"
                          accept="application/pdf"
                          className="opacity-0 absolute inset-0"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setCertificateFileName(file.name);
                            field.onChange(file);
                          }}
                        />
                        <span className="text-sm text-slate-600 truncate">
                          {certificateFileName}
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />
                    <p className="text-xs text-slate-500">
                      PDF only. Max size 5MB.
                    </p>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium"
            >
              Register Agency
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
