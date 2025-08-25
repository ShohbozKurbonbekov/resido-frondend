import { serverAPI } from "@/lib/config";
import axios from "axios";

class AgentService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async getAgents() {
    try {
      return "";
    } catch (error) {
      console.log("Error in getAgents: ", error);
      throw error;
    }
  }
  public async getAgent(id: string) {
    try {
      const url = `${this.path}/agentId/${id}`;
      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.log("Error in getAgent: ", error);
      throw error;
    }
  }
}

export default AgentService;
