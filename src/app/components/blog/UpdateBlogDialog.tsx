import type { Blog, BlogsListPage } from "@/lib/type/blogs";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SetStateType } from "@/lib/type/common";

import { BlogFormSchema } from "@/app/data/blog";
import { Button } from "@/components/ui/button";
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
import { BlogCategory } from "@/lib/enums/blog.enum";
import { customLetterCustomise } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircleWarningIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { createSelector } from "reselect";
import { serverAPI } from "@/lib/config";
import { retrieveAgentMyBlogs } from "@/app/screens/dashboards/agent/selector";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setAgentMyBlogs } from "@/app/screens/dashboards/agent/slice";
import AgentService from "@/app/services/AgentService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";

// ---------------------------------------- REDUX INTEGRATION --------------------------------------
const agentMyBlogsRetriever = createSelector(
  retrieveAgentMyBlogs,
  (agentMyBlogs) => ({ agentMyBlogs })
);

const agentMyBlogsDispatch = (dispatch: Dispatch) => ({
  setAgentMyBlogs: (data: BlogsListPage) => dispatch(setAgentMyBlogs(data)),
});

// --------------------------------------- CLASSES ----------------------
const errorClasses = "text-xs text-rose-600/90";
const rowWrapperClasses =
  "grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4 bg-slate-50/40";

const inputClasses =
  "border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-600/30 focus-visible:border-emerald-600";
const textClasses = "text-sm font-medium text-slate-700 font-jostFont";

interface UpdateBLogDiolog {
  isModelOpen: boolean;
  setModelOpen: SetStateType<boolean>;
  setSelectedBlog: SetStateType<null | Blog>;
  selectedBlog: Blog | null;
}
const UpdateBLogDiolog: React.FC<UpdateBLogDiolog> = ({
  isModelOpen,
  setModelOpen,
  selectedBlog,
  setSelectedBlog,
}) => {
  const { agentMyBlogs } = useSelector(agentMyBlogsRetriever);
  const { setAgentMyBlogs } = agentMyBlogsDispatch(useDispatch());

  const [imagePath, setImagePath] = useState<string>("Upload an image");

  const [blogImage, setBlogImage] = useState<string | undefined>(
    selectedBlog?.blogImage
      ? `${serverAPI}/${selectedBlog?.blogImage}`
      : undefined
  );

  const [tags, setTags] = useState<string[]>(selectedBlog?.blogTags || []);
  const [tagInput, setTagInput] = useState("");
  const form = useForm<z.input<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      blogImage: `${serverAPI}/${selectedBlog?.blogImage}`,
      blogTitle: selectedBlog?.blogTitle,
      blogShortInfo: selectedBlog?.blogShortInfo,
      blogContent: selectedBlog?.blogContent,
      blogQuote: selectedBlog?.blogQuote,
      blogCategory: selectedBlog?.blogCategory,
    },
  });

  // ---------------------------------------- HANDLERS ------------------------
  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;
    if (value.length > 20) return;
    if (tags.includes(value)) return;
    if (tags.length >= 4) return;

    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSavebtn = useCallback(
    async (values: z.infer<typeof BlogFormSchema>) => {
      if (!selectedBlog) return;
      const blogInput = {
        ...values,
        blogTags: tags,
      } as Blog;

      const snapshot = {
        blogs: [...agentMyBlogs.blogs],
        totalBlogsNumber: [...agentMyBlogs.totalBlogsNumber],
      };

      try {
        const member = new AgentService();
        const result = await member.agentUpdateMyBlog(blogInput);
        const updatedBlogs = [
          ...agentMyBlogs.blogs.map((blog) =>
            blog._id === result._id ? result : blog
          ),
        ];
        setAgentMyBlogs({
          blogs: updatedBlogs,
          totalBlogsNumber: snapshot.totalBlogsNumber,
        });
        setModelOpen(false);
        setSelectedBlog(null);
        await sweetTopSmallSuccessAlert("Successfully updated!");
      } catch (error) {
        console.log("Error in handleSaveBtn: ", error);
        await sweetErrorHandling(error!);
        setAgentMyBlogs(snapshot);
      }
    },
    [
      agentMyBlogs,
      selectedBlog,
      setAgentMyBlogs,
      tags,
      setModelOpen,
      setSelectedBlog,
    ]
  );

  return (
    <Dialog open={isModelOpen} onOpenChange={setModelOpen}>
      <DialogContent className="w-11/12 max-w-7xl overflow-y-auto h-5/6">
        <DialogHeader>
          <DialogTitle className="text-xl font-jostFont text-gray-700">
            Update Blog
          </DialogTitle>
        </DialogHeader>
        <Card className="w-full border border-slate-200 bg-slate-50 shadow-none rounded-md">
          <CardContent className="bg-white rounded-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSavebtn)}
                className="space-y-3 py-5"
              >
                {/* BLOG IMAGE */}
                <div className="flex sm:flex-row flex-col  items-stretch gap-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4 ">
                  <div className="shrink-0 overflow-hidden rounded-md border border-slate-300 bg-slate-100 w-full sm:w-1/2 min-h-52 max-h-64 flex items-center justify-center ">
                    {blogImage ? (
                      <img
                        src={blogImage}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-slate-400 fontj">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-1 items-start">
                    <FormField
                      control={form.control}
                      name="blogImage"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 items-start">
                          <FormLabel className={`${textClasses}`}>
                            Blog Image
                          </FormLabel>

                          <FormControl>
                            <div className="border border-slate-200 bg-slate-50/50 py-1 px-3 rounded-md truncate font-jostFont relative">
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

                          <FormMessage className={errorClasses} />
                          <p className="text-xs text-slate-500">
                            Jpg, Jpeg or Png. Square images recommended.
                          </p>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* BLOG TITLE  / BLOG CATEGORY*/}
                <div className={rowWrapperClasses}>
                  <FormField
                    control={form.control}
                    name="blogTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={textClasses}>Title</FormLabel>
                        <FormControl>
                          <Input {...field} className={inputClasses} />
                        </FormControl>
                        <FormMessage className={errorClasses} />
                      </FormItem>
                    )}
                  />

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
                            <SelectTrigger className={`${inputClasses}`}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {Object.values(BlogCategory).map((category) => (
                              <SelectItem key={category} value={category}>
                                {customLetterCustomise(category)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage className={errorClasses} />
                      </FormItem>
                    )}
                  />
                </div>

                {/* BLOG SHORT INFO */}
                <div className={rowWrapperClasses}>
                  <FormField
                    control={form.control}
                    name="blogShortInfo"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className={textClasses}>
                          Short Info
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={3}
                            className={inputClasses}
                          />
                        </FormControl>
                        <FormMessage className={errorClasses} />
                      </FormItem>
                    )}
                  />
                </div>

                {/* BLOG CONTENT */}
                <div className={rowWrapperClasses}>
                  <FormField
                    control={form.control}
                    name="blogContent"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className={textClasses}>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={8}
                            className={inputClasses}
                          />
                        </FormControl>
                        <FormMessage className={errorClasses} />
                      </FormItem>
                    )}
                  />
                </div>

                {/* BLOG QUOTE */}
                <div className={rowWrapperClasses}>
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
                        <FormMessage className={errorClasses} />
                      </FormItem>
                    )}
                  />
                </div>

                {/* BLOG TAGS */}
                <div className={rowWrapperClasses}>
                  <div className="col-span-2 space-y-2">
                    <h5 className="text-base text-gray-600 font-jostFont font-semibold">
                      Tags help others discover your post — add up to 4
                    </h5>

                    {/* TAG INPUT */}
                    <Input
                      type="text"
                      className={inputClasses}
                      placeholder="Type a tag and press Enter"
                      value={tagInput}
                      disabled={tags.length >= 4}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    {tagInput.length > 20 && (
                      <span className="text-amber-400 font-jostFont text-xs flex flex-row gap-x-1 items-start">
                        <MessageCircleWarningIcon className="h-4 w-4" />
                        Tag must be shorter than 20 words
                      </span>
                    )}

                    {/* HELPERS */}
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Example: React, Full-Stack</span>
                      <span>{tags.length} / 4</span>
                    </div>

                    {/* TAG PILLS */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="
            flex items-center gap-1
            rounded-full
            bg-emerald-100
            text-emerald-800
            px-3 py-1
            text-xs
            font-medium font-jostFont
          "
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-emerald-950"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white
            font-medium focus-visible:ring-2 focus-visible:ring-emerald-700/30 transition-all duration-200 ease-linear  translate-y-4"
                >
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBLogDiolog;
