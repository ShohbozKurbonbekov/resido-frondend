import { serverAPI } from "@/lib/config";
import type { CommonInput, CommonUsers, LoginResult } from "@/lib/type/common";
import type {
  User,
  UserDashboardOverviewType,
  UserUpdate,
} from "@/lib/type/dashboard/user";
import type { LoginInput, UserMemberInput } from "@/lib/type/member";
import type { MemberMessages, Message, MessageInput } from "@/lib/type/message";
import axios from "axios";

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

  public async messageRead(id: string): Promise<void> {
    try {
      const url = `${this.serverApi}/member/message/${id}/read`;
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      console.log("Error in messageRead service: ", error);
      throw error;
    }
  }

  public async deleteMessage(id: string): Promise<void> {
    try {
      const url = `${this.serverApi}/member/message/${id}/delete`;
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      console.log("Error in deleteMessager service: ", error);
      throw error;
    }
  }
  public async messageEdit(id: string, content: string): Promise<void> {
    try {
      const url = `${this.serverApi}/member/message/${id}/edit`;
      await axios.post(url, { content }, { withCredentials: true });
    } catch (error) {
      console.log("Error in messageEdit service: ", error);
      throw error;
    }
  }

  public async updateMember(input: UserUpdate): Promise<User> {
    try {
      const formData = new FormData();

      // Append text fields
      if (input.memberName) formData.append("memberName", input.memberName);
      if (input.userFullname)
        formData.append("userFullname", input.userFullname);
      if (input.memberEmail) formData.append("memberEmail", input.memberEmail);
      if (input.memberPhone) formData.append("memberPhone", input.memberPhone);
      if (input.memberAddress)
        formData.append("memberAddress", input.memberAddress);
      if (input.memberDescription)
        formData.append("memberDescription", input.memberDescription);
      if (input.occupation) formData.append("occupation", input.occupation);

      if (input.memberSocials) {
        formData.append("memberSocials", JSON.stringify(input.memberSocials));
      }
      // Append file ONLY if it exists
      if (input.avatar instanceof File) {
        formData.append("avatar", input.avatar);
      }

      const result = await axios.post(
        `${this.serverApi}/member/update`,
        formData,
        {
          withCredentials: true,
        },
      );

      const member: User = result.data;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (error) {
      console.error("Error in updateMember", error);
      throw error;
    }
  }

  public async userDashboardOverview(): Promise<UserDashboardOverviewType> {
    try {
      const url = `${this.serverApi}/member/dashboard/overview`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in userDashboardOverview service: ", error);
      throw error;
    }
  }
}

export default MemberService;
