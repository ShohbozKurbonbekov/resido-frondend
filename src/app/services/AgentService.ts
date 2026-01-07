import { serverAPI } from "@/lib/config";
import type {
  AgentData,
  AgentInput,
  AgentProperties,
  AgentPropertiesInput,
  AgentsListPage,
  ChosenAgentPageType,
  featuredAgentsInput,
  FeaturedAgentsResult,
  FollowedAgentsType,
} from "@/lib/type/agent";
import type { Blog, BlogsListPage } from "@/lib/type/blogs";
import type { Comments, CommentsSearchInput } from "@/lib/type/comment";
import type { CommonInput, SellersSearchInput } from "@/lib/type/common";
import type {
  AgentMyProperties,
  CommonPropertyResults,
  Property,
} from "@/lib/type/property";
import axios from "axios";
import type { PropertyFormType } from "../data/properties";
import { SellingTypeEnum } from "@/lib/enums/property.enum";

class AgentService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async getAgentByLocation(
    input: SellersSearchInput
  ): Promise<AgentsListPage> {
    try {
      const url = `${this.path}/agent/search/byLocation`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAgentBylocation service: ", error);
      throw error;
    }
  }
  public async getFeaturedAgents(
    input: featuredAgentsInput
  ): Promise<FeaturedAgentsResult> {
    try {
      const url = `${this.path}/agent/featured-agents`;
      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getFeaturedAgents service: ", error);
      throw error;
    }
  }

  public async getAgentDetail(id: string): Promise<ChosenAgentPageType> {
    try {
      const url = `${this.path}/agent/${id}`;
      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getAgentDetail: ", error);
      throw error;
    }
  }

  public async getAgentProperties(
    agentId: string,
    input: AgentPropertiesInput
  ): Promise<AgentProperties> {
    try {
      const url = `${this.path}/agent/${agentId}/properties`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in getAgentProperties Service: ", error);
      throw error;
    }
  }

  public async saveToggleAgent(agentId: string): Promise<AgentData> {
    try {
      const url = `${this.path}/agent/${agentId}/toggle-save`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in saveTargetProperty: ", error);
      throw error;
    }
  }

  public async getFollowedAgents(
    input: CommonInput
  ): Promise<FollowedAgentsType> {
    try {
      const url = `${this.path}/agent/see/followed-agents`;

      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getFollowedAgents service: ", error);
      throw error;
    }
  }

  public async applyAgent(input: AgentInput): Promise<AgentData> {
    try {
      const formData = new FormData();

      if (input.userId) formData.append("userId", input.userId);
      if (input.agencyId) formData.append("agencyId", input.agencyId);
      if (input.nickname) formData.append("nickname", input.nickname);
      if (input.fullName) formData.append("fullName", input.fullName);
      if (input.phone) formData.append("phone", input.phone);
      if (input.address) formData.append("address", input.address);
      if (input.yearOfExperience)
        formData.append("yearOfExperience", String(input.yearOfExperience));
      if (input.bioInfo) formData.append("bioInfo", input.bioInfo);
      if (input.licenseNumber)
        formData.append("licenseNumber", input.licenseNumber);
      if (input.socialLinks) {
        formData.append("socialLinks", JSON.stringify(input.socialLinks));
      }
      if (input.certificate instanceof File) {
        formData.append("certificate", input.certificate);
      }
      // Append file ONLY if it exists
      if (input.avatar instanceof File) {
        formData.append("avatar", input.avatar);
      }

      const agent = await axios.post(
        `${this.path}/agent/apply/become-agent`,
        formData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("memberData", JSON.stringify(agent.data));
      return agent.data;
    } catch (error) {
      console.log("Error in applyAgent service: ", error);
      throw error;
    }
  }

  public async updateAgentProfile(input: AgentInput): Promise<AgentData> {
    try {
      const formData = new FormData();

      if (input.userId) formData.append("userId", input.userId);
      if (input.agencyId) formData.append("agencyId", input.agencyId);
      if (input.nickname) formData.append("nickname", input.nickname);
      if (input.fullName) formData.append("fullName", input.fullName);
      if (input.phone) formData.append("phone", input.phone);
      if (input.address) formData.append("address", input.address);
      if (input.yearOfExperience)
        formData.append("yearOfExperience", String(input.yearOfExperience));
      if (input.bioInfo) formData.append("bioInfo", input.bioInfo);
      if (input.licenseNumber)
        formData.append("licenseNumber", input.licenseNumber);
      if (input.socialLinks) {
        formData.append("socialLinks", JSON.stringify(input.socialLinks));
      }
      if (input.certificate instanceof File) {
        formData.append("certificate", input.certificate);
      }
      // Append file ONLY if it exists
      if (input.avatar instanceof File) {
        formData.append("avatar", input.avatar);
      }

      const agent = await axios.post(
        `${this.path}/agent/update/agent-profile`,
        formData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("memberData", JSON.stringify(agent.data));
      return agent.data;
    } catch (error) {
      console.log("Error in updateAgentProfile service: ", error);
      throw error;
    }
  }

  public async myBlogs(input: CommonInput): Promise<BlogsListPage> {
    try {
      const url = `${serverAPI}/agent/get/myBlogs`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in myBlogs service: ", error);
      throw error;
    }
  }

  public async agentUpdateMyBlog(input: Blog, id: string): Promise<Blog> {
    try {
      const formData = new FormData();

      if (input.blogImage instanceof File) {
        formData.append("blogImage", input.blogImage);
      }

      if (input.blogCategory)
        formData.append("blogCategory", input.blogCategory);

      if (input.blogContent) formData.append("blogContent", input.blogContent);

      if (input.blogTags) {
        formData.append("blogTags", JSON.stringify(input.blogTags));
      }
      if (input.blogQuote) formData.append("blogQuote", input.blogQuote);

      if (input.blogShortInfo)
        formData.append("blogShortInfo", input.blogShortInfo);

      if (input.blogTitle) formData.append("blogTitle", input.blogTitle);

      const result = await axios.post(
        `${this.path}/agent/update/myBlog/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      return result.data;
    } catch (error) {
      console.error("Error in agentUpdateMyBlog service", error);
      throw error;
    }
  }

  public async deleteMyBlog(id: string): Promise<void> {
    try {
      const url = `${this.path}/agent/delete/myBlog/${id}`;
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      console.log("Error in deleteMyBlog service: ", error);
      throw error;
    }
  }

  public async getMyReviews(input: CommentsSearchInput): Promise<Comments> {
    try {
      const url = `${this.path}/agent/get/my-reviews`;

      const result = await axios.post(url, input, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getMyReviews service: ", error);
      throw error;
    }
  }

  public async createProperty(input: PropertyFormType): Promise<Property> {
    try {
      const propertyForm = new FormData();

      if (input.address)
        propertyForm.append("address", JSON.stringify(input.address));

      if (input.amenities)
        propertyForm.append("amenities", JSON.stringify(input.amenities));

      if (input.area) propertyForm.append("area", String(input.area));

      if (input.bathrooms)
        propertyForm.append("bathrooms", String(input.bathrooms));

      if (input.bedrooms)
        propertyForm.append("bedrooms", String(input.bedrooms));

      if (input.cooling) propertyForm.append("cooling", input.cooling);

      if (input.description)
        propertyForm.append("description", input.description);

      if (input.firePlace === false || input.firePlace === true)
        propertyForm.append("firePlace", String(input.firePlace));

      if (input.floors) propertyForm.append("floors", String(input.floors));

      if (input.furnished) {
        propertyForm.append("furnished", input.furnished);
      }

      if (input.garageSpace) {
        propertyForm.append("garageSpace", String(input.garageSpace));
      }

      if (input.hall) {
        propertyForm.append("hall", String(input.hall));
      }

      if (input.heating) {
        propertyForm.append("heating", input.heating);
      }

      if (
        Object.entries(input.images).every(
          ([_, value]) => value instanceof File
        )
      ) {
        Object.entries(input.images).forEach(([_, valueFile]) =>
          propertyForm.append("images", valueFile)
        );
      }

      if (input.kitchen) {
        propertyForm.append("kitchen", String(input.kitchen));
      }

      if (input.mood) {
        propertyForm.append("mood", input.mood);
      }

      if (input.nearBySchools === true || input.nearBySchools === false) {
        propertyForm.append("nearBySchools", String(input.nearBySchools));
      }

      if (input.nearByTransports === true || input.nearByTransports === false) {
        propertyForm.append("nearByTransports", String(input.nearByTransports));
      }

      if (input.propertyType) {
        propertyForm.append("propertyType", input.propertyType);
      }

      if (input.security) {
        propertyForm.append("security", input.security);
      }

      if (input.sellingOption) {
        if (input.sellingOption.type === SellingTypeEnum.RENT) {
          propertyForm.append(
            "sellingOption",
            JSON.stringify({
              optionRent: {
                type: SellingTypeEnum.RENT,
                monthlyPayment: String(input.sellingOption.monthlyPayment),
                overalAmount: String(input.sellingOption.overalAmount),
                devidedMonths: String(input.sellingOption.devidedMonths),
              },
            })
          );
        }
        if (input.sellingOption.type === SellingTypeEnum.SALE) {
          propertyForm.append(
            "sellingOption",
            JSON.stringify({
              optionSell: {
                type: SellingTypeEnum.SALE,
                overalAmunt: String(input.sellingOption.overalAmunt),
                discount: String(input.sellingOption.discount),
              },
            })
          );
        }
      }

      if (input.title) {
        propertyForm.append("title", input.title);
      }

      if (input.videos instanceof File) {
        propertyForm.append("videos", input.videos);
      }

      if (input.yearBuilt) {
        propertyForm.append("yearBuilt", String(input.yearBuilt));
      }

      const property = await axios.post(
        `${this.path}/property/create`,
        propertyForm,
        {
          withCredentials: true,
        }
      );
      return property.data;
    } catch (error) {
      console.log("Error in createProprty service: ", error);
      throw error;
    }
  }

  public async getAgentMyProperties(
    input: CommentsSearchInput
  ): Promise<CommonPropertyResults<AgentMyProperties>> {
    try {
      const url = `${this.path}/agent/get/all-properties?page=${input.page}&limit=${input.limit}`;

      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error in getAgentMyProperties service: ", error);
      throw error;
    }
  }
}

export default AgentService;
