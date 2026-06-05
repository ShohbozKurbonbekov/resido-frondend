import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import MemberService from "../services/Member.service";
import { useGlobals } from "../hooks/useGlobals";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrationInputClasses } from "./Login";
import { textClasses } from "@/lib/config";
import {
  FORM_SCHEMA,
  SIGNUP_FORM_FIELDS,
  type SIGNUP_INPUT,
  type SIGNUP_SUBMIT,
} from "../data/navbar";
// ✅ Validation schema with Zod

// ------------------------------------------------------------ COMPONENT ----------------------------------------------
type SignUpType = {
  btnClasses: string;
  btnTitle: string;
};

export default function SignUp({ btnClasses, btnTitle }: SignUpType) {
  const navigation = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { setAuthMember } = useGlobals();

  const form = useForm<SIGNUP_INPUT>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      memberName: "",
      memberEmail: "",
      memberPhone: "",
      memberPassword: "",
      occupation: "",
    },
  });

  const onSubmit = async (input: SIGNUP_SUBMIT) => {
    const member = new MemberService();
    setDialogOpen(false);

    try {
      const result = await member.signup(input);
      await sweetTopSmallSuccessAlert("You have successfully signed up!");
      form.reset();
      // SAVING FOR DATA
      setAuthMember(result);
      navigation("/dashboard");
    } catch (error) {
      console.log("Error in sign up process: ", error);
      await sweetErrorHandling(error!);
    }
  };

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button className={`${btnClasses}`} variant="link">
          {btnTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl overflow-auto pb-8 h-5/6 w-[85%] rounded-md">
        <DialogHeader className="flex flex-col items-center justify-center">
          <img src="/img/logo.svg" className="h-20 w-20" alt="signup logo " />
          <DialogTitle className="text-darkBlue text-2xl font-jostFont font-bold capitalize">
            Create account on resido
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1  gap-3">
              {SIGNUP_FORM_FIELDS.map((input) => (
                <FormField
                  key={input.name}
                  control={form.control}
                  name={input.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>
                        {input.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={input.type}
                          placeholder={input.placeholder}
                          {...field}
                          className={registrationInputClasses}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="flex flex-row mt-4">
              <Button
                className="bg-blue-900 w-full py-6 hover:bg-sky-700 text-lg  font-semibold font-jostFont focus-visible:ring-0"
                type="submit"
              >
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
