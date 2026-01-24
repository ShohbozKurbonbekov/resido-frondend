import { serverAPI } from "@/lib/config";
import type {
  AgenciesListPage,
  Agency,
  AgencyAgePropertiesInput,
  AgencyPaymentSubmit,
  AgencySubscription,
  AgencySubscriptionInfoType,
  ChosenAgencyTargetItemsType,
} from "@/lib/type/agency";
import type { CommonInput, SellersSearchInput } from "@/lib/type/common";
import axios from "axios";
import type { AgencyFormType, AgencyProfileType } from "../data/agency";
import type { BlogsListPage } from "@/lib/type/blogs";
import type { MyNotifications } from "@/lib/type/notification";

class AgencyService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async getAgencyByLocation(
    input: SellersSearchInput,
  ): Promise<AgenciesListPage> {
    try {
      const url = `${this.path}/agency/search/byLocation`;
      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getAgencyByLocation: ", error);
      throw error;
    }
  }
  public async getAgencyDetail(agencyId: string): Promise<Agency> {
    try {
      const url = `${this.path}/agency/${agencyId}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAgencyDetail service: ", error);
      throw error;
    }
  }
  public async getAgencyAgeProperties(
    agencyId: string,
    input: AgencyAgePropertiesInput,
  ): Promise<ChosenAgencyTargetItemsType> {
    try {
      const url = `${this.path}/agency/${agencyId}/agents-properties`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAgencyAgeProperties service: ", error);
      throw error;
    }
  }

  public async registerAgency(input: AgencyFormType): Promise<void> {
    try {
      const agencyForm = new FormData();
      if (input.address) agencyForm.append("address", input.address);

      if (input.agencyOwner)
        agencyForm.append("agencyOwner", input.agencyOwner);

      if (input.licenseNumber)
        agencyForm.append("licenseNumber", input.licenseNumber);

      if (input.memberEmail)
        agencyForm.append("memberEmail", input.memberEmail);

      if (input.memberName) agencyForm.append("memberName", input.memberName);

      if (input.memberPhone)
        agencyForm.append("memberPhone", input.memberPhone);

      if (input.yearOfExperience)
        agencyForm.append("yearOfExperience", input.yearOfExperience);

      if (input.certificate && input.certificate instanceof File)
        agencyForm.append("certificate", input.certificate);

      const url = `${this.path}/agency/appy/agency-position`;

      const result = await axios.post(url, agencyForm, {
        withCredentials: true,
      });

      return result.data;
    } catch (error) {
      console.log("ERORR in registerAgency: ", error);
      throw error;
    }
  }

  public async validatePrePayment(): Promise<boolean> {
    try {
      const url = `${this.path}/agency/validation/pre-payment`;

      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in validatePrePayment  service");
      throw error;
    }
  }

  public async proceedPayment(input: AgencyPaymentSubmit): Promise<Agency> {
    try {
      const url = `${this.path}/agency/payment/info/submit`;
      const result = await axios.post(url, input, { withCredentials: true });
      localStorage.setItem("memberData", JSON.stringify(result.data));
      return result.data;
    } catch (error) {
      console.log("Error in proceedPayment: ", error);
      throw error;
    }
  }
  public async reProceedPayment(
    input: AgencyPaymentSubmit,
  ): Promise<AgencySubscription> {
    try {
      const url = `${this.path}/agency/subscription/resubscribe`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in reProceedPayment: ", error);
      throw error;
    }
  }

  public async updateAgencyProfile(input: AgencyProfileType): Promise<Agency> {
    try {
      const formData = new FormData();

      if (input.address) formData.append("address", input.address);

      if (input.agencyOwner) formData.append("agencyOwner", input.agencyOwner);

      if (input?.bioInfo) formData.append("bioInfo", input.bioInfo);

      if (input.licenseNumber)
        formData.append("licenseNumber", input.licenseNumber);

      if (input.memberEmail) formData.append("memberEmail", input.memberEmail);

      if (input.memberName) formData.append("memberName", input.memberName);

      if (input.memberPhone) formData.append("memberPhone", input.memberPhone);

      if (input.yearOfExperience)
        formData.append("yearOfExperience", input.yearOfExperience);

      if (input?.socialLinks) {
        formData.append("socialLinks", JSON.stringify(input.socialLinks));
      }

      if (input.certificate instanceof File) {
        formData.append("certificate", input.certificate);
      }

      // Append file ONLY if it exists
      if (input.avatar instanceof File) {
        formData.append("avatar", input.avatar);
      }

      const agency = await axios.post(
        `${this.path}/agency/update/agency-profile`,
        formData,
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("memberData", JSON.stringify(agency.data));

      return agency.data;
    } catch (error) {
      console.log("Error in updateAgentProfile service: ", error);
      throw error;
    }
  }

  public async myBlogs(input: CommonInput): Promise<BlogsListPage> {
    try {
      const url = `${serverAPI}/agency/get/myBlogs?page=${input.page}&limit=${input.limit}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in  agency myBlogs service: ", error);
      throw error;
    }
  }

  public async myNotifications(input: CommonInput): Promise<MyNotifications> {
    try {
      const url = `${serverAPI}/agency/get/notifications?page=${input.page}&limit=${input.limit}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in  agency myNotifications service: ", error);
      throw error;
    }
  }
  public async deleteMyBlog(id: string): Promise<void> {
    try {
      const url = `${this.path}/agency/delete/myBlog/${id}`;
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      console.log("Error in agency deleteMyBlog service: ", error);
      throw error;
    }
  }

  public async getSubscriptionInfo(): Promise<AgencySubscriptionInfoType> {
    try {
      const url = `${this.path}/agency/subscription/info`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getSubscriptionInfo: ", error);
      throw error;
    }
  }

  public async cancelSubscription(): Promise<AgencySubscription> {
    try {
      const url = `${this.path}/agency/subscription/cancel`;
      const result = await axios.post(url, {}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in cancelSubscription: ", error);
      throw error;
    }
  }

  public async renewSubscription(id: string): Promise<AgencySubscription> {
    try {
      const url = `${serverAPI}/agency/subscription/renew`;
      const result = await axios.post(url, { id }, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in renewSubscription: ", error);
      throw error;
    }
  }
}
export default AgencyService;
