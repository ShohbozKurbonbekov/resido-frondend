import { serverAPI } from "@/lib/config";
import axios from "axios";
import type { Comment } from "@/lib/type/comment";
class CommentService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async getLatestComments(): Promise<Comment[]> {
    try {
      const url = `${this.path}/comment/get/latest`;

      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getLatestComments Service: ", error);
      throw error;
    }
  }
}

export default CommentService;
