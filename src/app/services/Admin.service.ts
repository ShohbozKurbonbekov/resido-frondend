import { serverAPI } from "@/lib/config";
import type { SortOrder } from "@/lib/enums/blog.enum";
import type { TarrifStatus } from "@/lib/enums/pricing.enum";
import type { CommonInput } from "@/lib/type/common";
import type { PaymentTariffsType } from "@/lib/type/pricing";
import axios from "axios";

class AdminService {
  public readonly path;
  constructor() {
    this.path = serverAPI;
  }

  public async adminTariffPlans(
    input: CommonInput & { status?: TarrifStatus; sort?: SortOrder },
  ): Promise<PaymentTariffsType> {
    try {
      const url = `${this.path}/admin/get/payment-tariffs?page=${input.page}&limit=${input.limit}&status=${input?.status}&sort=${input.sort}`;

      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error in adminTariffPlans service: ", error);
      throw error;
    }
  }
}

export default AdminService;
