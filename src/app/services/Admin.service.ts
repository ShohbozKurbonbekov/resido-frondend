import { serverAPI } from "@/lib/config";
import type { SortOrder } from "@/lib/enums/blog.enum";
import type { TarrifStatus } from "@/lib/enums/pricing.enum";
import type { CommonInput } from "@/lib/type/common";
import type { PaymentTariffsType, TarrifOutputType } from "@/lib/type/pricing";
import axios from "axios";
import type { AdminSubmitTariffSchemaOutput } from "../data/admin";

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

  public async adminAddTariff(
    input: AdminSubmitTariffSchemaOutput,
    features: string[],
  ): Promise<TarrifOutputType> {
    try {
      const url = `${this.path}/admin/add/tariffs`;

      const result = await axios.post(
        url,
        { ...input, features },
        {
          withCredentials: true,
        },
      );
      return result.data;
    } catch (error) {
      console.log("Error in adminAddTariff service: ", error);
      throw error;
    }
  }

  public async adminEditTariff(
    id: string,
    values: AdminSubmitTariffSchemaOutput,
    features: string[],
  ): Promise<TarrifOutputType> {
    try {
      const url = `${this.path}/admin/edit/tariffs/${id}`;

      const result = await axios.post(
        url,
        { ...values, features },
        {
          withCredentials: true,
        },
      );
      return result.data;
    } catch (error) {
      console.log("Error in adminEditTariff service: ", error);
      throw error;
    }
  }

  public async adminChangeTariffStatus(
    id: string,
    status: TarrifStatus,
  ): Promise<TarrifOutputType> {
    try {
      const url = `${this.path}/admin/change/tariffs/status?id=${id}&status=${status}`;
      const result = await axios.post(url, {}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("adminChangeTariffStatus: ", error);
      throw error;
    }
  }
}

export default AdminService;
