import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../hooks/useGlobals";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import MemberService from "../services/MemberService";
import { useState } from "react";

const inputClasses =
  "w-full px-4 py-5 text-gray-900 placeholder-gray-400 text-base font-medium rounded-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all duration-200 ease-linear";

interface LoginType {
  btnClasses: string;
  btnTitle: string;
}

// ✅ Validation schema with Zod
const FormSchema = z.object({
  memberEmail: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  memberPassword: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});
export default function Login({ btnClasses, btnTitle }: LoginType) {
  const navigation = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { setAuthMember } = useGlobals();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      memberEmail: "",
      memberPassword: "",
    },
  });
  const onSubmit = async (input: z.infer<typeof FormSchema>) => {
    try {
      const memberService = new MemberService();
      const { member } = await memberService.login(input);
      localStorage.setItem("memberData", JSON.stringify(member));
      setAuthMember(member);
      setDialogOpen(false);
      form.reset();

      navigation("/dashboard");
    } catch (error) {
      console.log("Error in Login: ", error);
      await sweetErrorHandling(error!);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className={`${btnClasses}`} variant="link">
          {btnTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-xl pb-8 ">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-darkBlue text-3xl font-jostFont font-bold capitalize">
            Login ?
          </h3>
          <img src="/img/logo.svg" className="h-16 w-16" alt="signup logo " />
        </div>

        {/* ----------------------------------------- FORM -------------------------------- */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="memberEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className={inputClasses}
                        placeholder="Your Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memberPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className={inputClasses}
                        placeholder="Your Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="grid grid-cols-2 mt-3">
              <div className="flex flex-row gap-2 items-center">
                <Checkbox className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-slate-50 data-[state=checked]:shadow-[0_0_0.3rem_0.2rem_rgba(0,0,0,0.1)] " />
                <Label
                  htmlFor="savePassword"
                  className="text-lg text-darkBlue font-semibold font-jostFont"
                >
                  Save Password
                </Label>
              </div>
              <p className="text-lg text-rose-600 font-semibold font-jostFont capitalize text-end hover:opacity-60 transition-opacity duration-100 ease-in">
                <Link to="/">Forgot password ?</Link>
              </p>
            </div> */}

            <Button
              className="bg-blue-900 w-full py-6 hover:bg-sky-700 text-base  font-semibold font-jostFont focus-visible:ring-0 mt-5 transition-all duration-200 active:scale-95"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
