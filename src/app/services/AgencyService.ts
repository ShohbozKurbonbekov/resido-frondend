import { serverAPI } from "@/lib/config";

class AgencyService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async getAgency(id: string | undefined) {
    try {
      const url = `${this.path}/ageency/${id}`;
      console.log(url);
    } catch (error) {
      console.log("Error in getAgency: ", error);
      throw error;
    }
  }

  public async getAgencies() {}
}
export default AgencyService;
