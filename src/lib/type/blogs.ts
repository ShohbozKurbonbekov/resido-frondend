import type {
  BlogAuthorType,
  BlogCategory,
  BlogStatus,
  SortOrder,
} from "../enums/blog.enum";
import type { CommonInput, Social, TotalCounter } from "./common";
import type { Comment } from "./comment";
export interface BlogAuthor {
  authorAvatar?: string;
  authorName: string;
  socials: Social;
  bioInfo?: string;
}
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
  blogAuthor: BlogAuthor;
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

export interface ChosenBlogType {
  mainBlog: Blog | null;
  trendingBlogs: Blog[];
}

export interface ChosenBlogComments {
  comments: Comment[];
  metaCounter: TotalCounter[];
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
