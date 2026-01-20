import { serverAPI } from "@/lib/config";
import type { T } from "@/lib/type/common";

class FaqService {
  private readonly path;
  constructor() {
    this.path = serverAPI;
  }

  async getFaqData(searchInquery: { search: string }): Promise<T> {
    console.log(searchInquery);
    return {
      search: [{}, {}],
    };
  }
}
export default FaqService;
