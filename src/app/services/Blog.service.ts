import { serverAPI } from "@/lib/config";
import type { BlogNeighborings } from "@/lib/enums/blog.enum";
import type {
  Blog,
  BlogInput,
  BlogSearchInput,
  BlogsListPage,
  ChosenBlogType,
  SavedBlogsOutput,
  SearchBlogTags,
} from "@/lib/type/blogs";
import type { CommonInput, T } from "@/lib/type/common";
import axios from "axios";

class BlogService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async getAllBlogs(input: BlogSearchInput): Promise<BlogsListPage> {
    try {
      const url = `${this.path}/blog/get/all`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAllBlogs service: ", error);
      throw error;
    }
  }

  public async getBlogDetail(blogId: string): Promise<ChosenBlogType> {
    try {
      const url = `${this.path}/blog/${blogId}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getBlogDetail service: ", error);
      throw error;
    }
  }

  public async likeTargetBlog(blogId: string): Promise<Blog> {
    try {
      const input: T = {
        input: blogId,
      };
      const url = `${this.path}/blog/liked`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in likeTargetBlog: ", error);
      throw error;
    }
  }
  public async getNeighbouringBlog(
    blogId: string,
    direction: BlogNeighborings
  ): Promise<Blog> {
    try {
      const url = `${this.path}/blog/${blogId}/neighbour?direction=${direction}`;
      console.log(url);
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log(`Error in getting getNeighbouringBlog service: `, error);
      throw error;
    }
  }
  public async saveToggleBlog(blogId: string): Promise<Blog> {
    try {
      const url = `${this.path}/blog/${blogId}/toggle-save`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in likeTargetItems service: ", error);
      throw error;
    }
  }

  public async blogSearchTag(tag: string): Promise<SearchBlogTags> {
    try {
      const url = `${this.path}/blog/tags/related?tag=${tag}`;
      const result = await axios.get(url, { withCredentials: true });
      const data = result.data;
      return data;
    } catch (error) {
      console.log("Error in getting blogSearchTag: ", error);
      throw error;
    }
  }

  public async getSavedBlogs(input: CommonInput): Promise<SavedBlogsOutput> {
    try {
      const url = `${this.path}/blog/see/saved-blogs`;

      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getFollowedAgents service: ", error);
      throw error;
    }
  }

  public async createBlog(input: BlogInput): Promise<SavedBlogsOutput> {
    try {
      const formData = new FormData();

      if (input.blogImage instanceof File) {
        formData.append("blogImage", input.blogImage);
      }

      if (input.blogCategory)
        formData.append("blogCategory", input.blogCategory);

      if (input.blogContent) formData.append("blogContent", input.blogContent);

      if (input.blogTags) {
        formData.append("blogTags", JSON.stringify(input.blogTags));
      }
      if (input.blogQuote) formData.append("blogQuote", input.blogQuote);

      if (input.blogShortInfo)
        formData.append("blogShortInfo", input.blogShortInfo);

      if (input.blogTitle) formData.append("blogTitle", input.blogTitle);

      const result = await axios.post(
        `${this.path}/member/post/blog`,
        formData,
        {
          withCredentials: true,
        }
      );

      return result.data;
    } catch (error) {
      console.error("Error in createBlog service", error);
      throw error;
    }
  }
}
export default BlogService;
