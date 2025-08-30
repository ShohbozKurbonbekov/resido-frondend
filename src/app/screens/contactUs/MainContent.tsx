import type { contactDataType } from "@/lib/type/contact-us";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Headset, House, MailQuestionMark } from "lucide-react";

// ✅ Validation schema with Zod
const FormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Description must be at least 10 characters." }),
  message: z.string().min(10, { message: "Please enter more than 5 letter" }),
});

interface MainContentType {
  contactData: contactDataType;
}
export default function MainContent({ contactData }: MainContentType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      message: "",
      subject: "",
      email: "",
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("form data: ", data);
  };
  return (
    <section className="py-20">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-7">
        <div className="md:col-span-7">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              action="#"
              className="flex flex-col space-y-4"
            >
              {/* basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-100   py-6 focus-visible:ring-slate-300   text-slate-500 border-0 rounded-sm transition-none duration-300 ease-linear"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-100  py-6 focus-visible:ring-slate-300 text-xs text-slate-500 border-0 rounded-sm transition-none duration-300 ease-linear"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* // subject */}
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont">
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-100  py-6 focus-visible:ring-slate-300 text-xs text-slate-500 border-0 rounded-sm transition-none duration-300 ease-linear"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* // message */}
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                      <FormLabel className="text-base leading-tight text-blue-950 capitalize font-jostFont ">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-slate-100  py-2 focus-visible:ring-slate-300 text-xs text-slate-500 border-0 rounded-sm  outline-0"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="text-sm text-white font-jostFont capitalize py-6 px-8 leading-tight rounded-md 
                     hover:bg-blue-500 bg-blue-900 transition-all duration-300 ease-linear 
                     self-start mt-2 active:shadow-[0_0_0px_5px_rgba(59,130,246,0.4)]"
              >
                Submit request
              </Button>
            </form>
          </Form>
        </div>
        <div className="md:col-span-5">
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-3xl text-darkBlue font-bold capitalize font-jostFont">
              Get in touch
            </h2>
            <p className="leading-[1.8] text-slate-400 font-light font-jostFont text-size_15">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* // address */}
            <div className="mt-[20px] mb-3 flex flex-row items-start justify-start gap-2">
              <House className="h-[40px] w-[40px] stroke-blue-800" />
              <div className="flex-1 flex flex-col items-start">
                <h6 className="text-size_15  text-darkBlue font-jostFont font-bold capitalize">
                  Reach us
                </h6>
                <p className="leading-tight text-slate-400 font-light font-jostFont text-size_15">
                  {contactData?.address}
                </p>
              </div>
            </div>

            {/* // email */}
            <div className="mb-3 flex flex-row items-start justify-start gap-2">
              <MailQuestionMark className="h-[40px] w-[40px]  stroke-blue-800" />
              <div className="flex-1 flex flex-col items-start">
                <h6 className="text-size_15  text-darkBlue font-jostFont font-bold capitalize">
                  Drop a mail
                </h6>
                <p className="leading-none text-slate-400 font-light font-jostFont text-size_15">
                  {contactData?.email}
                </p>
              </div>
            </div>

            {/* // phone */}
            <div className="mb-3 flex flex-row items-start justify-start  gap-2">
              <Headset className="h-[40px] w-[40px]  stroke-blue-800" />
              <div className="flex-1 flex flex-col items-start">
                <h6 className="text-size_15  text-darkBlue font-jostFont font-bold capitalize">
                  Call us
                </h6>
                <p className="leading-tight text-slate-400 font-light font-jostFont text-size_15">
                  {contactData?.phone1}
                </p>
                <p className="leading-tight text-slate-400 font-light font-jostFont text-size_15">
                  {contactData?.phone1}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
