import { serverAPI } from "@/lib/config";
import type { LoginResult } from "@/lib/type/common";
import type { LoginInput } from "@/lib/type/member";
import type { MessageInput } from "@/lib/type/message";
import axios from "axios";
import type { Message } from "react-hook-form";

class MemberService {
  private readonly serverApi;

  constructor() {
    this.serverApi = serverAPI;
  }

  public async login(input: LoginInput): Promise<LoginResult> {
    try {
      const url = `${this.serverApi}/member/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in login: ", error);
      throw error;
    }
  }

  public async writeMessageMember(input: MessageInput): Promise<Message> {
    try {
      const url = `${this.serverApi}/member/write/message`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in writeMessageMember: ", error);
      throw error;
    }
  }
}

export default MemberService;
