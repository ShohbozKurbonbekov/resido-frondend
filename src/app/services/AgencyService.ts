import { serverAPI } from "@/lib/config";
import type { AgenciesListPage } from "@/lib/type/agency";
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
}
export default AgencyService;
