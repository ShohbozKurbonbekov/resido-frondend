import {
  USER_PROFILE_FIELDS,
  USER_SOCIALS,
  type UserProfileInput,
  type UserProfileSubmitType,
} from "@/app/data/dashboard/user";
import type { User } from "@/lib/type/dashboard/user";
import { UserProfileSchema } from "@/app/data/dashboard/user";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import {
  errorClasses,
  inputClasses,
  rowWrapperClasses,
  serverAPI,
  textClasses,
} from "@/lib/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// --------------------- Component -----------------------
interface UserProfileCardType {
  user: User;
  onSubmit: (values: UserProfileSubmitType) => Promise<void>;
  formTitle: string;
}

const UserProfileCard: React.FC<UserProfileCardType> = React.memo(
  ({ formTitle, onSubmit, user }) => {
    const [avatarPreview, setAvatarPreview] = React.useState<
      string | undefined
    >(user?.avatar ? `${serverAPI}/${user?.avatar}` : undefined);

    const form = useForm<UserProfileInput>({
      resolver: zodResolver(UserProfileSchema),
      defaultValues: {
        avatar: user?.avatar ? `${serverAPI}/${user.avatar}` : undefined,
        memberAddress: user?.memberAddress ?? "",
        memberDescription: user?.memberDescription ?? "",
        memberEmail: user?.memberEmail ?? "",
        memberName: user?.memberName ?? "",
        memberPhone: user?.memberPhone ?? "",
        memberSocials: user.memberSocials,
        occupation: user?.occupation ?? "",
        userFullname: user?.userFullname ?? "",
      },
    });

    // --------------------- Handlers -----------------------
    const handleSubmit = useCallback(
      async (values: UserProfileInput) => {
        try {
          // Submit the form and wait
          await onSubmit(values);
        } catch (error) {
          console.log("Error in onSubmit of UserProfileCard: ", error);
          await sweetErrorHandling(error!);
        }
      },
      [onSubmit],
    );

    // --------------------- Render -----------------------
    return (
      <Card className="w-full border border-slate-200 bg-slate-50/60 rounded-md">
        <CardHeader className="border-b border-slate-200 bg-white rounded-md rounded-br-none rounded-bl-none">
          <CardTitle className="text-lg font-semibold text-slate-800 font-jostFont">
            {formTitle}
          </CardTitle>
        </CardHeader>

        <CardContent className="bg-white">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 pt-5"
            >
              {/*Your profile image*/}
              <div className="flex sm:flex-row flex-col items-center gap-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-slate-300 bg-slate-100 ">
                  {avatarPreview ? (
                    <Avatar className="h-full w-full object-cover">
                      <AvatarImage src={avatarPreview} alt={user.memberName} />
                      <AvatarFallback>
                        {user.memberName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
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

                        <FormMessage className={errorClasses} />
                        <p className="text-xs text-slate-500">
                          JPG, JPEG or PNG. Square images recommended.
                        </p>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Single input fields*/}
              <div className={rowWrapperClasses}>
                {USER_PROFILE_FIELDS.map(
                  ({ elementType, inputType, label, name, placeholder }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => {
                        if (elementType === "input") {
                          return (
                            <FormItem>
                              <FormLabel className={textClasses}>
                                {label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className={inputClasses}
                                  type={inputType}
                                  placeholder={placeholder}
                                />
                              </FormControl>
                              <FormMessage className={errorClasses} />
                            </FormItem>
                          );
                        }
                        return (
                          <FormItem className="grid col-span-2">
                            <FormLabel className={textClasses}>
                              {label}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={4}
                                className={inputClasses}
                                placeholder={placeholder}
                              />
                            </FormControl>
                            <FormMessage className={errorClasses} />
                          </FormItem>
                        );
                      }}
                    />
                  ),
                )}
              </div>

              {/* Socials*/}
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

              {/*Submit button*/}
              <Button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium focus-visible:ring-2  focus-visible:ring-emerald-700/30 transition-all duration-200 ease-linear"
              >
                Save Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  },
);

export default UserProfileCard;
