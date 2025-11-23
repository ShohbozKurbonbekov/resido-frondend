import { serverAPI } from "@/lib/config";
import type {
  AgenciesListPage,
  Agency,
  AgencyAgePropertiesInput,
} from "@/lib/type/agency";
import type { SellersSearchInput } from "@/lib/type/common";
import axios from "axios";

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
  ): Promise<Agency> {
    try {
      const url = `${this.path}/agency/${agencyId}/agents-properties`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAgencyAgeProperties service: ", error);
      throw error;
    }
  }
}
export default AgencyService;
