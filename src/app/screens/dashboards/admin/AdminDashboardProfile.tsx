import type { UserProfileSubmitType } from "@/app/data/dashboard/user";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { User } from "@/lib/type/dashboard/user";
import { useCallback } from "react";
import UserProfileHeader from "../user/UserProfileHeader";
import UserProfileCard from "@/app/components/Cards/UserProfileCard";
import { sweetTopSmallSuccessAlert } from "@/lib/sweetAlerts";
import MemberService from "@/app/services/Member.service";

export const UserCardWrapperClasses =
  "w-full grid gap-y-4 md:gap-y-5 grid-cols-1";
// --------------------------------------- COMPONENT --------------------
export default function AdminDashboardProfile() {
  const { authmember, setAuthMember } = useGlobals();
  const admin = authmember as User;

  // --------------------------------------- HANDLERS --------------------
  const onSubmit = useCallback(
    async (values: UserProfileSubmitType) => {
      console.log(values);
      try {
        const member = new MemberService();
        const data = await member.updateMember(values);
        setAuthMember(data);

        await sweetTopSmallSuccessAlert("Modified successfully!", 1000);
      } catch (error) {
        console.log("Error in AdminDashboardProfile: ", error);
        throw error;
      }
    },
    [setAuthMember],
  );

  if (!admin) return;
  return (
    <div className="flex flex-col gap-y-5 h-full">
      <UserProfileHeader
        title="Admin Account"
        subtitle="Configure profile information and account-related settings."
      />
      <UserProfileCard
        user={admin}
        formTitle="Admin Profile Page"
        onSubmit={onSubmit}
      />
    </div>
  );
}
