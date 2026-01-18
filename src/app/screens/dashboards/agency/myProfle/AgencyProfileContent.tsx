import {
  AGENCY_FORM_FIELDS,
  agencyProfileSchema,
  type AgencyPofileInput,
  type AgencyProfileType,
} from "@/app/data/agency";
import { useGlobals } from "@/app/hooks/useGlobals";
import {
  defaultUserAvatar,
  errorClasses,
  inputClasses,
  rowWrapperClasses,
  serverAPI,
  textClasses,
} from "@/lib/config";
import type { Agency } from "@/lib/type/agency";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AgencyService from "@/app/services/AgencyService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { USER_SOCIALS } from "@/app/data/dashboard/user";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AgencyProfileContent() {
  const { setAuthMember, authmember } = useGlobals();
  const navigation = useNavigate();
  const agency = authmember as Agency;
  const [avatarPreview, setAvatarPreview] = useState<string>(
    agency.avatar ? `${serverAPI}/${agency.avatar}` : defaultUserAvatar,
  );

  const [fileName, setFileName] = useState<string>("Choose an image");

  const [certificateFileName, setCertificateFileName] =
    useState<string>("Choose a file");

  const [certificateFile, setCertificateFile] = useState<string | null>(
    agency.certificate ? `${serverAPI}/${agency.certificate}` : null,
  );

  const form = useForm<AgencyPofileInput>({
    resolver: zodResolver(agencyProfileSchema),
    defaultValues: {
      address: agency.address,
      agencyOwner: agency.agencyOwner,
      avatar: undefined,
      bioInfo: agency?.bioInfo ? agency.bioInfo : "",
      certificate: null,
      licenseNumber: agency.licenseNumber,
      memberEmail: agency.memberEmail,
      memberName: agency.memberName,
      memberPhone: agency.memberPhone,
      socialLinks: agency?.socialLinks,
      yearOfExperience: String(agency.yearOfExperience),
    },
  });

  const onSubmit = useCallback(
    async (values: AgencyProfileType) => {
      try {
        const target = new AgencyService();
        const agencyData = await target.updateAgencyProfile(values);
        await sweetTopSmallSuccessAlert("Your Profile has been changed");

        setAuthMember(agencyData);
      } catch (error) {
        console.log("Error in AgencyProfile Content: ", error);
        await sweetErrorHandling(error!);
        navigation("/", { replace: true });
      }
    },
    [setAuthMember, navigation],
  );
  return (
    <Card className="w-full border border-slate-200 bg-slate-50/60 shadow-sm  rounded-md">
      <CardHeader className="border-b border-slate-200 bg-white rounded-md rounded-br-none rounded-bl-none">
        <CardTitle className="text-lg font-semibold text-slate-800 font-jostFont">
          Agency Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white rounded-md  p-5"
          >
            {/*IMAGE  */}
            <div className="flex sm:flex-row flex-col items-center gap-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-slate-300 bg-slate-100 ">
                <img
                  src={avatarPreview}
                  alt={agency.memberName}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel
                        className={`${textClasses} sm:text-start text-center`}
                      >
                        Profile Image
                      </FormLabel>

                      <FormControl>
                        <div className="border border-slate-200 bg-slate-50/50 relative py-1 px-3 rounded-md line-clamp-2 font-jostFont">
                          <Input
                            type="file"
                            accept="image/*"
                            className="border-none opacity-0 absolute inset-0"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              const url = URL.createObjectURL(file);
                              setAvatarPreview(url);
                              setFileName(file.name);
                              field.onChange(file);
                            }}
                          />
                          <span className={`${textClasses} w-full truncate`}>
                            {fileName}
                          </span>
                        </div>
                      </FormControl>

                      <FormMessage className={errorClasses} />
                      <p className="text-xs text-slate-500">
                        JPG, JPEG or PNG. Square images recommended.
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className={rowWrapperClasses}>
              {AGENCY_FORM_FIELDS.map(({ label, name, placeholder, type }) => (
                <FormField
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={type}
                          className={inputClasses}
                          {...field}
                          placeholder={placeholder}
                        />
                      </FormControl>
                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div
              className={
                "rounded-lg border border-slate-200 p-4 bg-slate-50/40"
              }
            >
              <FormField
                control={form.control}
                name="bioInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        className={inputClasses}
                        placeholder="About You..."
                      />
                    </FormControl>
                    <FormMessage className={errorClasses} />
                  </FormItem>
                )}
              />
            </div>

            <div className={rowWrapperClasses}>
              {USER_SOCIALS.map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`socialLinks.${key}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`${textClasses} capitalize`}>
                        {key}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder={
                            key === "email" ? "email@example.com" : "https://"
                          }
                          className={inputClasses}
                        />
                      </FormControl>
                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="certificate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className={`${textClasses} `}>
                      Upload your certificate
                    </FormLabel>

                    <FormControl>
                      <div
                        className={`relative border border-slate-300 bg-slate-50 text-slate-600  font-jostFont  py-1.5 px-2 rounded-md w-full truncate`}
                      >
                        <Input
                          type="file"
                          accept="application/pdf"
                          className="opacity-0 absolute inset-0 font-jostFont"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const url = URL.createObjectURL(file);
                            setCertificateFileName(file.name);
                            setCertificateFile(url);
                            field.onChange(file);
                          }}
                        />
                        <span className={`truncate w-full`}>
                          {certificateFileName}
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage className={errorClasses} />
                  </FormItem>
                )}
              />
            </div>
            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/40 flex flex-col gap-2 items-start">
              <div className="flex flex-row flex-wrap justify-between w-full items-start gap-3">
                <span className={textClasses}>Uploaded certifiacete</span>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-sky-600 text-white rounded-sm hover:bg-sky-800 duration-200 ease-linear"
                  onClick={() => window.open(certificateFile as string)}
                  disabled={!certificateFile}
                >
                  Full view
                </Button>
              </div>
              <iframe
                src={certificateFile as string}
                className="w-full rounded-md border min-h-48 lg:min-h-96"
                title="PDF Viewer"
              />
            </div>

            <Button
              type="submit"
              className="
                        bg-emerald-700
                        hover:bg-emerald-600
                        text-white
                        font-medium
                        focus-visible:ring-2
                        focus-visible:ring-emerald-700/30
                    transition-all duration-200 ease-linear
                      "
            >
              Update profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
