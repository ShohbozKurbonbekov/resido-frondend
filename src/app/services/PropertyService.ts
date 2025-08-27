import { serverAPI } from "@/lib/config";

class PropertyService {
  private readonly path;

  constructor() {
    this.path = serverAPI;
  }

  public async getProperty() {}
  public async getProperties() {}
}

export default PropertyService;
