import { serverAPI } from "@/lib/config";
import type {
  AgentsListPage,
  featuredAgentsInput,
  FeaturedAgentsResult,
} from "@/lib/type/agent";
import type { SellersSearchInput } from "@/lib/type/common";
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
}

export default AgentService;
