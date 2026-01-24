import { serverAPI } from "@/lib/config";
import type { ReviewNotificationType } from "@/lib/type/notification";
import axios from "axios";

class NotificationService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async reviewNotification(
    entityId: string,
  ): Promise<ReviewNotificationType> {
    try {
      const url = `${this.path}/agency/review/notification/${entityId}`;
      const result = await axios.post(url, {}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in reviewNotification: ", error);
      throw error;
    }
  }
}

export default NotificationService;
