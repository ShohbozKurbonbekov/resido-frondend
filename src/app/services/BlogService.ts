import { serverAPI } from "@/lib/config";
import type { BlogNeighborings } from "@/lib/enums/blog.enum";
import type {
  Blog,
  BlogSearchInput,
  BlogsListPage,
  ChosenBlogType,
} from "@/lib/type/blogs";
import type { T } from "@/lib/type/common";
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
  public async saveTargetBlog(blogId: string): Promise<Blog> {
    try {
      const url = `${this.path}/blog/${blogId}/save`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in likeTargetItems service: ", error);
      throw error;
    }
  }
}
export default BlogService;
