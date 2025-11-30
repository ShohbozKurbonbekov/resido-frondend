import type {
  ChosenProperty,
  FeaturedPropertyInput,
  FeaturedPropertyResults,
  Properties,
  PropertiesSearchInput,
  Property,
  RecentPropertyForRent,
  RecentPropertyResult,
} from "@/lib/type/property";
import { serverAPI } from "../../lib/config";
import axios from "axios";
import type { T } from "@/lib/type/common";

class PropertyService {
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
  // GET ALL PROPERTIES
  public async getAllProperties(
    input: PropertiesSearchInput
  ): Promise<Properties> {
    try {
      const url = `${this.path}/property/getAll`;
      console.log("url", url);
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAllProperties Service: ", error);
      throw error;
    }
  }

  // LIKE TARGET PROPERTY
  public async likeTargetProperty(propertyId: string): Promise<Property> {
    try {
      const url = `${serverAPI}/property/liked`;
      const query: T = { input: propertyId };
      const result = await axios.post(url, query, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in likeTargetProperty service", error);
      throw error;
    }
  }

  // GET A CHOSEN PROPERTY
  public async getProperty(propertyId: string): Promise<ChosenProperty> {
    try {
      const url = `${serverAPI}/property/${propertyId}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getProperty service");
      throw error;
    }
  }

  // SAVE A CHOSEN PROPERTY
  public async saveTargetProperty(propertyId: string): Promise<Property> {
    try {
      const url = `${this.path}/property/${propertyId}/save`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in saveTargetProperty: ", error);
      throw error;
    }
  }
}

export default PropertyService;
