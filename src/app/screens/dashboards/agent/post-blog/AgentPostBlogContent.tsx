import { BlogFormSchema } from "@/app/data/blog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BlogAuthorType, BlogCategory } from "@/lib/enums/blog.enum";
import type { AgentData } from "@/lib/type/agent";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

// --------------------------------------- CLASSES ----------------------
const rowWrapperClasses =
  "grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4 bg-slate-50/40";

const inputClasses =
  "border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-600/30 focus-visible:border-emerald-600";
const textClasses = "text-sm font-medium text-slate-700 font-jostFont";

// -----------------------------------COMPONENT -----------------------
interface AgentPostBlogContentType {
  agent: AgentData;
}
const AgentPostBlogContent: React.FC<AgentPostBlogContentType> = React.memo(
  ({ agent }) => {
    const [imagePath, setImagePath] = useState<string>("Choose  a file");
    const [blogImage, setBlogImage] = useState<string | undefined>(undefined);
    const form = useForm<z.input<typeof BlogFormSchema>>({
      resolver: zodResolver(BlogFormSchema),
      defaultValues: {
        blogImage: undefined,
        blogAuthorId: agent._id,
        blogAuthorType: BlogAuthorType.AGENT,
        blogTitle: "",
        blogShortInfo: "",
        blogContent: "",
        blogQuote: undefined,
        blogCategory: BlogCategory.GENERAL,
        blogTags: [],
        blogAuthor: {
          authorAvatar: agent?.avatar,
          authorName: agent?.fullName,
          bioInfo: agent?.bioInfo,
          socials: agent?.socialLinks,
        },
      },
    });

    // ---------------------------------------- HANDLERS ------------------------

    const onSubmit = useCallback(
      async (values: z.infer<typeof BlogFormSchema>) => {
        console.log(values);
      },
      []
    );
    return (
      <Card className="w-full border border-slate-200 bg-slate-50">
        <CardContent className="bg-white rounded-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-5"
            >
              {/* BLOG IMAGE */}
              <div className="flex sm:flex-row flex-col  items-stretch gap-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                <div className="shrink-0 overflow-hidden rounded-md border border-slate-300 bg-slate-100 w-full sm:w-1/2 min-h-52 max-h-64 flex items-center justify-center ">
                  {blogImage ? (
                    <img
                      src={blogImage}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <FormField
                    control={form.control}
                    name="blogImage"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1">
                        <FormLabel
                          className={`${textClasses} sm:text-start text-center`}
                        >
                          Blog Image
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
                                setBlogImage(url);
                                setImagePath(file.name);
                                field.onChange(file);
                              }}
                            />
                            <span className={textClasses}>{imagePath}</span>
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
                {/* BLOG TITLE */}
                <FormField
                  control={form.control}
                  name="blogTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClasses} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />

                {/* BLOG CATEGORY */}
                <FormField
                  control={form.control}
                  name="blogCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={textClasses}>Category</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className={inputClasses}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {Object.values(BlogCategory).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />
              </div>

              <div className={rowWrapperClasses}>
                {/* BLOG SHORT INFO */}
                <FormField
                  control={form.control}
                  name="blogShortInfo"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={textClasses}>Short Info</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />
              </div>

              <div className={rowWrapperClasses}>
                {/* BLOG CONTENT */}
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={textClasses}>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={8} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />
              </div>

              <div className={rowWrapperClasses}>
                {/* BLOG QUOTE */}
                <FormField
                  control={form.control}
                  name="blogQuote"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={textClasses}>
                        Quote (optional)
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClasses} />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />

                {/* BLOG TAGS */}
                <FormField
                  control={form.control}
                  name="blogTags"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={textClasses}>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tag1, tag2, tag3"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter(Boolean)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-600/90" />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }
);
export default AgentPostBlogContent;
