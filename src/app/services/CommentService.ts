import { serverAPI } from "@/lib/config";
import axios from "axios";
import type {
  ChosenItemCommentsInput,
  Comment,
  CommentInput,
  Comments,
  CommentUpdate,
} from "@/lib/type/comment";
import type { CommonInput } from "@/lib/type/common";
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
    input: ChosenItemCommentsInput
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
  public async getUserComments(input: CommonInput): Promise<Comments> {
    try {
      const url = `${this.path}/comment/get/all/user-reviews`;
      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getUserComments service: ", error);
      throw error;
    }
  }

  public async updateUserComment(
    _id: string,
    updatedInput: CommentUpdate
  ): Promise<void> {
    try {
      const url = `${this.path}/comment/update/${_id}`;
      await axios.post(url, updatedInput, { withCredentials: true });
    } catch (error) {
      console.log("Error in updateUserComment: ", error);
      throw error;
    }
  }
  public async deleteUserComment(id: string): Promise<void> {
    try {
      const url = `${this.path}/comment/delete/${id}`;
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      console.log("Error in deleteUserComment Service: ", error);
      throw error;
    }
  }
}

export default CommentService;
