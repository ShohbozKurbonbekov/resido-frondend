import { serverAPI } from "@/lib/config";
import type { CommonInput, CommonUsers, LoginResult } from "@/lib/type/common";
import type { User } from "@/lib/type/dashboard/user";
import type { LoginInput, UserMemberInput } from "@/lib/type/member";
import type { MemberMessages, MessageInput } from "@/lib/type/message";
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

  public async getMemberMessages(input: CommonInput): Promise<MemberMessages> {
    try {
      const url = `${this.serverApi}/member/get/all-messages`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getMemberMessages: ", error);
      throw error;
    }
  }

  public async getAdmin(): Promise<User> {
    try {
      const url = `${this.serverApi}/member/admin`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAdmin service: ", error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = `${this.serverApi}/member/logout`;
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("LOGOUT: ", result);
      localStorage.removeItem("memberData");
    } catch (error) {
      console.log("Error in logout Service: ", error);
      throw error;
    }
  }

  public async signup(input: UserMemberInput): Promise<CommonUsers> {
    try {
      const url = `${this.serverApi}/member/signup`;
      const result = await axios.post(url, input, { withCredentials: true });
      const user = result.data.user;

      localStorage.setItem("memberData", JSON.stringify(user));
      return user;
    } catch (error) {
      console.log("Error in user signupUser service: ", error);
      throw error;
    }
  }
}

export default MemberService;
