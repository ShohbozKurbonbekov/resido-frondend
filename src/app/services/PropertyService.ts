import type {
  FeaturedPropertyInput,
  FeaturedPropertyResults,
  RecentPropertyForRent,
  RecentPropertyResult,
} from "@/lib/type/property";
import { serverAPI } from "../../lib/config";
import axios from "axios";

class PropertyService {
  getProperties() {
    throw new Error("Method not implemented.");
  }
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  // GET RECENT PROPERTY
  public async getRecentRentProperty(
    input: RecentPropertyForRent
  ): Promise<RecentPropertyResult> {
    try {
      const url = `${this.path}/property/property-recent-rent`;

      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getRecentRentProperties process: ", error);
      throw error;
    }
  }

  // GET FEATURED PROPERTIES
  public async getFeaturedProperty(
    input: FeaturedPropertyInput
  ): Promise<FeaturedPropertyResults> {
    try {
      const url = `${this.path}/property/featured-property`;
      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in GetFeaturedProperties");
      throw error;
    }
  }
}

export default PropertyService;
