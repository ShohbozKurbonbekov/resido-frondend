import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SellingTypeEnum } from "@/lib/enums/property.enum";
import {
  PROPERTY_ADDRESS,
  PROPERTY_AMENITIES,
  PROPERTY_FEATURES,
  PROPERTY_IMAGES,
  PROPERTY_OPTIONS,
  PROPERTY_OTHER_FEATURES,
  PropertyFormSchema,
  type PropertyFormInputType,
  type PropertyFormType,
} from "@/app/data/properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback } from "react";
import type { PropertyImagesType } from "@/lib/type/property";
import type { SetStateType } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";

// ------------------------------------- CLASSES -------------------------
const sellingOptionInputClasses = "flex flex-col gap-2 w-full";
const errorClasses = "text-xs text-rose-600/90";
const rowWrapperClasses =
  "grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4 bg-slate-50/40";
const inputClasses =
  "border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-600/30 focus-visible:border-emerald-600";
const textClasses = "text-sm font-medium text-slate-700 font-jostFont";

// ------------------------------------------- COMPONENT --------------------------------
interface AgentPropertyFormContentType {
  propertyVideo: string;
  setPropertyVideo: SetStateType<string>;
  propertyImages: PropertyImagesType;
  setPropertyImages: SetStateType<PropertyImagesType>;
  propertiesValues: PropertyFormInputType;
  setImagesPath: SetStateType<PropertyImagesType>;
  imagesPath: PropertyImagesType;
  handleSubmit: (values: PropertyFormType) => Promise<void>;
  videoPath: string;
  setVideoPath: SetStateType<string>;
}

export default function AgentPropertyFormContent({
  propertyVideo,
  propertyImages,
  propertiesValues,
  setPropertyImages,
  setPropertyVideo,
  imagesPath,
  setImagesPath,
  handleSubmit,
  setVideoPath,
  videoPath,
}: AgentPropertyFormContentType) {
  const form = useForm<PropertyFormInputType>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: propertiesValues,
  });

  // CONDITIONAL RENDERING
  const sellingType = form.watch("sellingOption.type");

  const onSubmit = useCallback(
    async (values: PropertyFormType) => {
      try {
        await handleSubmit(values);

        form.reset();
      } catch (error) {
        await sweetErrorHandling(error!);
      }
    },
    [handleSubmit, form]
  );

  return (
    <Card className="w-full border border-slate-200 rounded-md">
      <CardHeader>
        <CardTitle
          className="hidden opacity-0"
          aria-labelledby="Create a property"
        >
          Fill the form to make it visible to user
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 py-5"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={textClasses}>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      className={inputClasses}
                      placeholder="Property Title"
                    />
                  </FormControl>
                  <FormMessage className={errorClasses} />
                </FormItem>
              )}
            />

            {/* Address */}
            <div className={rowWrapperClasses}>
              {PROPERTY_ADDRESS.map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`address.${key}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          className={inputClasses}
                          placeholder={key}
                        />
                      </FormControl>
                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Description */}
            <div
              className={`grid grid-cols-1 rounded-lg border border-slate-200 p-4 bg-slate-50/40`}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textClasses}>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className={inputClasses}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        placeholder="Property description"
                      />
                    </FormControl>
                    <FormMessage className={errorClasses} />
                  </FormItem>
                )}
              />
            </div>

            {/* Numeric fields */}
            <div className={rowWrapperClasses}>
              {PROPERTY_FEATURES.map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>{label}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={inputClasses}
                          onChange={field.onChange}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Enum Selects */}
            <div className={rowWrapperClasses}>
              {PROPERTY_OPTIONS.map(({ name, enumObj, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>{label}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder={`Select ${label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(enumObj).map((val) => (
                              <SelectItem key={val} value={val}>
                                {val}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Amenities */}
            <div className={rowWrapperClasses}>
              {PROPERTY_AMENITIES.map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={`amenities.${name}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{label}</FormLabel>
                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Optional Checkboxes */}
            <div className={rowWrapperClasses}>
              {PROPERTY_OTHER_FEATURES.map(({ label, name }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{label}</FormLabel>
                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Selling Options*/}
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg gap-4 border border-slate-200 p-4 bg-slate-50/40">
              <FormField
                control={form.control}
                name="sellingOption.type"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 items-start">
                    <FormLabel className={textClasses}>Selling Type</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="max-w-52">
                          <SelectValue placeholder="Select selling type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value={SellingTypeEnum.SALE}>
                          Sale
                        </SelectItem>
                        <SelectItem value={SellingTypeEnum.RENT}>
                          Rent
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {sellingType === SellingTypeEnum.SALE && (
                <div className={sellingOptionInputClasses}>
                  <FormField
                    control={form.control}
                    name="sellingOption.overalAmunt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={textClasses}>
                          Total Amount
                        </FormLabel>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          className={inputClasses}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sellingOption.discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          className={inputClasses}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {sellingType === SellingTypeEnum.RENT && (
                <div className={sellingOptionInputClasses}>
                  <FormField
                    control={form.control}
                    name="sellingOption.monthlyPayment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Payment</FormLabel>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          className={inputClasses}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sellingOption.overalAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Amount</FormLabel>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          className={inputClasses}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sellingOption.devidedMonths"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Months</FormLabel>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          className={inputClasses}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* IMAGES*/}
            <div className="flex flex-col items-stretch rounded-lg gap-4 border border-slate-200 p-4 bg-slate-50/40">
              <div>
                <h5
                  className={`text-lg font-jostFont text-slate-700/90 mt-3 font-[500]`}
                >
                  You are gonna upload your property images here
                </h5>
                <span className={textClasses}>
                  Jpeg, png and jpg formats are recommended
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-3">
                {PROPERTY_IMAGES.map((image, i) => (
                  <div
                    className="flex flex-col gap-2 items-start border-slate-200 border p-1"
                    key={image}
                  >
                    <div className="w-full h-52 overflow-hidden border border-slate-300 bg-slate-100">
                      {propertyImages[image] ? (
                        <img
                          src={propertyImages[image]}
                          alt={image}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400 font-jostFont">
                          No Image
                        </div>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name={`images.${image}`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 items-start w-full justify-start">
                          <FormLabel className={`${textClasses}`}>
                            Property Image {i + 1}
                          </FormLabel>

                          <FormControl>
                            <div className="border border-slate-200 bg-slate-50/50 py-1 px-3 w-full truncate font-jostFont relative">
                              <Input
                                type="file"
                                accept="image/*"
                                className="border-none opacity-0 absolute inset-0"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;

                                  const url = URL.createObjectURL(file);
                                  setPropertyImages((prev) => ({
                                    ...prev,
                                    [`image${i + 1}`]: url,
                                  }));
                                  setImagesPath((prev) => ({
                                    ...prev,
                                    [`image${i + 1}`]: file.name,
                                  }));
                                  field.onChange(file);
                                }}
                              />
                              <span className={textClasses}>
                                {imagesPath[image]}
                              </span>
                            </div>
                          </FormControl>

                          <FormMessage className={errorClasses} />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEOS*/}
            <div className="flex flex-col items-stretch rounded-lg gap-4 border border-slate-200 p-4 bg-slate-50/40">
              <h5
                className={`text-lg font-jostFont text-slate-700/90 mt-3 font-[500]`}
              >
                You are gonna upload your property video here{" "}
                <span className={"text-sm text-muted-foreground "}>
                  (Optional)
                </span>
              </h5>
              <div className="flex flex-col gap-2 items-start border-slate-200 border">
                {/* Preview */}
                <div className="w-full h-72 overflow-hidden  bg-slate-100">
                  {propertyVideo ? (
                    <video
                      src={propertyVideo}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400 font-jostFont">
                      No Video
                    </div>
                  )}
                </div>

                {/* Form Field */}
                <FormField
                  control={form.control}
                  name="videos"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 items-start w-full p-1">
                      <FormLabel className={textClasses}>
                        Property Video{" "}
                        <span className="text-muted-foreground">
                          (Optional)
                        </span>
                      </FormLabel>

                      <FormControl>
                        <div className="border border-slate-200 bg-slate-50/50 py-1 px-3 w-full truncate font-jostFont relative">
                          <Input
                            type="file"
                            accept="video/*"
                            className="border-none opacity-0 absolute inset-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              const url = URL.createObjectURL(file);

                              setPropertyVideo(url); // preview
                              setVideoPath(file.name); // filename
                              field.onChange(file); // RHF
                            }}
                          />

                          <span className={textClasses}>
                            {videoPath || "Choose a video"}
                          </span>
                        </div>
                      </FormControl>

                      <FormMessage className={errorClasses} />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-sky-600 hover:bg-sky-800 transition-all duration-200 ease-linear font-jostFont"
            >
              Submit Property
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
