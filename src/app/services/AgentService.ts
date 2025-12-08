import { serverAPI } from "@/lib/config";
import type {
  AgentData,
  AgentProperties,
  AgentPropertiesInput,
  AgentsListPage,
  ChosenAgentPageType,
  featuredAgentsInput,
  FeaturedAgentsResult,
  FollowedAgentsType,
} from "@/lib/type/agent";
import type { CommonInput, SellersSearchInput } from "@/lib/type/common";
import type { UserSavingsInput } from "@/lib/type/dashboard/user";
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

  public async saveTargetAgent(agentId: string): Promise<AgentData> {
    try {
      const url = `${this.path}/agent/${agentId}/save`;
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

  public async unFollowAgent(id: string): Promise<void> {
    try {
      const url = `${this.path}/agent/unfollow/followed-agent`;
      const input: UserSavingsInput = {
        targetId: id,
      };

      await axios.post(url, input, { withCredentials: true });
    } catch (error) {
      console.log("Error in deleteSavedProperty: ", error);
      throw error;
    }
  }
}

export default AgentService;
