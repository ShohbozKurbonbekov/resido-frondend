import { serverAPI } from "@/lib/config";
import axios from "axios";
import type { Comment, CommentInput, Comments } from "@/lib/type/comment";
import type { ChosenPropCommentsInput } from "@/lib/type/ChosenPropCommentsInput";
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

  public async getItemComments(
    itemId: string,
    input: ChosenPropCommentsInput
  ): Promise<Comments> {
    try {
      const url = `${this.path}/comment/get/${itemId}/comments`;

      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getItemComments: ", error);
      throw error;
    }
  }

  public async createComment(input: CommentInput): Promise<Comment> {
    try {
      const url = `${serverAPI}/comment/write-comment`;

      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in createComment service: ", error);
      throw error;
    }
  }
}

export default CommentService;
