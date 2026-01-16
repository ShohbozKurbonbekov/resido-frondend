import { serverAPI } from "@/lib/config";
import type {
  AgenciesListPage,
  Agency,
  AgencyAgePropertiesInput,
  AgencyPaymentSubmit,
  ChosenAgencyTargetItemsType,
} from "@/lib/type/agency";
import type { SellersSearchInput } from "@/lib/type/common";
import axios from "axios";
import type { AgencyFormType } from "../data/agency";

class AgencyService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async getAgencyByLocation(
    input: SellersSearchInput
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
    input: AgencyAgePropertiesInput
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
}
export default AgencyService;
