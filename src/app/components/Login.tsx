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
import MemberService from "../services/Member.service";
import { useState } from "react";
import FormCustomError from "./FormCustomError";
import { LOGIN_FORM_SCHEMA } from "../data/navbar";
import { errorClasses, ErrorMessages } from "@/lib/config";

export const registrationInputClasses =
  "w-full px-4 py-5 text-gray-900 placeholder-gray-400 text-base font-medium rounded-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all duration-200 ease-linear";

interface LoginType {
  btnClasses: string;
  btnTitle: string;
}

export default function Login({ btnClasses, btnTitle }: LoginType) {
  const [error, setError] = useState<null | string>(null);
  const navigation = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { setAuthMember } = useGlobals();
  const form = useForm<z.input<typeof LOGIN_FORM_SCHEMA>>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: {
      memberEmail: "",
      memberPassword: "",
    },
  });
  const onSubmit = async (input: z.infer<typeof LOGIN_FORM_SCHEMA>) => {
    try {
      const memberService = new MemberService();
      const { member } = await memberService.login(input);
      localStorage.setItem("memberData", JSON.stringify(member));
      setAuthMember(member);
      setDialogOpen(false);
      form.reset();
      navigation("/dashboard");
    } catch (error) {
      setError(ErrorMessages.error9);
      console.log("Error in Login: ", error);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className={`${btnClasses}`} variant="link">
          {btnTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-xl pb-8  overflow-auto rounded-md">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-darkBlue text-3xl font-jostFont font-bold capitalize">
            Login ?
          </h3>
          <img src="/img/logo.svg" className="h-16 w-16" alt="login-logo " />
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
                        className={
                          error ? errorClasses : registrationInputClasses
                        }
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
                        className={
                          error ? errorClasses : registrationInputClasses
                        }
                        placeholder="Your Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <FormCustomError message={error} />}
            </div>

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
