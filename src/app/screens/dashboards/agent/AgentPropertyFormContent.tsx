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
import type {
  MemberPropertyActionsType,
  PropertyImagesType,
} from "@/lib/type/property";
import type { SetStateType } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import {
  errorClasses,
  inputClasses,
  rowWrapperClasses,
  textClasses,
} from "@/lib/config";
import { customLetterCustomise } from "@/lib/utils";

// ------------------------------------- CLASSES -------------------------
const sellingOptionInputClasses = "flex flex-col gap-2 w-full";

const videoTitleClasses = `text-lg font-jostFont text-slate-700/90 mt-3 font-[500]`;
// ------------------------------------------- COMPONENT --------------------------------
interface AgentPropertyFormContentType {
  propertyVideo: string;
  setPropertyVideo: SetStateType<string>;
  propertyImages: PropertyImagesType;
  setPropertyImages: SetStateType<PropertyImagesType>;
  propertiesValues: PropertyFormInputType;
  setImagesPath: SetStateType<PropertyImagesType>;
  imagesPath: PropertyImagesType;
  onUpdate?: (values: PropertyFormType) => Promise<void>;
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
  videoPath: string;
  setVideoPath: SetStateType<string>;
  propertyActions: MemberPropertyActionsType;
  propertyUpdate: boolean;
}

export default function AgentPropertyFormContent({
  propertyVideo,
  propertyImages,
  propertiesValues,
  setPropertyImages,
  setPropertyVideo,
  imagesPath,
  setImagesPath,
  onUpdate,
  setVideoPath,
  onApprove,
  onReject,
  propertyActions,
  videoPath,
  propertyUpdate,
}: AgentPropertyFormContentType) {
  const form = useForm<PropertyFormInputType>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: propertiesValues,
  });

  const isEditMode = !!propertyActions && propertyActions.canChangeProperty;
  const isReviewMode = !!propertyActions && propertyActions.canCheckProperty;
  const isReadOnly = isReviewMode;

  // CONDITIONAL RENDERING
  const sellingType = form.watch("sellingOption.type");

  const onSubmit = useCallback(
    async (values: PropertyFormType) => {
      if (!isEditMode && propertyUpdate) return;
      try {
        await onUpdate?.(values);
        form.reset();
      } catch (error) {
        await sweetErrorHandling(error!);
      }
    },
    [onUpdate, form, isEditMode, propertyUpdate],
  );

  return (
    <Card className="w-full border border-slate-200 rounded-md">
      <CardHeader>
        <CardTitle
          className="hidden opacity-0"
          aria-labelledby={
            isReviewMode
              ? "Check property and Chose options between Approve or Reject"
              : "Edit current property"
          }
        >
          {isEditMode
            ? "Fill the form to make it visible to user"
            : "Here choose Approve or Reject after checking the property"}
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
                      disabled={isReadOnly}
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
                        {customLetterCustomise(key)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
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

                    <Select
                      value={field.value}
                      disabled={isReadOnly}
                      onValueChange={field.onChange}
                    >
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
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
            <div className="flex flex-col items-stretch rounded-lg gap-y-4 border border-slate-200 p-4 bg-slate-50/40">
              {isEditMode || !propertyUpdate ? (
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
              ) : (
                <div className="text-gray-800 font-jostFont capitalize font-semibold">
                  Uploaded images here
                </div>
              )}
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
                    {isEditMode || !propertyUpdate ? (
                      <FormField
                        control={form.control}
                        name={`images.${image}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-1 items-start w-full justify-start">
                            <FormLabel className={textClasses}>
                              Property Image {i + 1}
                            </FormLabel>

                            <FormControl>
                              <div className="border border-slate-200 bg-slate-50/50 py-1 px-3 w-full truncate font-jostFont relative">
                                <Input
                                  type="file"
                                  disabled={isReadOnly}
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
                    ) : (
                      <div className="text-muted-foreground text-sm font-jostFont capitalize p-1 border border-slate-200 w-full bg-slate-100">
                        Property image - {i + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEOS*/}
            <div className="flex flex-col items-stretch rounded-lg gap-4 border border-slate-200 p-4 bg-slate-50/40">
              {isEditMode || !propertyUpdate ? (
                <h5 className={videoTitleClasses}>
                  You are gonna upload your property video here{" "}
                  <span className={"text-sm text-muted-foreground "}>
                    (Optional)
                  </span>
                </h5>
              ) : (
                <h5 className={videoTitleClasses}>
                  Uploaded video{" "}
                  <span className="text-sm text-muted-foreground ">
                    (Optional)
                  </span>
                </h5>
              )}
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
                {isEditMode || !propertyUpdate ? (
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
                              disabled={isReadOnly}
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
                ) : (
                  <div className="text-muted-foreground text-sm font-jostFont capitalize p-1   ">
                    Uploaded video
                  </div>
                )}
              </div>
            </div>

            {isEditMode ||
              (!propertyUpdate && (
                <Button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-800 transition-all duration-200 ease-linear font-jostFont"
                >
                  {!propertyUpdate
                    ? "Submit Property"
                    : "Update & Submit for Review"}
                </Button>
              ))}
            {isReviewMode && (
              <div className="mt-1 flex gap-4">
                {onReject && (
                  <Button
                    className=""
                    type="button"
                    variant={"destructive"}
                    onClick={onReject}
                  >
                    Reject
                  </Button>
                )}
                {onApprove && (
                  <Button
                    type="button"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white"
                    onClick={onApprove}
                  >
                    Approve
                  </Button>
                )}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
