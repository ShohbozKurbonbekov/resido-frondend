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
import {
  Headset,
  House,
  MailQuestionMark,
  type LucideIcon,
} from "lucide-react";
import type { User } from "@/lib/type/dashboard/user";
import { useCallback, useMemo } from "react";
import type { MessageInput } from "@/lib/type/message";
import { useGlobals } from "@/app/hooks/useGlobals";
import MemberService from "@/app/services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import React from "react";

// ✅ Validation schema with Zod
const FormSchema = z.object({
  phone: z.string().trim().min(1, { message: "Please give your phone number" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),
  subject: z.string().trim().min(1, { message: "Subject must be given." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Content must be at least 10 letters" }),
});

//------------------------------------------ ELEMENTS CLASSES ---------------------------------
const formRowWrapper = "grid grid-cols-1";
const formRow = "flex flex-col gap-y-1 items-start justify-start w-full";
const formTextClasses =
  "text-base leading-tight text-blue-950 capitalize font-jostFont";
const formInputClasses =
  "bg-slate-100  py-6 focus-visible:ring-slate-300 text-xs text-slate-500 border-0 rounded-sm";
const infoWrapperClasses = "mb-3 flex flex-row items-start justify-start gap-2";
const infoIconClasses = "h-10 w-10 stroke-blue-800";
const textIconwWrapper = "flex-1 flex flex-col items-start";
const infoTitleClasses =
  "text-size_15  text-darkBlue font-jostFont font-bold capitalize";
const infoSubtitleClasses =
  "leading-tight text-slate-400 font-light font-jostFont text-size_15";
interface MainContentType {
  adminData: User;
}

interface InfoContentType {
  Icon: LucideIcon;
  title: string;
  data: string;
}
//------------------------------------------- COMPONENT ---------------------------------
const MainContent: React.FC<MainContentType> = React.memo(({ adminData }) => {
  const { authmember } = useGlobals();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      message: "",
      subject: "",
      email: "",
    },
  });

  const infoContent = useMemo(() => {
    const {
      memberAddress,
      memberSocials: { email },
      memberPhone,
    } = adminData;
    return [
      { Icon: House, title: "Reach us", data: memberAddress || "No address" },
      {
        Icon: MailQuestionMark,
        title: "Drop a mail",
        data: email || "No email",
      },
      {
        Icon: Headset,
        title: "Call us",
        data: memberPhone || "No phone number",
      },
    ];
  }, [adminData]);
  //------------------------------------------- HANDLERS ---------------------------------

  const handleSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        const input: MessageInput = {
          content: data.message,
          subject: data.subject,
          phone: data.phone,
          email: data.email,
          receiverId: adminData._id,
          receiverType: adminData.role,
          senderType: authmember?.role,
        };
        const member = new MemberService();
        await member.writeMessageMember(input);
        await sweetTopSmallSuccessAlert("Sent succussfully");
      } catch (error) {
        console.log("Error in AgentContact: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [adminData, authmember]
  );

  //------------------------------------------- RENDER ---------------------------------

  return (
    <section className="py-20">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-7">
        <div className="md:col-span-7">
          {/* FORM SUBMISSION*/}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col space-y-4"
            >
              {/* // email */}
              <div className={formRowWrapper}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={formRow}>
                      <FormLabel className={formTextClasses}>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className={formInputClasses}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* // phone */}
              <div className={formRowWrapper}>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className={formRow}>
                      <FormLabel className={formTextClasses}>Phone</FormLabel>
                      <FormControl>
                        <Input className={formInputClasses} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* // subject */}
              <div className={formRowWrapper}>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className={formRow}>
                      <FormLabel className={formTextClasses}>Subject</FormLabel>
                      <FormControl>
                        <Input className={formInputClasses} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* // message */}
              <div className={formRowWrapper}>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className={formRow}>
                      <FormLabel className={formTextClasses}>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className={formInputClasses}
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

        {/* ADMINISTRATION DATA*/}
        <div className="md:col-span-5">
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-3xl text-darkBlue font-bold capitalize font-jostFont">
              Get in touch
            </h2>
            <p className="leading-onePointEight text-slate-400 font-light font-jostFont text-base">
              If you’d like to learn more or have any questions, feel free to
              reach out through the social links below!
            </p>

            {/* ADDRESS */}
            {infoContent.map((el: InfoContentType, index: number) => {
              const { Icon, title, data } = el;

              return (
                <div className={infoWrapperClasses} key={index}>
                  <Icon className={infoIconClasses} />
                  <div className={textIconwWrapper}>
                    <h6 className={infoTitleClasses}>{title}</h6>
                    <p className={infoSubtitleClasses}>{data}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default MainContent;
