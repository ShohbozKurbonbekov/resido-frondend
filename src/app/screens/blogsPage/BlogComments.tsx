import NoFound from "@/app/components/NoFound";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommentType } from "@/lib/type/blogs";
import { dateConverter } from "@/lib/utils";
import { useMemo, useState, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface BlogCommentsProp {
  comments: CommentType[];
}

// ✅ Validation schema with Zod
const FormSchema = z.object({
  name: z.string().min(2, { message: "name must be at least 5 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
});

export default function BlogComments({ comments }: BlogCommentsProp) {
  const [blogQuery, setBlogQuery] = useState<{
    page: number;
    limit: number;
  }>({ limit: 2, page: 1 });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      message: "",
      email: "",
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("form data: ", data);
  };

  // Chunk array
  const chunkingArray = (arr: CommentType[], size: number): CommentType[][] => {
    const result: CommentType[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      // i => 0 => 4 => 8 => 12 => 16 => 20
      result.push(arr.slice(i, i + size)); // [[],[],[],[],[]]
    }
    return result;
  };

  const chunkBlogs = useMemo(
    () => chunkingArray(comments, blogQuery.limit),
    [blogQuery]
  );

  console.log(chunkBlogs[1]);
  return (
    <div className="p-5 bg-white border-2 border-slate-200 rounded-md w-full">
      {comments?.length === 0 && <NoFound title={"No Comments yet"} />}
      {comments.length > 0 && (
        <>
          <h3 className="text-2xl text-darkBlue leading-7 mb-8 capitalize font-jostFont font-bold">
            {String(comments.length).padStart(
              comments.length === 0 ? 1 : 2,
              "0"
            )}{" "}
            comment{comments.length > 1 ? "s" : ""}
          </h3>

          <ul className="flex flex-col gap-y-12 list-none">
            {chunkBlogs[blogQuery.page - 1].map((comment) => (
              <li className="flex flex-row gap-x-7 items-start ">
                <div className="w-auto">
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="max-w-[100px] max-h-[100px] rounded-full"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="text-lg leading-7 mb-2 capitalize text-darkBlue font-semibold font-jostFont">
                    {comment.name}
                  </h4>
                  <span className="text-red-500 mt-1.5 uppercase text-xs font-medium font-jostFont">
                    {dateConverter(comment.date, "Do MMMM YYYY")}
                  </span>
                  <p className="mt-5 text-slate-500 leading-onePointEight font-jostFont text-size_15">
                    {comment.text}
                  </p>
                </div>
              </li>
            ))}
            <PaginationCom
              totalPages={chunkBlogs.length}
              currentPage={blogQuery.page}
              onPageChange={setBlogQuery}
              styleclasses="flex flex-row items-center justify-center gap-3"
            />
          </ul>

          <div className="flex flex-col  mt-12 gap-2 items-stretch">
            <h3 className="text-2xl leading-tight text-darkBlue font-jostFont font-bold capitalize">
              Post Comment
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                action="#"
                className="flex flex-col gap-y-4"
              >
                <div className="grid grid-cols-1  gap-y-4 md:grid-cols-2 md:gap-x-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                        <FormControl>
                          <Input
                            className="bg-slate-100   py-6 focus-visible:ring-slate-300   text-slate-500 border-0 rounded-sm transition-none duration-300 ease-linear"
                            {...field}
                            placeholder="Your Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                        <FormControl>
                          <Input
                            className="bg-slate-100  py-6 focus-visible:ring-slate-300 text-xs text-slate-500 border-0 rounded-sm transition-none duration-300 ease-linear"
                            placeholder="Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* // message */}
                <div className="grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-y-1 items-start justify-start w-full">
                        <FormControl>
                          <Textarea
                            className="bg-slate-100  py-2 focus-visible:ring-slate-300 text-xs text-slate-500 border-0 rounded-sm  outline-0"
                            rows={5}
                            {...field}
                            placeholder="Type your comments"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="text-sm text-white font-jostFont capitalize py-6 px-8 leading-tight rounded-md 
                     hover:bg-blue-500 bg-blue-900 transition-all duration-300 ease-linear 
                     self-start mt-2 active:shadow-[0_0_0px_5px_rgba(59,130,246,0.4)] w-full texxt-center"
                >
                  Submit now
                </Button>
              </form>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}
