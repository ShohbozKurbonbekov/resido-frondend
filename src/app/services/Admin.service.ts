import { serverAPI } from "@/lib/config";
import type { BlogStatus, SortOrder } from "@/lib/enums/blog.enum";
import type { TarrifStatus } from "@/lib/enums/pricing.enum";
import type { CommonInput, CommonUsers } from "@/lib/type/common";
import type { PaymentTariffsType, TarrifOutputType } from "@/lib/type/pricing";
import axios from "axios";
import type { AdminSubmitTariffSchemaOutput } from "../data/admin";
import type { CommentStatus } from "@/lib/enums/comment.enum";
import type {
  AdminGetCommentsType,
  Comment,
  Comments,
} from "@/lib/type/comment";
import type {
  AdminAllBlogsType,
  Blog,
  BlogSearchInput,
  BlogsListPage,
} from "@/lib/type/blogs";
import type { AdminGetAllMembersType, AdminMembers } from "@/lib/type/member";
import type { MemberStatus } from "@/lib/enums/agent.enum";

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

  public async adminGetComments(
    input: CommonInput & { status?: CommentStatus; username?: string },
  ): Promise<Comments<AdminGetCommentsType>> {
    try {
      const url = `${this.path}/admin/comments/getCommentsForAdmin?status=${input.status}&page=${input.page}&limit=${input.limit}&username=${input.username}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("adminGetComments: ", error);
      throw error;
    }
  }

  public async adminCommentStatusChange(
    id: string,
    status: CommentStatus,
  ): Promise<Comments<Comment>> {
    try {
      const url = `${this.path}/admin/comments/status/change/${id}`;
      const result = await axios.post(
        url,
        { status },
        { withCredentials: true },
      );
      return result.data;
    } catch (error) {
      console.log("adminCommentStatusChange: ", error);
      throw error;
    }
  }

  public async adminAllBlogs(
    input: BlogSearchInput,
  ): Promise<BlogsListPage<AdminAllBlogsType>> {
    try {
      const url = `${this.path}/admin/blogs/get-all`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("adminAllBlogs: ", error);
      throw error;
    }
  }

  public async adminChangeBlogStatus(
    id: string,
    status: BlogStatus,
  ): Promise<Blog> {
    try {
      const url = `${this.path}/admin/change/blogs/status/${id}`;
      const result = await axios.post(
        url,
        { status },
        { withCredentials: true },
      );
      return result.data;
    } catch (error) {
      console.log("adminChangeBlogStatus: ", error);
      throw error;
    }
  }

  public async adminGetAllMembers(
    input: AdminGetAllMembersType,
  ): Promise<AdminMembers> {
    try {
      const url = `${this.path}/admin/get/all/members`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("adminGetAllMembers: ", error);
      throw error;
    }
  }

  public async adminChangeMemberStatus(
    id: string,
    status: MemberStatus,
  ): Promise<CommonUsers> {
    try {
      const url = `${this.path}/admin/change/member/status/${id}`;
      const result = await axios.post(
        url,
        { status },
        { withCredentials: true },
      );
      return result.data;
    } catch (error) {
      console.log("adminChangeMemberStatus: ", error);
      throw error;
    }
  }
}

export default AdminService;
