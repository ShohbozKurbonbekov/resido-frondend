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
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useGlobals } from "../hooks/useGlobals";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { ErrorMessages } from "@/lib/config";
import MemberService from "../services/MemberService";

interface LoginType {
  btnClasses: string;
  btnTitle: string;
}

// ✅ Validation schema with Zod
const FormSchema = z.object({
  memberType: z.string(),
  memberEmail: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  memberPassword: z.string().min(7, "Password must be at least 7 characters"),
});
export default function Login({ btnClasses, btnTitle }: LoginType) {
  const navigation = useNavigate();

  const { setAuthMember } = useGlobals();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      memberEmail: "",
      memberPassword: "",
      memberType: "USER",
    },
  });
  const onSubmit = async (input: z.infer<typeof FormSchema>) => {
    try {
      const isFullFill = input.memberEmail && input.memberPassword;

      if (!isFullFill) {
        throw new Error(ErrorMessages.error3);
      }

      const memberService = new MemberService();
      const { member } = await memberService.login(input);
      localStorage.setItem("memberData", JSON.stringify(member));
      setAuthMember(member);

      navigation("/");
    } catch (error) {
      console.log("Error in Login: ", error);
      sweetErrorHandling(error!).then();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className={`${btnClasses}`}>
        <Button className={`${btnClasses}`} variant="link">
          {btnTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] pb-8">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-darkBlue text-3xl font-jostFont font-bold capitalize">
            Login ?
          </h3>
          <img
            src="/img/logo.svg"
            className="h-[90px] w-[90px]"
            alt="signup logo "
          />
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
                        className="md:text-lg text-darkBlue bg-sky-50 py-6 focus-visible:ring-0"
                        placeholder="Email Address"
                        id="memberEmail"
                        name="memberEmail"
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
                        className="md:text-lg text-darkBlue bg-sky-50 py-6 focus-visible:ring-0"
                        placeholder="Password"
                        id="memberEmail"
                        name="memberEmail"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 mt-3">
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
            </div>
            <div className="flex flex-row  mt-4">
              <Button
                className="bg-blue-900 w-full py-6 hover:bg-sky-700 text-lg  font-semibold font-jostFont focus-visible:ring-0"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
