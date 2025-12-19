import { Button } from "@/components/ui/button";
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
import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/lib/type/dashboard/user";
import { USER_SOCIALS, UserProfileSchema } from "@/app/data/dashboard/user";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { useGlobals } from "@/app/hooks/useGlobals";
import MemberService from "@/app/services/MemberService";
import { serverAPI } from "@/lib/config";

const inputClasses =
  "border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-600/30 focus-visible:border-emerald-600";

const textClasses = "text-sm font-medium text-slate-700 font-jostFont";

const rowWrapperClasses =
  "grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4 bg-slate-50/40";

interface UserProfileContentType {
  user: User;
}
const UserProfileContent: React.FC<UserProfileContentType> = React.memo(
  ({ user }) => {
    const [avatarPreview, setAvatarPreview] = React.useState<
      string | undefined
    >(user?.avatar ? `${serverAPI}/${user?.avatar}` : undefined);

    const { setAuthMember } = useGlobals();
    const form = useForm<z.input<typeof UserProfileSchema>>({
      resolver: zodResolver(UserProfileSchema),
      defaultValues: {
        avatar: `${serverAPI}/${user?.avatar}`,
        memberAddress: user?.memberAddress,
        memberDescription: user?.memberDescription,
        memberEmail: user?.memberEmail,
        memberName: user?.memberName,
        memberPhone: user?.memberPhone,
        memberSocials: user?.memberSocials,
        occupation: user?.occupation,
        userFullname: user?.userFullname,
      },
    });

    const onSubmit = useCallback(
      async (values: z.infer<typeof UserProfileSchema>) => {
        try {
          console.log(values);
          const member = new MemberService();
          const data = await member.updateMember(values);
          setAuthMember(data);

          await sweetTopSmallSuccessAlert("Modified successfully!", 1000);
        } catch (error) {
          console.log("Error in onSubmit: ", error);
          sweetErrorHandling(error!).then();
        }
      },
      [setAuthMember]
    );

    return (
      <Card className="w-full border border-slate-200 bg-slate-50/60 shadow-sm  rounded-md">
        <CardHeader className="border-b border-slate-200 bg-white rounded-md rounded-br-none rounded-bl-none">
          <CardTitle className="text-lg font-semibold text-slate-800 font-jostFont">
            User Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="bg-white">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-5"
            >
              {/* AVATAR */}
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
                {/* NAME */}
                <FormField
                  control={form.control}
                  name="memberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClasses} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />

                {/* USER FULL NAME */}
                <FormField
                  control={form.control}
                  name="userFullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClasses} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />

                {/* MEMBER EMAIL */}
                <FormField
                  control={form.control}
                  name="memberEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className={inputClasses}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />

                {/* MEMBER PHONE */}
                <FormField
                  control={form.control}
                  name="memberPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClasses} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />

                {/* OCCUPATION */}
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Occupation</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClasses} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />

                {/* MEMBER ADDRESS */}
                <FormField
                  control={form.control}
                  name="memberAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Address</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClasses} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />
              </div>

              {/* DESCRIPTION */}
              <div
                className={
                  "rounded-lg border border-slate-200 p-4 bg-slate-50/40"
                }
              >
                <FormField
                  control={form.control}
                  name="memberDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>About</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          className={inputClasses}
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
                    name={`memberSocials.${key}`}
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
                Save Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }
);
export default UserProfileContent;
