import { BlogAuthorType, BlogCategory } from "@/lib/enums/blog.enum";
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
import { SocialSchema } from "./agent";

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

const BlogAuthorFormSchema = z.object({
  authorAvatar: z.union([z.instanceof(File), z.string().url()]).optional(),
  authorName: z
    .string()
    .min(1, "Author name is required")
    .max(30, "Author name is too long"),
  bioInfo: z
    .string()
    .trim()
    .max(100, "Bio must be under 100 characters")
    .optional(),
  socials: SocialSchema,
});

export const BlogFormSchema = z.object({
  blogImage: z.union([z.instanceof(File), z.string().url()]),

  blogAuthorId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),

  blogAuthorType: z.nativeEnum(BlogAuthorType),

  blogTitle: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(50, "Title is too long"),
  blogShortInfo: z
    .string()
    .trim()
    .min(1, "Short info is required")
    .max(50, "Short info is too long"),

  blogContent: z.string().trim().min(100, "Content is too short").trim(),

  blogQuote: z.string().trim().max(200, "Quote is too long").optional(),

  blogTags: z
    .array(z.string().min(1).max(30).trim())
    .max(5, "Maximum 5 tags allowed"),
  blogCategory: z.nativeEnum(BlogCategory),

  blogAuthor: BlogAuthorFormSchema,
});
