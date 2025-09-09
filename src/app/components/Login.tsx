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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

type SignUpType = {
  btnClasses: string;
  btnTitle: string;
};

// ✅ Validation schema with Zod
const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(7, "Password must be at least 7 characters")
    .max(15, "Password must be at most 15 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});
export default function Login({ btnClasses, btnTitle }: SignUpType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("form data: ", data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
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

        {/* // form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="email"
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
                name="password"
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
