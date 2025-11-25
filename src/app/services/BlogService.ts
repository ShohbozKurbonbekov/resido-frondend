import { serverAPI } from "@/lib/config";
import type { BlogSearchInput, BlogsListPage } from "@/lib/type/blogs";
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
}
export default BlogService;
