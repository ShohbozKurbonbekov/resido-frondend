import type {
  BlogAuthorType,
  BlogCategory,
  BlogStatus,
  SortOrder,
} from "../enums/blog.enum";
import type { CommonInput, TotalCounter } from "./common";
export interface Blog {
  _id: string;
  blogImage: string;
  blogAuthorId: string;
  blogAuthorType: BlogAuthorType;
  blogStatus: BlogStatus;
  blogTitle: string;
  blogContent: string;
  blogQuote?: string;
  blogTags: string[];
  views: number;
  totalLikes: number;
  totalComments: number;
  averageRating: number;
  blogCategory: BlogCategory;
  blogShortInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogSearchType {
  title?: string;
  category?: string;
}

export interface BlogSearchInput extends CommonInput {
  sort?: SortOrder;
  search?: BlogSearchType;
}
export interface BlogsListPage {
  blogs: Blog[];
  totalBlogsNumber: TotalCounter[];
}

//////////////////////////////////// SHOULD BE DELETED LATE ↓ ///////////////////////////
export interface CommentType {
  id: number;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

export interface SocialType {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
}
export interface WriterType {
  name: string;
  bio: string;
  avatar: string;
  social: SocialType;
}
export interface BlogType {
  tags: string[];
  date: string | number;
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  quote: string;
  comments: CommentType[];
  writer: WriterType;
}
