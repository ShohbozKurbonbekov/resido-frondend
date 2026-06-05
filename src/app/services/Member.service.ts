import { serverAPI } from "@/lib/config";
import type { PropertyStatus } from "@/lib/enums/property.enum";
import type { CommonInput, CommonUsers, LoginResult } from "@/lib/type/common";
import type {
  User,
  UserDashboardOverviewType,
  UserUpdate,
} from "@/lib/type/dashboard/user";
import type { LoginInput } from "@/lib/type/member";
import type { MemberMessages, Message, MessageInput } from "@/lib/type/message";
import type {
  NotificationCreation,
  UserNotifications,
} from "@/lib/type/notification";
import type { PaymentTariffsType, TarrifOutputType } from "@/lib/type/pricing";
import type { CommonPropertyResults, MyProperties } from "@/lib/type/property";
import axios from "axios";
import type { SIGNUP_SUBMIT } from "../data/navbar";

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
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      console.log("Error in logout Service: ", error);
      throw error;
    }
  }

  public async signup(input: SIGNUP_SUBMIT): Promise<CommonUsers> {
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

  public async messageRead(id: string): Promise<Message> {
    try {
      const url = `${this.serverApi}/member/message/${id}/read`;
      const result = await axios.post(url, {}, { withCredentials: true });
      return result.data;
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

  public async paymentTariffs(input: CommonInput): Promise<PaymentTariffsType> {
    try {
      const url = `${this.serverApi}/member/public/tariffs?page=${input.page}&limit=${input.limit}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in PaymentTariffs of memberService  service: ", error);
      throw error;
    }
  }
  public async getTariff(id: string): Promise<TarrifOutputType> {
    try {
      const url = `${this.serverApi}/member/public/tariffs/${id}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in fethcing getTariff: ", error);
      throw error;
    }
  }

  public async myNotifications(input: CommonInput): Promise<UserNotifications> {
    try {
      const url = `${serverAPI}/member/get/notifications?page=${input.page}&limit=${input.limit}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in  member myNotifications service: ", error);
      throw error;
    }
  }
  public async authorizeAgentAccount(
    notificationId: string,
  ): Promise<Omit<NotificationCreation, "notificationOwner">> {
    try {
      const url = `${serverAPI}/member/authorize/agent/account/${notificationId}`;
      const result = await axios.post(url, {}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in authorizeAgentAccount service: ", error);
      throw error;
    }
  }

  public async approveAgentRejection(
    notificationId: string,
  ): Promise<Omit<NotificationCreation, "notificationOwner">> {
    try {
      const url = `${serverAPI}/member/approve/agent/rejection/${notificationId}`;
      const result = await axios.post(url, {}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in approveAgentRejection service: ", error);
      throw error;
    }
  }

  public async dashboardMyProperties(
    input: CommonInput & { status?: PropertyStatus },
  ): Promise<CommonPropertyResults<MyProperties>> {
    try {
      const url = `${this.serverApi}/member/dashboard/get/all-properties?page=${input.page}&limit=${input.limit}&status=${input.status}`;

      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in dashboardMyProperties service: ", error);
      throw error;
    }
  }
}

export default MemberService;
