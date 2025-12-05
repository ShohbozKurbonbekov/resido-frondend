import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import z from "zod";
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
import MemberService from "../services/MemberService";
import { MemberType } from "@/lib/enums/agent.enum";
import { useGlobals } from "../hooks/useGlobals";
import { useState } from "react";
// ✅ Validation schema with Zod

const FormSchema = z.object({
  memberName: z.string().trim().min(1, { message: "Name is required" }),
  memberEmail: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  memberPhone: z
    .string()
    .trim()
    .regex(/^\d{7,14}$/, {
      message: "Phone number must between 7 and 14 lengths",
    }),
  memberPassword: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
  occupation: z.string().trim().min(1, { message: "Occupation is required" }),
  role: z
    .enum([MemberType.USER, MemberType.AGENCY])
    .or(z.literal(""))
    .refine((val) => val !== "", { message: "Please select a valid role" }),
});

// ------------------------------------------------------------ COMPONENT ----------------------------------------------
type SignUpType = {
  btnClasses: string;
  btnTitle: string;
};

export default function SignUp({ btnClasses, btnTitle }: SignUpType) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { setAuthMember } = useGlobals();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      memberName: "",
      memberEmail: "",
      memberPhone: "",
      memberPassword: "",
      occupation: "",
      role: "",
    },
  });

  const onSubmit = async (input: z.infer<typeof FormSchema>) => {
    const member = new MemberService();

    try {
      const result = await member.signup(input);
      await sweetTopSmallSuccessAlert("You have successfully signed up!");
      // SAVING FOR DATA
      setAuthMember(result);
      setDialogOpen(false);
    } catch (error) {
      setDialogOpen(false);
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
      <DialogContent className="sm:max-w-[698px] pb-8">
        <DialogHeader className="flex flex-col items-center justify-center">
          <img src="/img/logo.svg" className="h-20 w-20" alt="signup logo " />
          <DialogTitle className="text-darkBlue text-2xl font-jostFont font-bold capitalize">
            Create account on resido
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col  gap-y-2">
                {/* Name*/}
                <FormField
                  control={form.control}
                  name="memberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* EMAIL */}
                <FormField
                  control={form.control}
                  name="memberEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PHONE */}
                <FormField
                  control={form.control}
                  name="memberPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+821012345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*COLUMN - 2*/}
              <div className="flex flex-col gap gap-y-2">
                {/* PASSWORD */}
                <FormField
                  control={form.control}
                  name="memberPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* OCCUPATION */}
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder="Developer, Student..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ROLE SELECT */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Register as</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="AGENCY">Agency</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div>
                  <Label
                    htmlFor="member"
                    className="font-bold text-lg font-jostFont text-darkBlue "
                  >
                    Signup As
                  </Label>

                  <Select>
                    <SelectTrigger className="w-full bg-sky-50 py-6  text-darkBlue   box-border mt-1 focus-visible:ring-0 md:text-lg">
                      <SelectValue placeholder="As a Customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>As an Customer</SelectLabel>
                        <SelectItem value="agent">As an Agent</SelectItem>
                        <SelectItem value="agency">As an Agency</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            </div>
            <div className="flex flex-row  mt-4">
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
