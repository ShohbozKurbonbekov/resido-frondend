// Also, for the front-end validation, I am using this tools, like React hook form + Zod + shadcn
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { AgentRegistrationSchema } from "../data/agent";
import { useCallback, useState } from "react";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { Textarea } from "@/components/ui/textarea";
import { USER_SOCIALS } from "../data/dashboard/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobals } from "../hooks/useGlobals";
import AgentService from "../services/Agent.service";
const rowWrapperClasses =
  "grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4 bg-slate-50/40";

const inputClasses =
  "border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-600/30 focus-visible:border-emerald-600";
const textClasses = "text-sm font-medium text-slate-700 font-jostFont";

interface AddAgentFormType {
  qualityClasses?: string;
}

export default function AddAgentForm({ qualityClasses }: AddAgentFormType) {
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined,
  );
  const [certificateFile, setCertificateFile] =
    useState<string>("Choose a file");
  const { authmember, setAuthMember } = useGlobals();
  const [searchParams] = useSearchParams();
  const agencyId = searchParams.get("agencyId");
  const navigation = useNavigate();
  const form = useForm<z.infer<typeof AgentRegistrationSchema>>({
    resolver: zodResolver(AgentRegistrationSchema),
    defaultValues: {
      avatar: undefined,
      address: "",
      agencyId: agencyId!,
      userId: authmember?._id,
      licenseNumber: "",
      certificate: "",
      bioInfo: "",
      fullName: "",
      nickname: "",
      phone: "",
      yearOfExperience: 0,
      socialLinks: {
        facebook: null,
        instagram: null,
        linkedin: null,
        twitter: null,
        email: null,
      },
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof AgentRegistrationSchema>) => {
      console.log(values);
      try {
        const agent = new AgentService();
        const agentData = await agent.applyAgent(values);
        await sweetTopSmallSuccessAlert("You are registered as an agent");

        setAuthMember(agentData);
        navigation("/dashboard");
      } catch (error) {
        console.log("Error in agentRegistration: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [navigation, setAuthMember],
  );

  return (
    <div className={qualityClasses}>
      <div className="container">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white rounded-md  p-5"
          >
            {/*IMAGE  */}
            <div className="flex sm:flex-row flex-col items-center gap-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-slate-300 bg-slate-100 ">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    No Image
                  </div>
                )}
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
                        <div className="border border-slate-200 bg-slate-50/50 relative py-1 px-3 rounded-md truncate font-jostFont">
                          <Input
                            type="file"
                            accept="image/*"
                            className="border-none opacity-0 absolute inset-0"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              const url = URL.createObjectURL(file);
                              setAvatarPreview(url);
                              field.onChange(file);
                            }}
                          />
                          <span className={textClasses}>Choose image</span>
                        </div>
                      </FormControl>

                      <FormMessage className="text-xs text-rose-600/90" />
                      <p className="text-xs text-slate-500">
                        JPG, JPEG or PNG. Square images recommended.
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className={rowWrapperClasses}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className={inputClasses}
                        {...field}
                        placeholder="Full Name..."
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-rose-600/90" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>Nickname</FormLabel>
                    <FormControl>
                      <Input
                        className={inputClasses}
                        {...field}
                        placeholder="Nickname..."
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-rose-600/90" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className={inputClasses}
                        {...field}
                        placeholder="Phone..."
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-rose-600/90" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>Address</FormLabel>
                    <FormControl>
                      <Input
                        className={inputClasses}
                        {...field}
                        placeholder="Address..."
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-rose-600/90" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>
                      Experience Year
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className={inputClasses}
                        type="number"
                        placeholder="Experience Period..."
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>

                    <FormMessage className="text-xs text-rose-600/90" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>
                      License Number
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className={inputClasses}
                        placeholder="License Number..."
                      />
                    </FormControl>

                    <FormMessage className="text-xs text-rose-600/90" />
                  </FormItem>
                )}
              />
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
                    <FormMessage className="text-xs text-rose-600/90" />
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
                      <FormMessage className="text-xs text-rose-600/90" />
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
                          className="opacity-0 absolute inset-0"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const url = file.name;
                            setCertificateFile(url);
                            field.onChange(file);
                          }}
                        />
                        <span className={`truncate w-full`}>
                          {certificateFile}
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs text-rose-600/90" />
                  </FormItem>
                )}
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
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
