import { customTruncate } from "@/lib/config";
import { BlogCategory } from "@/lib/enums/blog.enum";
import type { AdminAllBlogsType } from "@/lib/type/blogs";
import type { Column } from "@/lib/type/common";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import z from "zod";

export const blogShareNetworks = [
  { name: "facebook", ShareIcon: FacebookShareButton, Icon: FacebookIcon },
  { name: "twitter", ShareIcon: TwitterShareButton, Icon: TwitterIcon },
  {
    name: "linkedin",
    ShareIcon: LinkedinShareButton,
    Icon: LinkedinIcon,
  },
  { name: "email", ShareIcon: EmailShareButton, Icon: EmailIcon },
  { name: "telegram", ShareIcon: TelegramShareButton, Icon: TelegramIcon },
];

type CATEGORIES_TYPE = "GENERAL" | "RECOMMENDED" | "NEWS" | "HUMOR";
export const CATEGORIES: CATEGORIES_TYPE[] = [
  "NEWS",
  "HUMOR",
  "GENERAL",
  "RECOMMENDED",
];

export const BlogFormSchema = z.object({
  blogImage: z.union([
    z.instanceof(File),
    z.string().trim().min(1, { message: "Please upload image" }),
  ]),

  blogTitle: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  blogShortInfo: z
    .string()
    .trim()
    .min(1, "Short info is required")
    .max(70, "Short info is too long"),

  blogContent: z.string().trim().min(100, "Content is too short"),

  blogQuote: z
    .string()
    .trim()
    .max(200, "Quote is too long")
    .optional()
    .or(z.literal("")),

  blogCategory: z.nativeEnum(BlogCategory),
});

export const blogColumns: Column<AdminAllBlogsType>[] = [
  {
    key: "title",
    header: "Blog Title",
    render: (row) => customTruncate(row.title, 30),
  },

  { key: "category", header: "Blog Type" },
  { key: "authorType", header: "Author Type" },
  { key: "author", header: "Author" },
  { key: "status", header: "Status" },
  {
    key: "date",
    header: "Date",
    render: (row) => new Date(row.date).toLocaleString(),
  },
];

export type BlogSchemaInputsSubmit = z.infer<typeof BlogFormSchema>;
