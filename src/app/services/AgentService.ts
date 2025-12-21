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
import type { CommonInput, SellersSearchInput } from "@/lib/type/common";
import axios from "axios";

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

  public async applyAgent(input: AgentInput): Promise<void> {
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
      await axios.post(`${this.path}/agent/apply/become-agent`, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("Error in applyAgent service: ", error);
      throw error;
    }
  }
}

export default AgentService;
