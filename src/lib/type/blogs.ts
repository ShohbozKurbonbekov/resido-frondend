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
  meLiked?: boolean;
  prevBlog?: Blog | null;
  nextBlog?: Blog | null;
  totalSavings: number;
  meSaved?: boolean;
}

export interface BlogSearchType {
  title?: string;
  category?: BlogCategory;
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

export interface SearchBlogTags {
  blogs: Blog[];
}

export interface SavedBlog {
  _id: string;
  blogImage: string;
  blogTitle: string;
  blogShortInfo: string;
  blogCategory: BlogCategory;
  createdAt: string;
  updatedAt: string;
}

export interface SavedBlogsOutput {
  blogs: SavedBlog[];
  totalBlogsNumber: TotalCounter[];
}
