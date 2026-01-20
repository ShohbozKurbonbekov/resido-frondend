import { serverAPI } from "@/lib/config";

class AdminService {
  public readonly path;
  constructor() {
    this.path = serverAPI;
  }
}

export default AdminService;
