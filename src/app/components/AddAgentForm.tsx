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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ErrorMessages } from "@/lib/config";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { Images, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// zod schema

// ✅ Validation schema with Zod
const FormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  designation: z.string().min(2, { message: "Designation is required." }),
  phone: z.string().regex(/^[0-9+\-\s()]*$/, {
    message: "Please enter a valid phone number.",
  }),
  landline: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, { message: "Please enter a valid landline." })
    .optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .optional(),
  address: z.string().min(5, { message: "Address is required." }),
  address2: z.string().optional(),
  country: z.string().min(2, { message: "Country is required." }),
  state: z.string().min(2, { message: "Country is required." }),
  city: z.string().min(2, { message: "City is required." }),
  zipcode: z
    .string()
    .regex(/^\d{0,10}$/, { message: "Zip code must be between 4–10 digits." }),
  facebook: z
    .string()
    .url({ message: "Please enter a valid Facebook profile link." })
    .optional(),
  twitter: z
    .string()
    .url({ message: "Please enter a valid Twitter profile link." })
    .optional(),
  linkedin: z
    .string()
    .url({ message: "Please enter a valid LinkedIn profile link." })
    .optional(),
  googlePlus: z
    .string()
    .url({ message: "Please enter a valid Google Plus profile link." })
    .optional(),
  instagram: z
    .string()
    .url({ message: "Please enter a valid Instagram profile link." })
    .optional(),
  tumbler: z
    .string()
    .url({ message: "Please enter a valid Tumbler profile link." })
    .optional(),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "You must accept GDPR agreement." }),
  }), // ✅ Must be true
});

interface AddAgentFormProp {
  qualityClasses?: string;
}

export default function AddAgentForm({ qualityClasses }: AddAgentFormProp) {
  const [agentImage, setAgentImage] = useState<string>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      designation: "",
      phone: "",
      landline: "",
      email: "",
      description: "",
      address: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      googlePlus: "",
      instagram: "",
      tumbler: "",
      gdpr: false,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("form data: ", data);
  };

  useEffect(() => {
    return () => {
      if (agentImage) URL.revokeObjectURL(agentImage);
    };
  }, [agentImage]);

  const handleAgentImage = (
    e: React.ChangeEvent<HTMLInputElement> | null
  ): void => {
    if (!e || !e.target) return;

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileType: string = file.type;
    const validTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validTypes.includes(fileType)) {
      console.log("oops");
      sweetErrorHandling({ message: ErrorMessages.error5 });
    } else {
      setAgentImage(URL.createObjectURL(file));
      e.target.value = "";
    }
  };
  return (
    <section className={qualityClasses}>
      <div className="container">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            action="#"
            className="rounded-[10px] p-[30px] bg-white shadow-addAgentForm relative w-full"
          >
            <div className="my-4  flex flex-col items-center justify-center">
              <h3 className="text-2xl leading-[30px] text-darkBlue font-jostFont font-bold capitalize mb-2">
                Profile Logo
              </h3>
              <div className="w-[120px] h-[120px] min-h-[120px] rounded-full border border-slate-200 bg-slate-100  flex items-center justify-center px-4 mb-4  relative active:scale-90 duration-300 ease-linear">
                {agentImage === "" ? (
                  <Images className="h-3/5 w-3/5" />
                ) : (
                  <img
                    src={agentImage}
                    alt="agent profile"
                    className="absolute inset-0  rounded-full z-10 h-full w-full "
                  />
                )}
                <input
                  type="file"
                  className="absolute inset-0 z-20 cursor-pointer opacity-0"
                  onChange={handleAgentImage}
                />
              </div>
            </div>
            {/* basic Information */}
            <div className="mt-2 flex flex-col gap-y-3">
              <h3 className="text-2xl text-darkBlue font-jostFont font-bold capitalize text-start leading-none">
                Basic Information
              </h3>

              {/* //  fullname */}
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont flex flex-row items-center justify-start gap-x-1">
                        Full Name
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="fill-blue-800 stroke-white" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-blue-800 py-3 px-3 font-jostFont text-sm">
                              <p>Agent full name</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>

                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* // designation */}
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont  w-full">
                        Designation
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont  w-full">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // Landline */}
                <FormField
                  control={form.control}
                  name="landline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont  w-full">
                        Landline
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1">
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont ">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-sky-50  py-1 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* // location */}
            <div className="mt-5 flex flex-col gap-y-3">
              <h3 className="text-2xl text-darkBlue font-jostFont font-bold capitalize text-start leading-none">
                Location
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* // Address 1 */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // Address 2 */}

                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        Address 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* // Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // State */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        State
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* // City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // Zip code  */}
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        Zip Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* social Links */}
            <div className="mt-5 flex flex-col gap-y-3">
              <h3 className="text-2xl text-darkBlue font-jostFont font-bold capitalize text-start leading-none">
                Social accounts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* // facebook */}
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // Twitter */}
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        twitter
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Linkedin */}
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        linkedin
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* // Google Plus */}
                <FormField
                  control={form.control}
                  name="googlePlus"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        google Plus
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // Instagram */}
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // Tumbler */}
                <FormField
                  control={form.control}
                  name="tumbler"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full">
                        Tumbler
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 mt-1">
                {/* ✅ GDPR Agreement */}
                <FormField
                  control={form.control}
                  name="gdpr"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont">
                        GDPR Agreement *
                      </FormLabel>
                      <div className="flex flex-row gap-2 items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:shadow-[0_0_1px_4px_rgba(59,130,246,0.5)] 
                               data-[state=checked]:bg-blue-600 
                               data-[state=checked]:border-none 
                               border-slate-300 transition-all duration-300 ease-linear"
                          />
                        </FormControl>
                        <p className="leading-none text-xs text-slate-500">
                          I consent to having this website store my submitted
                          information so they can respond to my inquiry.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="text-sm text-white font-j capitalize py-3 px-6 leading-tight rounded-md 
                     hover:bg-blue-500 bg-blue-900 transition-all duration-300 ease-linear 
                     self-start mt-2 active:shadow-[0_0_0px_5px_rgba(59,130,246,0.4)]"
              >
                Submit & Preview
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
